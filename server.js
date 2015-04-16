var express = require("express");

var app = express();

app.locals.pretty = true

app.set("view engine", "jade");

app.use(express.static(__dirname + "/client"));

app.use(function(req, res, next){
  req.foo = Math.random().toString();
  next();
});

var paths = ["/", "/people", "/things"];

paths.forEach(function(path){
  app.get(path, function(req, res, next){
    res.render("index");
  });
});


app.listen(process.env.PORT);