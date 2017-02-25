var express=require('express');
var router=express.Router();

//请求网站直接显示登录页
router.get('/',function(req,res){
    res.render('login');
});

//请求登录页
router.get('/login',function(req,res){
    res.render('login');
});

//登录
router.post('/login',function(req,res){
    var uname=req.body.uname,
        upwd=req.body.upwd,
        user=global.dbHelper.getModel('user');
    user.findOne({uname:uname},function(err,data){
        if(err){
            res.send(500,'网络错误');
        }else if(!data){
            res.send(404,'用户名不存在');
        }else{ 
            if(data.upwd!=upwd){
                res.send(404,'密码不正确');
            }else{
                req.session.user=data;
                res.render('home');
            }
        }
    });
});

module.exports=router;