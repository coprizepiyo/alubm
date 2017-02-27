var express = require('express'),
    router = express.Router(),
    multer = require('multer'),
    storage = multer.diskStorage({
        //设置上传后文件路径，uploads文件夹会自动创建。
        destination: function (req, file, cb) {
            cb(null, './public/uploads')
        },
        //给上传文件重命名，获取添加后缀名
        filename: function (req, file, cb) {
            var fileFormat = (file.originalname).split('.');
            cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
        }
    }),
    //添加配置文件到muler对象。
    upload = multer({ storage: storage });

//如需其他设置，请参考multer的limits,使用方法如下。
//var upload = multer({
//    storage: storage,
//    limits:{}
// });



router.get('/upload', function (req, res) {
    res.render('upload');
});

router.post('/upload', upload.array('file', 2), function (req, res, next) {
    if (1 == 1) {
        var Picture = global.dbHelper.getModel('picture');
        try {
            for (var i = 0; i < req.files.length; i++) {
                Picture.create({
                    name: req.files[i].filename,
                    description: req.body.desc,
                    imgSrc: "uploads/" + req.files[i].filename
                });
                console.log(req.files[i]);
            }
            res.sendStatus(200);
        } catch (e) {
            res.sendStatus(404);
        }
    } else {
        res.render('login');
    }
});

module.exports = router;