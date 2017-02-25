var express=require("express");
var path=require("path");
var bodyParser=require("body-parser");
var mongoose=require("mongoose");
var isession=require('express-session');
//var multer=require("multer");

//声明全局变量dbHelper
global.dbHelper = require('./dao/dbHelper');
//此处为什么要存进global 如果我的mongoose连接了两个以上数据库怎么办？
global.db = mongoose.connect("mongodb://127.0.0.1:27017/album");

var app=express();
//设置静态目录，使浏览器可以访问public目录下的文件
app.use(express.static('public'));
//bodyParser中间件用来解析提交数据
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//使res.rander找到文件路径
app.set("views",path.join(__dirname,"public/views"));
//在调用render函数时能自动为我们加上’.html’ 后缀。如果不作此设置，我们就得把res.render(‘users’)写成res.render(‘users.html’)，否则会报错。
app.set("view engine","html");
//让ejs能够识别后缀为’.html’的文件
app.engine("html",require("ejs").__express);

app.use(isession({
    secret: 'secret',
    cookie: {
        maxAge: 1000 * 60 * 30
    }
}));

app.use(function(req,res,next){
  res.locals.user = req.session.user;
  var err = req.session.error;
  res.locals.message = '';
  if (err) {
      res.locals.message = '<div class="alert alert-danger" style="margin-bottom: 20px;color:red;">' + err + '</div>';
  } else {
  }
  next();
})

//引入路由器
require("./routers/router.js")(app);

var server=app.listen(8080,function(){
  console.log("express server is running on port 8080");
})
