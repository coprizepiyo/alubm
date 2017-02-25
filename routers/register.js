module.exports=function(app){
  app.get("/register",function(req,res){
    res.render("register");
  });

  app.post("/register",function(req,res){
    var user=global.dbHelper.getModel("user");
    user.findOne({uname:req.body.uname},function(err,doc){
      if(err){
        req.session.error="网络错误";
        res.sendStatus("500");
      }else if(doc){
        req.session.error="用户名已存在";
        res.sendStatus("404");
      }
      else{
        user.create({uname:req.body.uname,upwd:req.body.upwd},function(err){
          if (err) {
            res.sendStatus(500);
            console.log(error);
          } else {
            req.session.error = '用户创建成功！';
            res.sendStatus(200);
          }
        })
      }
    })
  });
}
