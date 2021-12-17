const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const validateToken = require("../auth/validateToken.js")


router.get("/nukedatabase", (req, res) => {
  User.remove({}, (err, count) => {
    if (err) {
      throw err;
    }
    res.status(403).json( {message: "database nuked maybe", count: count} );
  });
});

router.get("/removeuser", (req, res) => {
  //console.log(reg);
  res.redirect("/");
  /*User.remove({}, (err, count) => {
    if (err) {
      throw err;
    }
    res.status(403).json( {message: "database nuked maybe", count: count} );
  });*/
});

router.post("/removeuser", body("username"), (req, res) => {
  //console.log(req);
  console.log(req.body.username);
  User.deleteOne({ username: req.body.username }, (err) => {
    if (err) {
      throw err;
    }
    //res.status(403).json( {message: "dude nuked maybe"} );
  });
  res.redirect("/users/list");
});


/* GET users listing. , validateToken*/
router.get("/list", (req, res, next) => {
  User.find({}, (err, users) =>{
    if(err) {
      return next(err)
    };
    res.render("users", {users});
  })
});

router.get("/login", (req, res, next) => {
  res.render("login");
});

router.post("/login", body("username").trim().escape(), body("password").escape(), (req, res, next) => {
  User.findOne( { username: req.body.username }, (err, user) =>{
    if (err) {
      throw err;
    }
    if (!user) {
      return res.status(403).json( {message: "Username or password is wrong"} );
    }
    else {
      bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
        if (err) {
          throw err;
        }
        if (isMatch) {
          const payload = {
            id: user._id,
            username: user.username
          }
          jwt.sign(
            payload,
            process.env.SECRET,
            {
              expiresIn: 120
            },
            (err, token) => {
              res.json({success: true, token});
            }
          );
          return res.redirect("/");
        }
      });
    }
  });
});



router.get("/register", (req, res, next) => {
  res.render("register");
});

router.post("/register", body("username").isLength( {min: 1} ).trim().escape(), body("password").isLength( {min: 1} ), (req, res, next) => {
    const errors = validationResult(req);
    if ( !errors.isEmpty() ) {
      return res.status(400).json({errors: errors.array()});
    }
    User.findOne({username: req.body.username}, (err, user) => {
      if (err) {
        console.log(err);
        throw err
      };
      if (user) {
        return res.status(403).json( {username: "Username has been taken"});
      }
      else {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) {
              throw err;
            }
            User.create(
              {
                username: req.body.username,
                password: hash
              },
              (err, ok) => {
                if (err) {
                  throw err;
                }
                return res.redirect("/users/login");
              }
            );
          });
        });
      }
    });
});

module.exports = router;
