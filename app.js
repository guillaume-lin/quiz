var log4js = require('log4js');
var logger = log4js.getLogger();
var express = require('express');
var app = express();
var hbs = require('hbs');

var quiz = require('./business/quiz');
var bodyParser = require('body-parser');
var multer = require('multer');

app.set('view engine', 'html');
app.engine('html', require('hbs').__express);
var upload = multer(); // for parsing multipart/form-data

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/files'));


app.get('/',function(req,res){
    res.sendFile(__dirname+'/views/quiz.html')
});

app.post('/getQuestions', function(req, res){
    quiz.createQuiz(req,res);
})
app.get('/quiz',function(req, res){
    res.sendFile(__dirname+'/views/quiz.html');
})
process.on("SIGINT",function(){
    console.log("SIGINT received. exit gracefully.");
    process.exit(0);
})
app.listen(8080);
