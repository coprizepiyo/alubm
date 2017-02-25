/**
 * === 登录模块 ========================================================================= 
 * @version 0.8
 * @author CoprizePiyo (coprizepiyo@hotmail.com)
 * @description 登录页面事件
 * --- 2017.02.22 ----------------------------
 */
$(function () {
    /**
     * @func 登录
     * @desc ...
     */
    function btnLoginClick() {
        if(verifyInput()){
            var username = $('#username').val(),
                password = $('#password').val(),
                data = { uname: username, upwd: password };
            $.ajax({
                url: '/login',
                type: 'POST',
                data: data,
                success: function (data) {
                    location.href = 'home';
                },
                error: function (data) {
                    //如果程序报错data['responseText']内容是错误信息所以此处判断长度大于50的时候为网络异常
                    if(data['responseText'].length>50){
                        showMsg('网络异常错误')
                    }else{
                        showMsg(data['responseText']);
                    }    
                }
            });
        }
    }

    /**
     * @func 验证
     * @desc ...
     */
    function verifyInput(){
        var verify=true;
        if($('#username').val()==''){
            verify=false;
            showMsg('用户名不能为空');
        }else if($('#password').val()==''){
            verify=false;
            showMsg('密码不能为空');
        }else{
            hideMsg();
        }
        return verify;
    }

    /**
     * @func 显示提醒
     * @desc ...
     */
    function showMsg(msg){
        $('#err-msg').text(msg);
        $('#err-msg').show(500);
    }

    /**
     * @func 隐藏提醒
     * @desc ...
     */
    function hideMsg(){
        $('#err-msg').hide(200);
    }

    //绑定登录按钮的click事件
    $('#btn_login').on('click', btnLoginClick);
});