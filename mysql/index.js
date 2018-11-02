var log4js = require('log4js');
var logger = log4js.getLogger();
var cfg = require('../config/mysql');
var mysql = require('mysql');
var AccountInfo = require('./accountInfo');


var mySingleton = function(){
    __mysql__ = null;
    return {
        instance:function(app){
            if(!__mysql__){
                __mysql__ = new MySQL(app);
            }
            return __mysql__;
        }
    }
}();  // called immediate

var MySQL = function(app){
    this.app = app;
    this.connection = mysql.createConnection(cfg);
}
/**
 *
 * @param account
 * @param cb(err,row,next)
 */
MySQL.prototype.queryOfficialAccount = function(account,cb){
    var self = this;
    var sql = "select * from account_official ";
    if(!!account){
        sql += "where account = '" + account+"'";
    }
    logger.debug('query: %s',sql);
    var query = this.connection.query(sql);
    query
        .on('error', function(err) {
            // Handle error, an 'end' event will be emitted after this as well
            cb(err);
        })
        .on('fields', function(fields) {
            // the field packets for the rows to follow
        })
        .on('result', function(row) {
            // Pausing the connnection is useful if your processing involves I/O
            self.connection.pause();

            cb(null,row, function() {
                self.connection.resume();
            });
        })
        .on('end', function() {
            // all rows have been received
            cb(null,null);
        });
}
/**
 *
 * @param account
 * @param password
 * @param cb(err, results);
 */
MySQL.prototype.updatePassword = function(account,password,cb){
    this.connection.query('UPDATE account_official set password = ? where account = ?',[password,account],
        function(err, results){
            cb(err,results);
        });
}
/**
 *
 * @param account
 * @param userInfo
 * @param cb
 */
MySQL.prototype.updateUserInfo = function(account,userInfo,cb){
    this.connection.query('UPDATE account_official set miId = ? , roleName = ? , phone = ? where account = ?',
        [userInfo.miId,userInfo.roleName, userInfo.phone,,account], function(err, results){
            cb(err,results);
        });
}
MySQL.prototype.activateAccount = function(account,cb){
    var ct = Math.floor(Date.now()/1000);
    this.connection.query('UPDATE account_official set activated = 1 ,activateTime = ? where account = ?',[ct, account],
        function(err, results){
            cb(err,results);
        });
}
MySQL.prototype.insertAccount = function(accountInfo, cb){
    var ct = Math.floor(Date.now()/1000);
    accountInfo.createTime = ct;
    this.connection.query('INSERT INTO account_official SET ?',accountInfo,function(err, result){
       cb(err,result);
    });
}

module.exports = mySingleton;