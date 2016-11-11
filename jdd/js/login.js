/**
 * Created by Administrator on 2016/10/7.
 */
(function($){
    $(function(){
        //------------------subbanner----------------
        var closeBan  = $(".close1");
        var subBanner = $("#subbanner");
        closeBan.click(function(){
            subBanner.hide();
        });
        var reg1 = /^[Bb][Aa][Mm][Rr]$/;
        //------------------用户登录----------------------
        var inputBox = $(".enter-info .tx");
        var onError  = $(".enter-info .onerror");
        var loginBtn = $("#btn");
        var rBtn     = false;
        loginBtn.click(function(){
            if($("#tx").val()==""){
                $(".username .onerror").show();
                rBtn = false;
                //return;
            }else{
                $(".username .onerror").hide();
                rBtn = true;
            }
            if($("#pwd").val()==""){
                $(".password .onerror").show();
                rBtn = false;
                //return;
            }else{
                $(".password .onerror").hide();
                rBtn = true;
            }

            //var reg1 = /^[Bb][Aa][Mm][Rr]$/;
            var str1 = $("#check").val();
            if($("#check").val()==""){
                $(".checkcode .onerror").show()
                rBtn = false;
                return false;
            }else if(!reg1.test(str1)){
                $(".checkcode .onerror").show().text("输入的验证码有误");
                rBtn = false;
                return false;
            }else{
                $(".checkcode .onerror").hide();
                //rBtn = true;
                }

            if(rBtn){
                    location.href="jdd.html"
            }

        })





    })
})(jQuery)
