require("dotenv").config();

const createError = require("http-errors");
const cookieParser = require("cookie-parser");
const express = require("express");
const bp = require("body-parser");
const path = require("path");
const port = 5000;
const mongoose = require("mongoose");

const index = require('./routes/index');
const users= require('./routes/users');


const app = express();


// views
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");


//configure a database, mongo is sufficient
//uses set ip since "locahost" can behave oddly in marginal cases
const mongoDB = "mongodb://127.0.0.1:27017/threaddb";
mongoose.connect(mongoDB);
mongoose.Promise = Promise;
const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB decided to die"));

//configure debugging middleware and project files
app.use(bp.urlencoded({extended: false}));
app.use(bp.json());
app.use(require("morgan")("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use('/', index);
app.use('/users', users);

//in case of 404
app.use(function(req, res, next) {
  next(createError(404));
});

//error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render(err.status, "error");
  //setTimeout(res.redirect("/"), 5000);
});

module.exports = app;



/*//project files
app.use(express.static(path.join(__dirname, "public")));
app.use("/api/Threads", require("./api/Threads.js"));


app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(port, () => {
  console.log("server listening port", port);
});*/
