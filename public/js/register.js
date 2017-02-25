/**
 * === 注册模块 ========================================================================= 
 * @version 0.8
 * @author CoprizePiyo (coprizepiyo@hotmail.com)
 * @description 注册页面事件
 * --- 2017.02.22 ----------------------------
 */
$(function(){
    //初始化验证为true
    var lVerify=true;

    //密码验证
    function verifyPwd(){
        if($('#password').val()==$('#confirmpwd').val()){
            lVerify=true;
            $('#err-msg').hide(200);
        }else{
            lVerify=false;
            $('#err-msg').text('两次密码输入不一致');
            $('#err-msg').show(500);
        }
    }

    //非空验证
    function verifyInput(){
        if($('#username').val()==''){
            lVerify=false;
            $('#err-msg').text('用户名不能为空');
            $('#err-msg').show(500);
        }else if($('#password').val()==''){
            lVerify=false;
            $('#err-msg').text('密码不能为空');
            $('#err-msg').show(500);
        }else if($('#confirmpwd').val()==''){
            lVerify=false;
            $('#err-msg').text('请输入确认密码');
            $('#err-msg').show(500);
        }else{
            verifyPwd();
        }
    }

    function registerClick(){
        verifyInput();
        if(lVerify){
            var uname=$('#username').val(),
                upwd=$('#password').val(),
                data={uname:uname,upwd:upwd};
            $.ajax({
                url:'/register',
                type:'post',
                data:data,
                success:function(data){
                    location.href='/login';
                },
                error:function(data){
                    if(data['responseText'].length>50){
                        showMsg('网络异常错误');
                    }else{
                        showMsg(data['responseText']);
                    } 
                }
            });
        }
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

    $('#register').on('click',registerClick)
    $('#confirmpwd').on('keyup',verifyPwd);
    $('#password').on('keyup',verifyPwd);
});