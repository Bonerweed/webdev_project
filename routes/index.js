var express = require("express");
var router = express.Router();
const Thread = require("../models/Thread");
const Comment = require("../models/Comment");
const User = require("../models/User");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Totally not a reddit clone" });
});

//dev tools to clear database, uncomment and use use at own risk

/*router.get("/nuke/users", function(req, res, next) {
    User.remove({}, (err, count) => {
      if (err) {
        throw err;
      }
      res.status(403).json( {message: "database nuked maybe", count: count} );
    });
})

router.get("/nuke/threads", function(req, res, next) {
    Thread.remove({}, (err, tcount) => {
      if (err) {
        throw err;
      }
      console.log("NUKED THREADS: ", tcount);
      Comment.remove({}, (err, ccount) => {
        if (err) {
          throw err;
        }
        console.log("NUKED COMMENTS: ", ccount);
        res.status(403).json( {message: "database nuked maybe", count: ccount} );
      });
    });
})*/

module.exports = router;
