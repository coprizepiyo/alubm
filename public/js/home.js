/**
 * === 图片展示模块 ========================================================================= 
 * @version 0.8
 * @author CoprizePiyo (coprizepiyo@hotmail.com)
 * @description 处理图片页面的事件
 * --- 2017.02.22 ----------------------------
 */
$(function(){
       var app=new Vue({
            el:"#imodel",
            data:{
                pictures:[],
                temp:{
                    index:'',
                    imgId:'',
                    imgName:''
                }
            },
            methods:{
                deletePicture:function(index){
                    var lData={
                        imgId:this.pictures[index]._id,
                        imgSrc:this.pictures[index].imgSrc
                    }
                    $.ajax({
                        url:'/home/delete',
                        type:'post',
                        data:lData,
                        success:function(data,status){
                            location.href='/home';
                        },
                        error:function(data,status){
                            alert(data['responseText']);
                        }
                    });
                },
                editPicture:function(index){
                    this.temp.imgName=this.pictures[index].name;
                    this.temp.imgId=this.pictures[index]._id;
                    this.temp.index=index;

                    $('#Txt_EditName').val(this.temp.imgName);
                    $('#myModal').modal({backdrop: 'static'});
                    $('#myModal').modal('show');
                },
                updatePicture:function(){
                    var lData={
                            imgId:this.temp.imgId,
                            imgName:this.temp.imgName
                        },
                        index=this.temp.index;
                        pictures=this.pictures;
                    $.ajax({
                        url:'/home/update',
                        type:'post',
                        data:lData,
                        success:function(data){
                            pictures[index].name=lData.imgName;
                            $('.alert-danger').text('更新成功');
                            $('.alert-danger').show(500);
                            
                        },
                        error:function(data){
                            alert(data['responseText']);
                        }
                    });
                }
            }
        });


    function pageInit(){
        $.ajax({
            url:'/home/pictures',
            type:'get',
            success:function(pictures){
                console.log(pictures);
                app.pictures=pictures;
                //location.href='/home';
            },
            error:function(data){
                alert(data['responseText']);
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