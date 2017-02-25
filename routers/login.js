module.exports=function(app){
  app.get("/",function(req,res){
    res.render("login");
  });

  app.get("/login",function(req,res){
    res.render("login");
  });

  app.post("/login",function(req,res){
    var user=global.dbHelper.getModel("user");
    var uname = req.body.uname;
    user.findOne({uname:uname},function(err,doc){
      if(err){
        req.session.error = '网络异常错误！';
        res.sendStatus(500);
      }else if(!doc){
        req.session.error = "用户名不存在!";
        res.sendStatus(404);
      }else{
        if(req.body.upwd != doc.upwd){
          req.session.error = "密码错误!";
          res.sendStatus(404);
        }else{
          req.session.user=doc;
          res.sendStatus(200);
        }
      }
    })
  });
}
