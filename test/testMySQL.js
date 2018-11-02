var mysql = require('../mysql');


var testQuery = function(){
    console.log('testQuery');
    mysql.instance(this).queryOfficialAccount(null,function(err, row, next){
       if(err){
           console.log(err);
           return;
       }
        if(row === null){
            console.log('end');
        }else{
            console.log(row);
            console.log(row.id);
            console.log(row.account);
        }

        if(!!next)
            next();
    });
}
var testUpdate = function(){
    console.log('testUpdate');
    mysql.instance(this).updatePassword('robot1','mypass',function(err,results){
        console.log('update:'+err);
        console.log(results);
    })
}
var testActivate = function(){
    console.log('testActivate');
    mysql.instance(this).activateAccount('robot1',function(err,results){
        console.log('activate:'+err);
        console.log(results);
    })
}
var testInsert = function () {
    console.log('testInsert');
    accountInfo = {
        "account":'robot1234',
        'password':'wru'
    }
    mysql.instance(this).insertAccount(accountInfo,function(err,result){
        console.log('insert:'+err);
        console.log(result);
    })
}
testUpdate();
testActivate();
testInsert();
testQuery();
