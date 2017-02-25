/**
 * === 图片展示模块 ========================================================================= 
 * @version 0.8
 * @author CoprizePiyo (coprizepiyo@hotmail.com)
 * @description 处理图片页面的事件
 * --- 2017.02.22 ----------------------------
 */
$(function(){
    function pageInit(){
        $.ajax({
            url:'/home/pictures',
            type:'get',
            success:function(pictures){
                console.log(pictures);
                var app=new Vue({
                    el:"#imodel",
                    data:{
                        pictures:pictures
                    }
                });
                //location.href='/home';
            },
            error:function(data){
                alert(data['responseText']);
            }
        });
    }


    function BtnDelete_Click(obj){
        var lImgId=$(obj).attr('imgId'),
            lImgSrc=$(obj).attr('imgSrc'),
            data={imgId:lImgId,imgSrc:lImgSrc};
        $.ajax({
            url:'/home/delete',
            type:'post',
            data:data,
            success:function(data,status){
                location.href='/home';
            },
            error:function(data,status){
                
            }
        });
    }
    var lEdit_imgId='';
    function BtnEdit_Click(obj){
        lEdit_imgId=$(obj).attr('imgId');
        var lImgName=$(obj).attr('imgName');

        $('#Txt_EditName').val(lImgName);
        $('#myModal').modal({backdrop: 'static'});
        $('#myModal').modal('show');
    }

    function BtnUpdate_Click(){
        $('.alert-danger').hide();
        var data={imgId:lEdit_imgId,imgName:$('#Txt_EditName').val()};
        $.ajax({
            url:'/home/update',
            type:'post',
            data:data,
            success:function(data,status){
                location.href='/home';
            },
            error:function(data,status){
                $('.alert-danger').text(data['responseText']);
                $('.alert-danger').show();
            }
        });
    }

    $('#myModal').on('hide.bs.modal', function () {
        lEdit_imgId='';
        $('#Txt_EditName').val('');
        $('.alert-danger').hide();
        });

        function Page_Click(num){
        $.ajax({
            url:'/home/page',
            type:'post',
            data:{num:num},
            success:function(data,status){
                location.href='/home';
            },
            error:function(data,status){
                alert(data['responseText']);
            }
        });
    }

    pageInit();
});