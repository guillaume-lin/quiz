var log4js = require('log4js');
var logger = log4js.getLogger();
var path = require('path');
var sqlite3 = require('sqlite3').verbose();




var Quiz = function(){
    this.db = new sqlite3.Database(__dirname+'/../bin/quiz.db', sqlite3.OPEN_READONLY, function(err){
        if(!!err){
            logger.error("open db failed. %j",err.stack);
        }

    });
    logger.debug("db is: %j",this.db);
}
var proto = Quiz.prototype;


/**
 * generate m random number in [ 0, n-1 ]
 * @param n,
 */
var genRandSeq = function(n,m){
    var a = [];
    var b = [];
    for(var i=0; i<n; i++){
        a.push(i);
    }
    if(m >= n)
        return a;
    var k = n-1;
    for(var i=0; i<m; i++){
        var r = Math.floor(Math.random()*k);
        b[i] = a[r];
        a[r] = a[k];
        k -= 1;
    }
    logger.debug("choose %d from %d: %j",m,n,b);
    return b;
}
/**
 * select limit questions for the database
 * @param limit
 * @return the json of the questions
 */
proto.getQuestions = function(limit, cb){
    var self = this;
    var questions = [];
    this.db.serialize(function(){
        // select all id from database
        self.db.all("select * from questions",function(err,rows){
            if(!!err){
                logger.error("query Questions error. %j",err.stack);
                cb(err);
                return;
            }
            logger.info("total %d questions.",rows.length);

            var b = genRandSeq(rows.length, limit);
            logger.debug("rand seq: %j",b);
            l = b.length;
            for(var i=0; i<l; i++){
                questions.push(rows[b[i]]);
            }
            cb(null,questions);
        });
    });
}
proto.createQuiz = function(req, res){
    logger.info("create quiz");

    logger.info("ip:%s",req.ip);
    logger.info("body: %j",req.body);

    var q = this.getQuestions(50, function(err,questions){
        logger.debug("create quiz got questions: %j",questions);
        res.end(JSON.stringify(questions));
    });
}

module.exports = new Quiz();