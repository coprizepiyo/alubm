/*
  爬取网站图片
  Author:Teamus 连炜
  CreateDate:2017-01-28
  version:0.0.8
*/
var http=require("http");
var fs=require("fs");
var cheerio=require("cheerio");
var mongoose=require("mongoose");

//声明全局变量dbHelper
global.dbHelper = require('./dao/dbHelper');
//此处为什么要存进global 如果我的mongoose连接了两个以上数据库怎么办？
global.db = mongoose.connect("mongodb://127.0.0.1:27017/album");

for(var i=2260;i>2250;i--)
{
  var lUrl="http://jandan.net/ooxx/page-"+i+"#comments";

  http.get(lUrl,function(response){
    var lData="";
    response.setEncoding("utf8");
    response.on("data",function(chunk){
      //console.log("123");
      lData += chunk;
    });
    response.on("end",function(){
      var $=cheerio.load(lData);
      $("div.text>p>a.view_img_link").each(function(){
        var href=this.attribs.href;
        var name=href.substr(23,href.length);
        http.get("http:"+href,function(res){
          var lImgData="";
          res.setEncoding("binary");
          res.on("data",function(chunk){
            lImgData += chunk;
          })
          res.on("end",function(){
            fs.writeFile("public/picture/"+name,lImgData,"binary",function(err){
              if(err){
                console.log("down fail");
              }else
              {
                var picture=global.dbHelper.getModel("picture");
                picture.create({
                  name:name,
                  description:"from jandan.net",
                  imgSrc:"picture/"+name
                },function(err){});
              }
            })
          })
        })
        //fs.appendFileSync("pcitureURL.txt",href+"\r\n");
      });
      //fs.writeFileSync("temp.txt",lData);
    });
  }).on("error",function(e){
    console.log(e.message);
  })
}
