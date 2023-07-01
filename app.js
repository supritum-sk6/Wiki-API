//requiring the dependencies
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");


//initializing the dependencies
const app = express();
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));
mongoose.connect("mongodb://127.0.0.1:27017/wikiDB");


//defining schemas
const articleSchema = new mongoose.Schema({
    title: String,
    content: String
});
const Article = mongoose.model("Article", articleSchema);


//server requests
app.get("/", function(req, res){
    res.send("done");
});


//setting up the port
app.listen(3000, function() {
    console.log("Server started on port 3000");
});