var express=require('express');
var router=express.Router();

router.get('/home',function(req,res){
    if(req.session.user){
        res.render('home');
    }
    else{
        res.send('123123');
    }
});

router.get('/home/pictures',function(req,res){
    if(req.session.user){
        var user=global.dbHelper.getModel('user');
        user.find({},function(err,data){
            res.send(data);
        });
    }
    else{
        res.send('123123');
    }
});

router.post('/home',function(req,res){
    res.send(200,'hello');
});

module.exports=router;