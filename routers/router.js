module.exports=function(app){
  require("./login.js")(app);
  require("./register.js")(app);
  require("./home.js")(app);
  require("./logout.js")(app);
  require("./upload.js")(app);
}
