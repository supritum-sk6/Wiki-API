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


//actual server requests
app.route("/articles")
.get(function(req, res){
    Article.find().then(function(foundArticles){
        res.send(foundArticles);
    });
})
.post(function(req, res){
    const newArticle = new Article({
        title: req.body.title,
        content: req.body.content
    });
    newArticle.save().then(function(insertedArticles){
        res.send(insertedArticles);
    });
})
.delete(function(req, res){
    Article.deleteMany().then(function(deletedArticles){
        res.send(deletedArticles);
    });
});

app.route("/articles/:articleTitle")
.get(function(req, res){
    Article.find({title: req.params.articleTitle}).then(function(foundArticle){
        if(foundArticle.length!=0){
            res.send(foundArticle);
        }else{
            res.send("no article with the title found");
        }
        
    });
})
.put(function(req, res){
    Article.replaceOne({title: req.params.articleTitle}, req.body).then(function(updatedArticle){
        res.send(updatedArticle);
    });
})
.patch(function(req, res){
    Article.updateOne({title: req.params.articleTitle}, {$set: req.body}).then(function(updatedArticle){
        res.send(updatedArticle);
    });
})
.delete(function(req, res){
    Article.deleteMany({title: req.params.articleTitle}).then(function(deletedArticle){
        res.send(deletedArticle);
    });
});




//server requests
app.get("/", function(req, res){
    res.send("done");
});


//setting up the port
app.listen(3000, function() {
    console.log("Server started on port 3000");
});