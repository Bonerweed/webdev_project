const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
    console.log("AUTH START:", req.headers);
    const header = req.headers.authorization;
    const token = header ? header.split(" ")[1] : null;
    if(token == null) {
      return res.sendStatus(401)
    };
    console.log("FOUND TOKEN:", token);
    jwt.verify(token, process.env.SECRET, (err, user) => {
        if(err) {
          //return res.redirect("/");
          req.user = null;
        }
        req.user = user;
        next();
    });
};
