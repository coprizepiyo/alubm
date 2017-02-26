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

/**
 * @func 获取图片数据
 * @desc ...
 */
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

/**
 * @func 删除图片
 * @desc ...
 */
router.post('/home/delete',function(req,res){
    if(req.session.user){
        var picture=global.dbHelper.getModel('picture'),
            imgSrc=req.body.imgSrc,
            imgId=req.body.imgId,
            lPath="public/"+imgSrc;
        fs.unlink(lPath,function(err){
            if(err){
                res.send(404,err);
            }else{
                picture.remove({_id:imgId},function(err){
                    if(err){
                        res.send(404,err);
                    } else{
                        res.send(200,'删除成功');
                    }  
                })
            }
        })
    }else{
        res.send('500','网络异常错误');
    }
});

/**
 * @func 更新图片信息
 * @desc ...
 */
router.post('/home/update',function(req,res){
    if(req.session.user){
        var picture=global.dbHelper.getModel('picture'),
            imgId=req.body.imgId,
            imgName=req.body.imgName;
            console.log(imgName);
        picture.findOne({name:imgName},function(err,doc){
            if(err){
                res.send(500,'网络异常错误');
            }else if(doc){
                res.send(404,'图片名已存在');
            }else{
                picture.update({_id:imgId},{name:imgName},function(err){
                    if(err){
                        res.send(500,'网络异常错误');
                    }else{
                        res.send(200,'更新成功');
                    }
                })
            }
        });
    }else{
        res.send(500,'网络异常错误');
    }
});

module.exports=router;