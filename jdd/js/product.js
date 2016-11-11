/**
 * Created by Administrator on 2016/10/6.
 */
(function($){
    $(function(){
        //--------------五角星旋转-------------------------
        /* $('.fav a').hover(
         function(){$('.fav a img').removeClass("unturn").addClass("turn")},
         function(){$('.fav a img').removeClass("turn").addClass("unturn")}
         );*/
        //---------------头部导航---------------------
        var hideBox = $(".hidebox");
        var hide    = $(".hide");
        hideBox.hover(function(){
            var iIndex = $(this).index();
            hide.css({
                display : "none"
            }).eq(iIndex).css({
                display : "block"
            })
        },function(){
            hide.css({
                display:"none"
            })
        });

        //------------------subbanner----------------
        var closeBan  = $(".close1");
        var subBanner = $("#subbanner");
        closeBan.click(function(){
            subBanner.hide();
        });

        //------------------logo tab-----------------
        var Tab = $(".tab a");
        Tab.click(function(){
            var iIndex = $(this).index();
            Tab.removeClass("active").eq(iIndex).addClass("active")
        });

        //----------------搜索框跨域------------------
        var tx     = $("#tx");
        var sIndex = -1;
        tx.bind("input propertychange",function(){
            if($("#tx").val()==""){
                $("#searchlist").hide();
            }else{
                $("#searchlist").show();
            }
            $.ajax({
                type:"get",
                url:"https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?json=1&p=3&sid=19638_1461_18240_17944_21124_19898_21193_21161_20718&req=2&sc=eb&csor=0",
                dataType : "jsonp",
                jsonp   : "cb",
                data    : {
                    wd:$(this).val()
                },
                success:
                    function(data){
                        var subHtml    = " ";
                        var searchlist = $("#searchlist");
                        var len        = data.s.length;
                        $.each(data.s,function(m,n){
                            subHtml += "<li><a href='javascript:;'> "+n+"</a></li>"
                        });
                        searchlist.html(subHtml);
                    }

            });
            sIndex=-1;
        });

        //-------------添加键盘事件----------------
        $("#tx").keydown(function(evt){
            var list  = $("#searchlist li");
            var event = evt||window.event;
            var code = event.keyCode||event.which;
            if(list.length&&code==38||code==40){
                if(code==38){
                    sIndex--;
                    if(sIndex<0){
                        sIndex=list.length-1;
                    }
                }
                if(code==40){
                    sIndex++;
                    if(sIndex==list.length){
                        sIndex=0;
                    }
                }
                list.removeClass("active").eq(sIndex).addClass("active");
                $("#tx").val(list.eq(sIndex).text());
                return false;
            }
        });

        //-----------------添加焦点事件------------
        $("#tx").focus(function(){
            if($("#tx").val()==""){
                $("#searchlist").hide();
            }else{
                $("#searchlist").show();
            }
        });
        $("#tx").blur(function(){
            $("#searchlist").hide();
        });

        //-------------我的商城和购物车结算-------------
        var myShop = $(".myshop");
        var myCart = $(".mycart");
        var hide1  = $(".myshop .hide");
        var hide2  = $(".mycart .hide");
        myShop.hover(function(){
            hide1.show()
        },function(){
            hide1.hide()
        });
        myCart.hover(function(){
            hide2.show()
        },function(){
            hide2.hide()
        });
        //----------------nav--------------------------
        var menu     = $("#nav .menu");
        var menuP    = $("#nav .p");
        var menuList = $("#nav .menu-left");
        menuP.mouseenter(function(){
            menuList.show();
        });
        menu.mouseleave(function(){
            menuList.hide();
        });

        //----------------------放大镜------------------
        var bigImg   = $(".bigbox li");
        var smallImg = $(".smallbox li");
        smallImg.click(function(){
            var iIndex = $(this).index();
            bigImg.hide().eq(iIndex).show();
            smallImg.removeClass("select").eq(iIndex).addClass("select");
            var iSrc = $(".bigbox li").eq(iIndex).find("img").attr("src");
            bigImage.attr({
                src:iSrc
            })
        });

        var origin     = $("#bigbox");
        var move       = $("#move");
        var bigger     = $("#bigger");
        var bigImage   = $("#bigger img");
        var movewidth  = move.width();
        var moveheight = move.height();
        var maxx       = origin.innerWidth()-movewidth;
        var maxy       = origin.innerHeight()-moveheight;
        var scale      = bigger.width()/movewidth
        origin.mouseenter(function(){
            move.show();
            bigger.show();
        });
        origin.mouseleave(function(){
            move.hide();
            bigger.hide();
        });
        origin.mousemove(function(evt){
            var event = evt||window.event;
            var iScrolltop = $(window).scrollTop();
            var x=event.clientX-origin.offset().left-move.innerWidth()/2;
            var y=event.clientY-origin.offset().top-move.innerHeight()/2+iScrolltop;
            if(x<0){
                x=0;
            }
            if(x>maxx){
                x=maxx;
            }
            if(y<0){
                y=0;
            }
            if(y>maxy){
                y=maxy
            }
            move.css({
                left:x,
                top:y
            });
            bigImage.css({
                left:-x*scale,
                top:-y*scale
            })
        });
        //-----------------店铺二维码------------------------
        var box6Li     = $(".box6 li");
        var storeCode  = $(".box6 .code");
        var storeCodea = $(".box6 .code a");
        var codeHide   = $(".box6 .code div");
        box6Li.mouseenter(function(){
            var iIndex = $(this).index();
            box6Li.removeClass("hover").eq(iIndex).addClass("hover");
        });
        box6Li.mouseleave(function(){
            box6Li.removeClass("hover")
        });
        storeCodea.mouseenter(function(){
            codeHide.show();
        });
        storeCode.mouseleave(function(){
            codeHide.hide();
        });

        //--------------商品二维码------------------------
        var mate1Code = $(".codeimg");
        var mate1Hide = $(".mate1 span");
        var mate1Wrap = $(".mate1 .wrap");
        mate1Code.mouseenter(function(){
            mate1Hide.show();
        });
        mate1Wrap.mouseleave(function(){
            mate1Hide.hide();
        });
        //----------------------商品排行----------------
        var hotA = $('.hot a');
        var hotList = $(".hotlist");
        hotA.mouseenter(function(){
            var iIndex = $(this).index();
            hotA.removeClass("select").eq(iIndex).addClass("select");
            hotList.hide().eq(iIndex).show();
        });

        //商品详情/商品评价/销售记录/购买咨询 切换
        var tabNavli = $(".sp-info .tab-nav li");
        tabNavli.click(function(){
            var iIndex = $(this).index();
            tabNavli.removeClass("current").eq(iIndex).addClass("current");
        });


        //----------------slidebar------------------
        var closeBtn  = $("#slidebar .close");
        var slidebar  = $("#slidebar");
        var backTop   = $("#slidebar .backtop");
        var backTopa  = $("#slidebar .backtop a");
        var slTimer   = null;
        var toolSlide = $("#toolhide");
        var toolShow  = $("#toolhide .show");
        closeBtn.click(function(){
            slidebar.stop(true).animate({
                right:-60
            });
            toolSlide.stop(true).animate({
                right:0
            })
        });
        toolSlide.click(function(){
            slidebar.stop(true).animate({
                right:0
            });
            toolSlide.stop(true).animate({
                right:-79
            })
        });
        //回到顶部
        backTop.click(function(){
            slTimer=setInterval(function(){
                var iSrolltop = $("body").scrollTop();
                if(iSrolltop==0){
                    clearInterval(slTimer)
                }
                $("body").scrollTop(iSrolltop-50)
            },1)
        });
        $(window).scroll(function(){
            var iSrolltop = $("body").scrollTop();
            if(iSrolltop<30){
                backTopa.css({
                    opacity:0.5
                })
            }else{
                backTopa.css({
                    opacity:1
                })
            }
        });
        //-------------工具条--------------
        toolSlide.hover(function(){
            toolShow.show();
        },function(){
            toolShow.hide();
        });
        //购物车隐藏模块
        var cartTool = $("#slidebar .cart");
        var cartBtn  = $(".cartbtn");
        var cartHide = $(".carthide");
        var bBtn     = true;
        cartTool.click(function(){
            if(bBtn){
                cartHide.stop(true).animate({
                    right:50
                },function(){
                    bBtn = false
                })
            }else{
                cartHide.stop(true).animate({
                    right:-210
                },function(){
                    bBtn = true
                })
            }
        });
        cartBtn.click(function(){
            cartHide.stop(true).animate({
                right:-210
            })
        });

        //---------购买数量加减--------
        var Num       = $("#tx1");
        var decreaseB = $(".decrease");
        var increaseB = $(".increase");
        decreaseB.click(function(){
            if(Num.val()==1){
                return;
            }
            Num.val(Num.val()-1);
        });
        increaseB.click(function(){
            Num.val(parseInt(Num.val())+1);
        });

        //--------------------购物车---------------------------
        var addCart = $(".buy .add-cart");
        var dialogBox = $("#dialog");
        var dialogClose = $("#dialog .close");
        var btnA2     = $("#dialog .a2");
        addCart.click(function(){
            var iIndex = $(this).index();

            var iGoodsrc   = $(this).attr("data-img");
            var iGoodstore = $(this).attr("data-store");
            var iGoodname  = $(this).attr("data-name");
            var iGoodprice = $(this).attr("data-price");
            var aGoods = getCookie("goods");
            var sBbtn  = true;



            if(aGoods==undefined){
                sGoods = [];
            }else{
                sGoods = JSON.parse(aGoods)
            }

            $.each(sGoods,function(m,n){
                if(n.goodSrc==iGoodsrc){
                    n.goodNum++;
                    sBbtn=false;
                }
            });

            if(sBbtn){
                var oGoods = {
                    goodSrc   :  iGoodsrc,
                    goodStore :  iGoodstore,
                    goodName  :  iGoodname,
                    goodPrice :  iGoodprice,
                    goodNum   :  Num.val()
                };
                sGoods.push(oGoods)
            }
            setCookie("goods",JSON.stringify(sGoods),7,"/")

            dialogBox.show();
            //----加入购物车提示中显示目前购物车中的商品数量和总价------
            var cartNum = $("#dialog strong");
            var cartPrice = $("#dialog em");
            var sGoods = getCookie("goods");
            var aGoods = JSON.parse(sGoods);
            var allPrice = 0;
            cartNum.text(aGoods.length);
            for(var j =0 ;j<aGoods.length;j++){
                allPrice += (aGoods[j].goodNum)*(aGoods[j].goodPrice);
            }
            cartPrice.text(allPrice.toFixed(2))

        });
        //------加入购物车提示--------
        dialogClose.click(function(){
            dialogBox.hide();
        });
        btnA2.click(function(){
            dialogBox.hide();
        });





    });
})(jQuery)