var express=require('express');
var router=express.Router();

router.get('/register',function(req,res){
    res.render('register');
});

router.post('/register',function(req,res){
    var uname=req.body.uname,
        upwd=req.body.upwd,
        user=global.dbHelper.getModel('user');
    user.findOne({uname:uname},function(err,data){
        if(err){
            res.send(500,'网络异常错误');
        }else{
            if(data){
                res.send(404,'用户名已存在');
            }else{
                user.create({uname:uname,upwd:upwd},function(err){
                    if(err){
                        res.send(500,'网络异常错误');
                    }else{
                        res.sendStatus(200);
                    }
                });
            }
        }
        
    });
});

module.exports=router;