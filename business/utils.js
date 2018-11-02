module.exports = util;


var util = {};
util.invokeCallback = function(cb){
    if(!!cb){
        cb.apply(null,arguments.slice(1));
    }
}

