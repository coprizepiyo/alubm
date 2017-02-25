module.exports=function(app){
  var fs=require("fs");

  app.get('/home', function (req, res) {
      if(req.session.user){
          var Picture = global.dbHelper.getModel('picture');
          //设置分页的总页数
          Picture.count({},function(err,num){
            if(err){
              res.send("500","网络错误");
            }else{
              req.session.page_count=Math.ceil(num/8);
            }
          });
          if(!req.session.page_current){
            req.session.page_current=1;
          }

          var query=Picture.find({});
          query.limit(8);
          query.skip((req.session.page_current-1)*8+1);
          query.exec(function(err,docs){
            res.render('home',{Pictures:docs});
          });

          // Picture.find({}, function (error, docs) {
          //     console.log(docs);
          //     res.render('home',{Pictures:docs});
          // });
      }else{
          req.session.error = "请先登录"
          res.redirect('/login');
      }
  });

  app.post("/home/delete",function(req,res){
    if(req.session.user){
      fs.unlink("./public/"+req.body.imgSrc,function(err){
        if(err){
          console.log(err);
        }else
        {
          var Picture=global.dbHelper.getModel("picture");
          Picture.findById(req.body.imgId,function(err,picture){
            if(err){
              console.log(err);
            }else{
              picture.remove();
              res.sendStatus(200);
            }
          });
        }
      });
    }
  });

  app.post("/home/update",function(req,res){
    if(req.session.user){
      var Picture=global.dbHelper.getModel("picture");
      Picture.findOne({name:req.body.imgName},function(err,doc){
        if(err){
          res.send(500,"网络错误");
        }else if(doc){
          res.send(404,"图片名已存在");
        }else{
          Picture.update({"_id":req.body.imgId},{"name":req.body.imgName},{multi:false},function(err){
            if(err){
              res.send(404,"更新失败");
            }else{
              res.sendStatus(200);
            }
          })
        }
      });
    }
  });

  app.post("/home/page",function(req,res){
    if(req.session.user){
      if(req.body.num=="-1"){
        if(req.session.page_current>1){
          req.session.page_current=req.session.page_current-1;
          res.sendStatus(200);
        }else{
          res.send(404,"已经是第一页了");
        }
      }else if(req.body.num=="1"){
        if(req.session.page_current==req.session.page_count){
          res.send(404,"已经是最后一页了");
        }
        else{
          req.session.page_current=req.session.page_current+1;
          res.sendStatus(200);
        }
      }
    }
  });
}
