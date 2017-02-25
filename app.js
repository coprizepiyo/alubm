/**
 * === 主模块 ========================================================================= 
 * @version 0.8
 * @author CoprizePiyo (coprizepiyo@hotmail.com)
 * @description 应用程序入口
 * --- 2017.02.21 ----------------------------
 */
var express=require("express");
var app=express();
var session=require("express-session");
var bodyParser=require("body-parser");
var mongoose=require("mongoose");

//连接数据库
global.dbHelper=require("./dao/db_helper.js");
mongoose.connect("mongodb://127.0.0.1:27017/album");

//设置静态目录
app.use(express.static("public"));

//设置视图引擎
app.set("views",__dirname+"/public/views");
app.set("view engine","html");
app.engine("html",require("ejs").renderFile);

//设置session
app.use(session({
    secret:"secret",
    cookie:{
        maxAge:1000*60*30
    }
}));

//设置bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//引入路由模块
require("./routers/router.js")(app);

//监听8080端口
app.listen(8080,function(){
    console.log("server is startring on port 8080");
});
