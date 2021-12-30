const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const { body, validationResult } = require("express-validator");
const Thread = require("../models/Thread");
const Comment = require("../models/Comment");
const jwt = require("jsonwebtoken");
const validateToken = require("../auth/validateToken.js")
const multer = require("multer")
const storage = multer.memoryStorage();
const upload = multer( {storage} )


/* GET users listing. , validateToken*/
router.get("/list", (req, res, next) => {
  Thread.find({}, (err, threads) =>{
    if(err) {
      return next(err)
    };
    console.log(threads);
    res.render("threads", {threads});
  })
});


//check if we have a user and render creation view if so
router.get("/create/", (req, res, next) => {
  console.log(req.cookies);
  if (req.cookies["user"]) {
      res.render("create");  
  }
  else {
      res.render("index")
  }
});

//check authentication
router.get("/create/auth", validateToken, (req, res, next) => {
  console.log("got user:", req.user);
  //res.render("create");
  //res.json({success: true});
  if (req.user === null) {
      alert("please log in :)");
      res.redirect("/");
  }
  res.cookie("user", req.user, {
      expires: new Date( Date.now() + 10000)
  });
  res.redirect(301, "/threads/create");
});

//handle post request to make thread
router.post("/create", upload.none(), (req, res, next) => {
    const errors = validationResult(req);
    if ( !errors.isEmpty() ) {
      return res.status(400).json({errors: errors.array()});
    }
    console.log(req.body.title, req.body.content);
    Thread.create(
      {
        title: req.body.title,
        content: req.body.content,
        author: req.body.user,
        date: Date.now(),
        edited: false
      },
      (err, ok) => {
        if (err) {
          throw err;
        }
        res.json({success: true});
      }
    );
});

//authentication for comments, currently unused?
router.get("/comments/:title/auth", validateToken, (reg, res, next) => {
    console.log("USER AUTH THREAD VIEW", req.user);
    res.cookie("user", req.user, {
        expires: new Date( Date.now() + 10000)
    });
    res.redirect(301, "/threads/create");
    
});

//render thread and it's comments
router.get("/comments/:threadtitle", (req, res, next) => {
  let mainThread;
  let threadComments;
  Thread.findOne({title: req.params.threadtitle}, (err, thread) =>{
    if(err) {
      return next(err);
    };
    mainThread = thread;
    Comment.find({thread: req.params.threadtitle}, (err, comments) => {
      if (err) {
        return next(err);
      }
      console.log(comments);
      threadComments = comments;
      res.render("comments", { thread: mainThread, comments: threadComments} );
    });
  });
});

//listen to a post calls to request comment creation
router.post("/comments/:threadtitle", upload.none(), (req, res, next) => {
    const errors = validationResult(req);
    if ( !errors.isEmpty() ) {
      return res.status(400).json({errors: errors.array()});
    }
    //console.log("POST REQ: ",req.body.username, req.body.title, req.body.content);
    const redirectTitle = req.body.title;
    Comment.create(
      {
        thread: req.body.title,
        content: req.body.comment,
        author: req.body.username,
        date: Date.now()
      },
      (err, ok) => {
        if (err) {
          throw err;
        }
        //return the title so we can reload the page the comment was created to
        res.json({success: true, title: redirectTitle});
      }
    );
});

//get edit call, find the thread to edit and base view on that
router.get("/edit/:thread", (req,res) => {
    let mainThread;
    Thread.findOne({title: req.params.thread}, (err, thread) =>{
        if(err) {
            return next(err);
        };
        console.log(thread);
        mainThread = thread;
        res.render("edit", { thread: mainThread} );
    });
});


//reolve edit request
router.post("/edit/", upload.none(), (req, res, next) => {
    const errors = validationResult(req);
    if ( !errors.isEmpty() ) {
      return res.status(400).json({errors: errors.array()});
    }
    //console.log("POST REQ: ",req.body.username, req.body.title, req.body.content);
    const redirectTitle = req.body.title;
    const thread_old = Thread.findOneAndUpdate( {title: req.body.title},
      {
        content: req.body.content,
        date: Date.now(),
        edited: true
      },
      {new: true},
      (err, ok) => {
        if (err) {
          throw err;
        }
        //console.log("old Thread content:",  thread_old.content);
        res.json({success: true, title: redirectTitle});
      }
  );
});


//handle and authenticate a request to delete a thread
router.post("/nuke/:thread", validateToken, (req, res, next)=>{
    console.log("USER AUTH NUKE THREAD", req.user);
    if (!req.user || req.user === null || !req.user.admin) {
        res.json({success: false, messeage: "unauthorized"});
        return;
    }
    else {
        Thread.deleteOne({title: req.params.thread}, (err, tcount) => {
          if (err) {
            throw err;
          }
          console.log("NUKED THREADS: ", tcount);
          Comment.deleteMany({thread: req.params.thread}, (err, ccount) => {
            if (err) {
              throw err;
            }
            console.log("NUKED COMMENTS: ", ccount);
            console.log("bang bang bang and the thread is gone");
            res.json({success: false, messeage: "good riddance"})
            return;
          });
        });
    }
});

module.exports = router;
