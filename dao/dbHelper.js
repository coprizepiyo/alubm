var mongoose=require("mongoose");
var Schema=mongoose.Schema;
var models=require("./models");

for(var m in models){
    mongoose.model(m,new Schema(models[m]));
}

module.exports={
  getModel:function(type){
    return _getModel(type);
  }
}

//此方法为何要如此声明 私有方法的含义
var _getModel=function(type){
  return mongoose.model(type);
}
