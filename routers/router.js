/**
 * === 路由模块 ========================================================================= 
 * @version 0.8
 * @author CoprizePiyo (coprizepiyo@hotmail.com)
 * @description 路由
 * --- 2017.02.21 ----------------------------
 */
module.exports=function(app){
    app.use(require('./login.js'));
    app.use(require('./register.js'));
    app.use(require('./home.js'));
    app.use(require('./upload.js'));
}