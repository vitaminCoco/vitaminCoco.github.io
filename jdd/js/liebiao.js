/**
 * Created by Administrator on 2016/10/5.
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
        })

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
                        })
                        searchlist.html(subHtml);
                    }

            })
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
        })

        //----------------nav--------------------------
        var menu     = $("#nav .menu");
        var menuP    = $("#nav .p");
        var menuList = $("#nav .menu-left");
        menuP.mouseenter(function(){
            menuList.show();
        })
        menu.mouseleave(function(){
            menuList.hide();
        })

        //------------------轮播图---------------------
        var iIndex       = 0;
        var conLeft      = $(".con-left");
        var imgList      = $(".imglist ul");
        var btnList      = $(".btnlist a");
        var directionBtn = $(".direction");
        var leftBtn      = $(".direction .leftbtn");
        var rightBtn     = $(".direction .rightbtn");
        var lbBtn         = true;
        var lbTimer       = null;
        var imgWidth     = 550;
        //按钮点击
        btnList.click(function(){
            var iIndex = $(this).index();
            btnList.removeClass("hover").eq(iIndex).addClass("hover");
            imgList.stop(true).animate({
                left:-iIndex*imgWidth
            })
        });
        //自动播放
        function autoplay(){
            lbTimer=setInterval(function(){
                    iIndex++;
                    if(iIndex>btnList.length-1){
                        iIndex = 0
                    }
                    imgList.stop(true).animate({
                        left:-iIndex*imgWidth
                    });
                    btnList.removeClass("hover").eq(iIndex).addClass("hover");
                },
                3000);
        }autoplay();
        //移入移出
        conLeft.mouseenter(function(){
            clearInterval(lbTimer)
            directionBtn.show();
        });
        conLeft.mouseleave(function(){
            autoplay();
            directionBtn.hide();
        });
        //方向按钮
        leftBtn.click(function(){
            if(lbBtn){
                lbBtn = false;
                iIndex--;
                if(iIndex<0){
                   iIndex = btnList.length-1
                }
                imgList.stop(true).animate({
                    left:-iIndex*imgWidth
                },function(){
                    lbBtn = true;
                });
                btnList.removeClass("hover").eq(iIndex).addClass("hover");
            }
        });

        rightBtn.click(function(){
            if(lbBtn){
                lbBtn = false;
                iIndex++;
                if(iIndex == btnList.length){
                    iIndex = 0
                }
                imgList.stop(true).animate({
                    left:-iIndex*imgWidth
                },function(){
                    lbBtn = true;
                });
                btnList.removeClass("hover").eq(iIndex).addClass("hover");
            }
        })

        //-------------------树形列表----------------------
        $.fn.openActive = function(activeSel) {
            activeSel = activeSel || ".active";

            var c = this.attr("class");

            this.find(activeSel).each(function(){
                var el = $(this).parent();
                while (el.attr("class") !== c) {
                    if(el.prop("tagName") === 'UL') {
                        el.show();
                    } else if (el.prop("tagName") === 'LI') {
                        el.removeClass('tree-closed');
                        el.addClass("tree-opened");
                    }

                    el = el.parent();
                }
            });

            return this;
        }

        $.fn.treemenu = function(options) {
            options = options || {};
            options.delay = options.delay || 0;
            options.openActive = options.openActive || false;
            options.activeSelector = options.activeSelector || "";

            this.addClass("treemenu");
            this.find("> li").each(function() {
                e = $(this);
                var subtree = e.find('> ul');
                var button = e.find('span').eq(0).addClass('toggler');

                if( button.length == 0) {
                    var button = $('<span>');
                    button.addClass('toggler');
                    e.prepend(button);
                } else {
                    button.addClass('toggler');
                }

                if(subtree.length > 0) {
                    subtree.hide();

                    e.addClass('tree-closed');

                    e.find(button).click(function() {
                        var li = $(this).parent('li');
                        li.find('> ul').slideToggle(options.delay);
                        li.toggleClass('tree-opened');
                        li.toggleClass('tree-closed');
                        li.toggleClass(options.activeSelector);
                    });

                    $(this).find('> ul').treemenu(options);
                } else {
                    $(this).addClass('tree-empty');
                }
            });

            if (options.openActive) {
                this.openActive(options.activeSelector);
            }

            return this;
        };

        $(".tree").treemenu({delay:300}).openActive();

        //----------------排序-----------------
        var pxLi = $(".px li");
        pxLi.click(function(){
            var iIndex = $(this).index();
            pxLi.removeClass("select").eq(iIndex).addClass("select");
        });

        //------------------------商品所在地-----------------
        var addRess       = $(".address");
        var addResswrap   = $(".address .wrap");
        var addChoice     = $(".address .choice");

        addResswrap.mouseenter(function(){
            addChoice.show();
            addResswrap.addClass("hover")
        });
        addRess.mouseleave(function(){
            addChoice.hide();
            addResswrap.removeClass("hover")
        })

        //--------------------商品信息----------------
        var goodsInfo = $(".mainr .goods-info");
        var goodsList = $(".mainr .goodslist>li");
        var goodsWrap = $(".mainr .wrap");
        goodsList.mouseenter(function(){
            var iIndex =$(this).index();
            goodsInfo.eq(iIndex).stop(true).animate({
                top:180
            })
        });
        goodsList.mouseleave(function() {
            var iIndex = $(this).index();
            goodsInfo.eq(iIndex).stop(true).animate({
                top: 230
            })
        })
            /*或者
            goodsList.mouseenter(function(){
                var iIndex =$(this).index();
                goodsInfo.eq(iIndex).css({
                    top:180
                })
            });
            goodsList.mouseleave(function(){
                var iIndex =$(this).index() ;
                goodsInfo.eq(iIndex).css({
                    top:230
                })
            })*/

        //--------------------------------购物车---------------------------
        var addCart = $(".add-cart");
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
                    goodNum   :  1
                }
                sGoods.push(oGoods)
            }
            setCookie("goods",JSON.stringify(sGoods),7,"/")
        })











    })
})(jQuery)