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

router.get("/nukedatabase", (req, res) => {
  Thread.remove({}, (err, count) => {
    if (err) {
      throw err;
    }
    res.status(403).json( {message: "database nuked maybe", count: count} );
  });
});


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

router.get("/create", (req, res, next) => {
  console.log(req.header);
  res.render("create");
});

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
        author: req.headers.user,
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

router.get("/comments", (req, res, next)=>{
  let mainThread;
  Thread.findOne({title: "help"}, (err, thread) =>{
    if(err) {
      return next(err);
    }
    else {
      console.log(thread);
      //mainThread = thread;
      Comment.find({thread: "help"}, (err, comments) => {
        if (err) {
          return next(err);
        }
        console.log(comments);
        //threadComments = comments;
        res.render("comments", {thread, comments});
      });
    }
  });
});

router.get('/comments/:threadtitle', (req, res, next) => {
  let mainThread;
  let threadComments;
  console.log(req.params);
  Thread.findOne({title: req.params.threadtitle}, (err, thread) =>{
    if(err) {
      return next(err);
    };
    console.log(thread);
    mainThread = thread;
  });
  Comment.find({thread: req.params.threadtitle}, (err, comments) => {
    if (err) {
      return next(err);
    }
    console.log(comments);
    threadComments = comments;
  });
  res.json({mainThread, threadComments});
  //router.render("comments", { thread: mainThread, comments: threadComments} );
});


router.post("/comments/:threadtitle", upload.none(), (req, res, next) => {
    const errors = validationResult(req);
    if ( !errors.isEmpty() ) {
      return res.status(400).json({errors: errors.array()});
    }
    console.log(req.body.title, req.body.content);
    Comment.create(
      {
        thread: req.body.title,
        content: req.body.content,
        author: req.headers.user,
        date: Date.now()
      },
      (err, ok) => {
        if (err) {
          throw err;
        }
        res.json({success: true});
      }
    );
});

module.exports = router;
