var express = require("express");
var mongoose = require("mongoose");

var PersonSchema = new mongoose.Schema({
  name: String  
});

var Person = mongoose.model("Person", PersonSchema);

mongoose.connect("mongodb://localhost/my_world");
mongoose.connection.once("open", function(){
  console.log("i am connected");
});


var app = express();

app.locals.pretty = true;

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

//api
app.get("/api/people", function(req, res){
  Person.find({}).sort("name").exec(function(err, people){
    res.send(people);
  }); 
});


app.listen(process.env.PORT);