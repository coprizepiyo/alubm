var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var models=require('./models.js');

for(let m in models){
    mongoose.model(m,new Schema(models[m]));
}

var _getModel=function(modelName){
    return mongoose.model(modelName);
}

module.exports={
    getModel:function(modelName){
        return _getModel(modelName);
    }
}