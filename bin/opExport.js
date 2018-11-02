#!/usr/bin/env node
/**
 *   export account info to csv for OP
 *   usage:
 *       opExport out.csv
 *
 * csv file like:
 *       account,miId,roleName,phone
 */

var mysql = require('../mysql');
var async = require('async');
var fs = require('fs');

var opExport = function(){

    var csv = fs.openSync('out.csv','w');
    csv.write();
    var my = mysql.instance(this.app);
    my.query('account_official',function(err,res){

    });
    my.query('user_info', function(err,res){

    });
}
