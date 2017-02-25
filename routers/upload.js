module.exports=function(app){
    var multer = require('multer');
    var storage = multer.diskStorage({
      destination: function (req, file, cb) {
            cb(null, './public/uploads')
       },
      filename: function (req, file, cb) {
        var fileFormat = (file.originalname).split(".");
        cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
      }
    })

    var upload = multer({ storage: storage });
    // var upload = multer({
    //     dest: 'public/picture/'
    // });
    app.get('/upload', function(req, res) {
        if (req.session.user) {
            res.render('upload');
        } else {
            req.session.error = "请先登录"
            res.render('login');
        }
    });
    app.post('/upload', upload.array('file', 2), function(req, res, next) {
        if (1==1) {
            var Picture = global.dbHelper.getModel('picture');
            try {
                for (var i = 0; i < req.files.length; i++) {
                    Picture.create({
                        name: req.files[i].originalname,
                        description: req.body.desc,
                        imgSrc:  "uploads/"+req.files[i].filename
                    });
                    //console.log(req.files[i]);
                }
                res.sendStatus(200);
            } catch (e) {
                res.sendStatus(404);
            }
        } else {
            req.session.error = "请先登录"
            res.render('login');
        }
    });
}
