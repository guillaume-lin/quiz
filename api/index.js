/**
 * REST API that return json
 * @type {exports}
 */
var crypto = require('crypto');
var log4js = require('log4js');
var logger = log4js.getLogger();
var mysql = require('../mysql');

var API = function(app){
    return new MyAPI(app);
}
var MyAPI = function(app){
    this.app = app;
}

var encrypt = function(pass){
    var h = crypto.createHash('sha1');
    h.update(pass,'utf8');
    return h.digest('hex');
}
/**
 *  login
 *  cb( loginState) :
 */
MyAPI.prototype.login = function(account, pass,cb){
    logger.info("%s login.",account);
    mysql.instance(this.app).queryOfficialAccount(account,function(err,row, next){
       if(err){
           logger.warn('login failed.: %j',err);
           cb(err);
           return;
       }
        if(row.password === encrypt(pass)){
            cb(null,true);
        }else{
            cb(null,false);
        }
    });
}
/**
 *  logout
 */
MyAPI.prototype.logout = function(account,cb){
    logger.info("account %s logout.",account);
    cb(null,true);
}
/**
 * register official account
 */
MyAPI.prototype.register = function(account,pass,cb){
    logger.info("register account: %s",account);
    var accountInfo = {
        'account':account,
        'password':encrypt(pass)
    }
    mysql.instance(this.app).insertAccount(accountInfo,function(err, result){
        if(err){
            logger.error('register account: %s failed: %j',account,err);
            cb(err);
            return;
        }
        if(result.affectedRows === 1){
            cb(null,true);
        }else{
            cb(null,false);
        }
    })
}
/**
 * submit user info
 */
MyAPI.prototype.submitUserInfo = function(account,userInfo,cb){
    logger.info("submit user info for account: %s",account);
    mysql.instance(this.app).updateUserInfo(account,userInfo,function(err, results){
       if(err){
           logger.error("submit user info: %j",err);
           cb(err);
           return;
       }
        if(results.affectedRows === 1){
            cb(null,true);
        }else{
            cb(null,false);
        }
    });
}
/**
 * activate account
 */
MyAPI.prototype.activate = function(account,cb){
    logger.info('activate account: %s',account);
    mysql.instance(this.app).activateAccount(account,function(err, results){
        if(err){
            logger.error("activate account error: %j",err);
            cb(err);
        }
        if(results.affectedRows === 1){
            cb(null,true);
        }else{
            logger.warn("activate account: %j",results);
            cb(null,false);
        }
    })
}
/**
 *  query if account activated
 */
MyAPI.prototype.queryAccountState = function(account,cb){
    logger.info("query account state for: %s.",account);
    mysql.instance(this.app).queryOfficialAccount(account,function(err,row,next){
        if(err){
            cb(err);
            return;
        }
        if(row != null){
            if(row.activated === 1){
                cb(null,true);
            }
        }
        if(next){
            next();
        }
    })
}
module.exports = API;