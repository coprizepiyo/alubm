var express=require('express'),
    router=express.Router(),
    fs=require('fs');


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
        var picture=global.dbHelper.getModel('picture');
        picture.find({},function(err,data){
            
            //var string = JSON.stringify(data);
            //console.log(string);
            res.send(data);
        });
    }
    else{
        res.send('123123');
    }
});

router.post('/home/delete',function(req,res){
    if(req.session.user){
        var picture=global.dbHelper.getModel('picture'),
            imgSrc=req.body.imgSrc,
            imgId=req.body.imgId,
            path="public/"+imgSrc;
        fs.unlinkSync(path,function(err){
            if(err){
                res.send(404,err);
            }else{
                picture.remove({_id:imgId},function(err){
                    if(err){
                        res.send(404,err);
                    } else{
                        res.send(200,"删除成功")
                    }  
                })
            }
        })
    }else{
        res.send('500',"网络异常错误");
    }
});

module.exports=router;