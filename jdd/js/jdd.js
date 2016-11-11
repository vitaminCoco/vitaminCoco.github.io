/**
 * Created by Administrator on 2016/10/3.
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

        // **************banner部分js***************
        var btnListA      = $(".btn-list a");
        var bannerImgList = $(".banner-img li");
        var bannerImgA    = $(".banner-img li a");
        var oTimer        = null;
        var iIndex        = 0;
        btnListA.click(function(){
            var iIndex = $(this).index();
            btnListA.removeClass("b-active").eq(iIndex).addClass("b-active");
            bannerImgList.animate({opacity:0},function(){
                $(this).css({display:"none"});
            });
            bannerImgList.eq(iIndex).css({display:"block"}).stop(true).animate({opacity:1});
        });

        function setRun1(){
            oTimer=setInterval(function(){
                iIndex++;
                if(iIndex == bannerImgList.length){
                    iIndex = 0;
                }
                btnListA.removeClass("b-active").eq(iIndex).addClass("b-active");
                bannerImgList.animate({opacity:0},function(){
                    $(this).css({display:"none"});
                });
                bannerImgList.eq(iIndex).css({display:"block"}).stop(true).animate({opacity:1});
            },4000);
        }
        setRun1();

        bannerImgA.hover(function(){
            clearInterval(oTimer);
        },function(){
            setRun1();
        });

        // ******************banner-bot部分js***********

        var baboList = $(".babo-list");
        var liWidth  = 777;
        var iTimer   = null;
        var oIndex   = 0;
        function setRun2(){
            iTimer=setInterval(function(){
                oIndex++;
                if(oIndex == 3){
                    oIndex = 0;
                }
                baboList.stop(true).animate({left:-liWidth*oIndex})
            },3000);
        }
        setRun2();
        baboList.hover(function(){
            clearInterval(iTimer);
        },function(){
            clearInterval(iTimer);
            setRun2();
        });

        //------------------banner-rg部分选项卡-----------------
        var tabNavli = $(".proclamation .tabnav li");
        var conList  = $(".proclamation .con");
        tabNavli.mouseenter(function(){
            var iIndex = $(this).index();
            tabNavli.removeClass("select").eq(iIndex).addClass("select");
            conList.hide().eq(iIndex).show();
        })

        //---------------------main1------------------
        var arrowL    = $(".main1 .arrow");
        var arrowList = $(".main1 .tab-nav li");
        var fruitList = $(".fruitlist");
        arrowList.mouseenter(function(){
            var iIndex = $(this).index();
            arrowList.removeClass("hover").eq(iIndex).addClass("hover");
            arrowL.hide().eq(iIndex).show();
            fruitList.hide().eq(iIndex).show();
        });
        //--------------------生活的橱窗------------------
        var showBox = $(".showbox");
        var showImg = $(".goodsimg img");
        showBox.hover(function(){
            var iIndex = $(this).index();
            showImg.eq(iIndex).stop(true).animate({
                left:-20
            },250)
        },function(){
            var iIndex = $(this).index();
            showImg.eq(iIndex).stop(true).animate({
                left:0
            },250)
        });
        //-------------------1F 特产优联-----------------------
        var midList1   = $(".mid-ads1 .tab-nav li");
        var midArrow1  = $(".mid-ads1 .tab-nav .arrow");
        var tabPanels1 = $(".mid-ads1 .tab-panel");
        midList1.mouseenter(function(){
            var iIndex = $(this).index();
            midList1.removeClass("select").eq(iIndex).addClass("select")
            midArrow1.hide().eq(iIndex).show();
            tabPanels1.hide().eq(iIndex).show();
        });

        var midPanel1a1 = $(".mid-ads1 .panel1 a");
        var midPanel11  = $(".mid-ads1 .panel1");
        midPanel1a1.mouseenter(function(){
            var iIndex = $(this).index();
            midPanel1a1.stop(true).animate({
                opacity:0.5
            },300).eq(iIndex).stop(true).animate({
                opacity:1
            },300)
        });
        midPanel11.mouseleave(function(){
            midPanel1a1.stop(true).animate({
                opacity:1
            })
        });

        var panel21     = $(".mid-ads1 .panel2");
        var panel2List1 = $(".mid-ads1 .panel2 li");
        panel2List1.mouseenter(function(){
            var iIndex = $(this).index();
            panel2List1.stop(true).animate({
                opacity:0.25
            }).eq(iIndex).stop(true).animate({
                opacity:1
            })
        });
        panel21.mouseleave(function(){
            panel2List1.stop(true).animate({
                opacity:0.9
            })
        });

        var brandAll1  = $(".brandlist1");
        var brandList1 = $(".brandlist1 li");
        brandList1.mouseenter(function(){
            var iIndex=$(this).index();
            brandList1.stop(true).animate({
                opacity:0.5
            },300).eq(iIndex).stop(true).animate({
                opacity:1
            },300)
        });
        brandAll1.mouseleave(function(){
            brandList1.stop(true).animate({
                opacity:1
            },300)
        })

        var sideBtn1      = $(".sidefocus1 .btn a");
        var sideFocus1    = $(".sidefocus1 ul");
        var sideFocusli1  = $(".sidefocus1 ul li");
        var sideImgwidth1 = 212;
        var sTimer      = null;
        var aIndex       = 0;
        sideBtn1.mouseenter(function(){
            var aIndex = $(this).index();
            sideBtn1.removeClass("active").eq(aIndex).addClass("active");
            sideFocus1.stop(true).animate({
                left:-aIndex*sideImgwidth1
            })
        });
        function autoPlay1(){
            sTimer=setInterval(function(){
                aIndex++;
                if(aIndex==2){
                    aIndex=0
                }
                sideBtn1.removeClass("active").eq(aIndex).addClass("active");
                sideFocus1.stop(true).animate({
                    left:-aIndex*sideImgwidth1
                })
            },4000);
        }autoPlay1()

        $(".sidefocus1").mouseenter(function(){
            clearInterval(sTimer)
        })
        $(".sidefocus1").mouseleave(function(){
            autoPlay1();
        })
        //--------------2F 电脑数码----------------------
        var midList2   = $(".mid-ads2 .tab-nav li");
        var midArrow2  = $(".mid-ads2 .tab-nav .arrow");
        var tabPanels2 = $(".mid-ads2 .tab-panel");
        midList2.mouseenter(function(){
            var iIndex = $(this).index();
            midList2.removeClass("select").eq(iIndex).addClass("select")
            midArrow2.hide().eq(iIndex).show();
            tabPanels2.hide().eq(iIndex).show();
        });

        var midPanel1a2 = $(".mid-ads2 .panel1 a");
        var midPanel12  = $(".mid-ads2 .panel1");
        midPanel1a2.mouseenter(function(){
            var iIndex = $(this).index();
            midPanel1a2.stop(true).animate({
                opacity:0.5
            },300).eq(iIndex).stop(true).animate({
                opacity:1
            },300)
        });
        midPanel12.mouseleave(function(){
            midPanel1a2.stop(true).animate({
                opacity:1
            })
        });

        var panel22     = $(".mid-ads2 .panel2");
        var panel2List2 = $(".mid-ads2 .panel2 li");
        panel2List2.mouseenter(function(){
            var iIndex = $(this).index();
            panel2List2.stop(true).animate({
                opacity:0.25
            }).eq(iIndex).stop(true).animate({
                opacity:1
            })
        });
        panel22.mouseleave(function(){
            panel2List2.stop(true).animate({
                opacity:0.9
            })
        });

        var brandAll2  = $(".brandlist2");
        var brandList2 = $(".brandlist2 li");
        brandList2.mouseenter(function(){
            var iIndex=$(this).index();
            brandList2.stop(true).animate({
                opacity:0.5
            },300).eq(iIndex).stop(true).animate({
                opacity:1
            },300)
        });
        brandAll2.mouseleave(function(){
            brandList2.stop(true).animate({
                opacity:1
            },300)
        })

        var sideBtn2      = $(".sidefocus2 .btn a");
        var sideFocus2    = $(".sidefocus2 ul");
        var sideFocusli2  = $(".sidefocus2 ul li");
        var sideImgwidth2 = 212;
        var iTimer2      = null;
        var iIndex2       = 0;
        sideBtn2.mouseenter(function(){
            var iIndex2 = $(this).index();
            sideBtn2.removeClass("active").eq(iIndex2).addClass("active");
            sideFocus2.stop(true).animate({
                left:-iIndex2*sideImgwidth2
            })
        });
        function autoPlay2(){
            iTimer2=setInterval(function(){
                iIndex2++;
                if(iIndex2==2){
                    iIndex2=0
                }
                sideBtn2.removeClass("active").eq(iIndex2).addClass("active");
                sideFocus2.stop(true).animate({
                    left:-iIndex2*sideImgwidth2
                })
            },4000);
        }autoPlay2()

        $(".sidefocus2").mouseenter(function(){
            clearInterval(iTimer2)
        })
        $(".sidefocus2").mouseleave(function(){
            autoPlay2();
        })

        //--------------3F 服饰鞋包-----------------
        var midList3   = $(".mid-ads3 .tab-nav li");
        var midArrow3  = $(".mid-ads3 .tab-nav .arrow");
        var tabPanels3 = $(".mid-ads3 .tab-panel");
        midList3.mouseenter(function(){
            var iIndex = $(this).index();
            midList3.removeClass("select").eq(iIndex).addClass("select")
            midArrow3.hide().eq(iIndex).show();
            tabPanels3.hide().eq(iIndex).show();
        });

        var midPanel1a3 = $(".mid-ads3 .panel1 a");
        var midPanel13  = $(".mid-ads3 .panel1");
        midPanel1a3.mouseenter(function(){
            var iIndex = $(this).index();
            midPanel1a3.stop(true).animate({
                opacity:0.5
            },300).eq(iIndex).stop(true).animate({
                opacity:1
            },300)
        });
        midPanel13.mouseleave(function(){
            midPanel1a3.stop(true).animate({
                opacity:1
            })
        });

        var panel23     = $(".mid-ads3 .panel2");
        var panel2List3 = $(".mid-ads3 .panel2 li");
        panel2List3.mouseenter(function(){
            var iIndex = $(this).index();
            panel2List3.stop(true).animate({
                opacity:0.25
            }).eq(iIndex).stop(true).animate({
                opacity:1
            })
        });
        panel23.mouseleave(function(){
            panel2List3.stop(true).animate({
                opacity:0.9
            })
        });

        var brandAll3  = $(".brandlist3");
        var brandList3 = $(".brandlist3 li");
        brandList3.mouseenter(function(){
            var iIndex=$(this).index();
            brandList3.stop(true).animate({
                opacity:0.5
            },300).eq(iIndex).stop(true).animate({
                opacity:1
            },300)
        });
        brandAll3.mouseleave(function(){
            brandList3.stop(true).animate({
                opacity:1
            },300)
        })

        var sideBtn3      = $(".sidefocus3 .btn a");
        var sideFocus3    = $(".sidefocus3 ul");
        var sideFocusli3  = $(".sidefocus3 ul li");
        var sideImgwidth3 = 212;
        var iTimer3       = null;
        var iIndex3       = 0;
        sideBtn3.mouseenter(function(){
            var iIndex3 = $(this).index();
            sideBtn3.removeClass("active").eq(iIndex3).addClass("active");
            sideFocus3.stop(true).animate({
                left:-iIndex3*sideImgwidth3
            })
        });
        function autoPlay3(){
            iTimer3=setInterval(function(){
                iIndex3++;
                if(iIndex3==2){
                    iIndex3=0
                }
                sideBtn3.removeClass("active").eq(iIndex3).addClass("active");
                sideFocus3.stop(true).animate({
                    left:-iIndex3*sideImgwidth3
                })
            },4000);
        }autoPlay3()

        $(".sidefocus3").mouseenter(function(){
            clearInterval(iTimer3)
        })
        $(".sidefocus3").mouseleave(function(){
            autoPlay3();
        })
        //--------------------4F 美容珠宝----------------
        var midList4   = $(".mid-ads4 .tab-nav li");
        var midArrow4  = $(".mid-ads4 .tab-nav .arrow");
        var tabPanels4 = $(".mid-ads4 .tab-panel");
        midList4.mouseenter(function(){
            var iIndex = $(this).index();
            midList4.removeClass("select").eq(iIndex).addClass("select")
            midArrow4.hide().eq(iIndex).show();
            tabPanels4.hide().eq(iIndex).show();
        });

        var panel24     = $(".mid-ads4 .panel2");
        var panel2List4 = $(".mid-ads4 .panel2 li");
        panel2List4.mouseenter(function(){
            var iIndex = $(this).index();
            panel2List4.stop(true).animate({
                opacity:0.25
            }).eq(iIndex).stop(true).animate({
                opacity:1
            })
        });
        panel24.mouseleave(function(){
            panel2List4.stop(true).animate({
                opacity:0.9
            })
        });

        var brandAll4  = $(".brandlist4");
        var brandList4 = $(".brandlist4 li");
        brandList4.mouseenter(function(){
            var iIndex=$(this).index();
            brandList4.stop(true).animate({
                opacity:0.5
            },300).eq(iIndex).stop(true).animate({
                opacity:1
            },300)
        });
        brandAll4.mouseleave(function(){
            brandList4.stop(true).animate({
                opacity:1
            },300)
        })

        var sideBtn4      = $(".sidefocus4 .btn a");
        var sideFocus4    = $(".sidefocus4 ul");
        var sideFocusli4  = $(".sidefocus4 ul li");
        var sideImgwidth4 = 212;
        var iTimer4       = null;
        var iIndex4       = 0;
        sideBtn4.mouseenter(function(){
            var iIndex4 = $(this).index();
            sideBtn4.removeClass("active").eq(iIndex4).addClass("active");
            sideFocus4.stop(true).animate({
                left:-iIndex4*sideImgwidth4
            })
        });
        function autoPlay4(){
            iTimer4=setInterval(function(){
                iIndex4++;
                if(iIndex4==2){
                    iIndex4=0
                }
                sideBtn4.removeClass("active").eq(iIndex4).addClass("active");
                sideFocus4.stop(true).animate({
                    left:-iIndex4*sideImgwidth4
                })
            },4000);
        }autoPlay4();

        $(".sidefocus4").mouseenter(function(){
            clearInterval(iTimer4)
        });
        $(".sidefocus4").mouseleave(function(){
            autoPlay4();
        });

        //-----------------5F 居家生活----------------------
        var midList5   = $(".mid-ads5 .tab-nav li");
        var midArrow5  = $(".mid-ads5 .tab-nav .arrow");
        var tabPanels5 = $(".mid-ads5 .tab-panel");
        midList5.mouseenter(function(){
            var iIndex = $(this).index();
            midList5.removeClass("select").eq(iIndex).addClass("select")
            midArrow5.hide().eq(iIndex).show();
            tabPanels5.hide().eq(iIndex).show();
        });

        var panel25     = $(".mid-ads5 .panel2");
        var panel2List5 = $(".mid-ads5 .panel2 li");
        panel2List5.mouseenter(function(){
            var iIndex = $(this).index();
            panel2List5.stop(true).animate({
                opacity:0.25
            }).eq(iIndex).stop(true).animate({
                opacity:1
            })
        });
        panel25.mouseleave(function(){
            panel2List5.stop(true).animate({
                opacity:0.9
            })
        });

        var brandAll5  = $(".brandlist5");
        var brandList5 = $(".brandlist5 li");
        brandList5.mouseenter(function(){
            var iIndex=$(this).index();
            brandList5.stop(true).animate({
                opacity:0.5
            },300).eq(iIndex).stop(true).animate({
                opacity:1
            },300)
        });
        brandAll5.mouseleave(function(){
            brandList5.stop(true).animate({
                opacity:1
            },300)
        })

        var sideBtn5      = $(".sidefocus5 .btn a");
        var sideFocus5    = $(".sidefocus5 ul");
        var sideFocusli5  = $(".sidefocus5 ul li");
        var sideImgwidth5 = 212;
        var iTimer5       = null;
        var iIndex5       = 0;
        sideBtn5.mouseenter(function(){
            var iIndex5 = $(this).index();
            sideBtn5.removeClass("active").eq(iIndex5).addClass("active");
            sideFocus5.stop(true).animate({
                left:-iIndex5*sideImgwidth5
            })
        });
        function autoPlay5(){
            iTimer5=setInterval(function(){
                iIndex5++;
                if(iIndex5==2){
                    iIndex5=0
                }
                sideBtn5.removeClass("active").eq(iIndex5).addClass("active");
                sideFocus5.stop(true).animate({
                    left:-iIndex5*sideImgwidth5
                })
            },4000);
        }autoPlay5();

        $(".sidefocus5").mouseenter(function(){
            clearInterval(iTimer5)
        });
        $(".sidefocus5").mouseleave(function(){
            autoPlay5();
        });

        //--------------------6F 母婴玩具------------------------
        var midList6   = $(".mid-ads6 .tab-nav li");
        var midArrow6  = $(".mid-ads6 .tab-nav .arrow");
        var tabPanels6 = $(".mid-ads6 .tab-panel");
        midList6.mouseenter(function(){
            var iIndex = $(this).index();
            midList6.removeClass("select").eq(iIndex).addClass("select")
            midArrow6.hide().eq(iIndex).show();
            tabPanels6.hide().eq(iIndex).show();
        });

        var panel26     = $(".mid-ads6 .panel2");
        var panel2List6 = $(".mid-ads6 .panel2 li");
        panel2List6.mouseenter(function(){
            var iIndex = $(this).index();
            panel2List6.stop(true).animate({
                opacity:0.25
            }).eq(iIndex).stop(true).animate({
                opacity:1
            })
        });
        panel26.mouseleave(function(){
            panel2List6.stop(true).animate({
                opacity:0.9
            })
        });

        var brandAll6  = $(".brandlist6");
        var brandList6 = $(".brandlist6 li");
        brandList6.mouseenter(function(){
            var iIndex=$(this).index();
            brandList6.stop(true).animate({
                opacity:0.5
            },300).eq(iIndex).stop(true).animate({
                opacity:1
            },300)
        });
        brandAll6.mouseleave(function(){
            brandList6.stop(true).animate({
                opacity:1
            },300)
        })

        var sideBtn6      = $(".sidefocus6 .btn a");
        var sideFocus6    = $(".sidefocus6 ul");
        var sideFocusli6  = $(".sidefocus6 ul li");
        var sideImgwidth6 = 212;
        var iTimer6       = null;
        var iIndex6       = 0;
        sideBtn6.mouseenter(function(){
            var iIndex6 = $(this).index();
            sideBtn6.removeClass("active").eq(iIndex6).addClass("active");
            sideFocus6.stop(true).animate({
                left:-iIndex6*sideImgwidth6
            })
        });
        function autoPlay6(){
            iTimer6=setInterval(function(){
                iIndex6++;
                if(iIndex6==2){
                    iIndex6=0
                }
                sideBtn6.removeClass("active").eq(iIndex6).addClass("active");
                sideFocus6.stop(true).animate({
                    left:-iIndex6*sideImgwidth6
                })
            },4000);
        }autoPlay6();

        $(".sidefocus6").mouseenter(function(){
            clearInterval(iTimer6)
        });
        $(".sidefocus6").mouseleave(function(){
            autoPlay6();
        });

        //------------------7F 食品保健-------------------
        var midList7   = $(".mid-ads7 .tab-nav li");
        var midArrow7  = $(".mid-ads7 .tab-nav .arrow");
        var tabPanels7 = $(".mid-ads7 .tab-panel");
        midList7.mouseenter(function(){
            var iIndex = $(this).index();
            midList7.removeClass("select").eq(iIndex).addClass("select")
            midArrow7.hide().eq(iIndex).show();
            tabPanels7.hide().eq(iIndex).show();
        });

        var panel27     = $(".mid-ads7 .panel2");
        var panel2List7 = $(".mid-ads7 .panel2 li");
        panel2List7.mouseenter(function(){
            var iIndex = $(this).index();
            panel2List7.stop(true).animate({
                opacity:0.25
            }).eq(iIndex).stop(true).animate({
                opacity:1
            })
        });
        panel27.mouseleave(function(){
            panel2List7.stop(true).animate({
                opacity:0.9
            })
        });

        var brandAll7  = $(".brandlist7");
        var brandList7 = $(".brandlist7 li");
        brandList7.mouseenter(function(){
            var iIndex=$(this).index();
            brandList7.stop(true).animate({
                opacity:0.5
            },300).eq(iIndex).stop(true).animate({
                opacity:1
            },300)
        });
        brandAll7.mouseleave(function(){
            brandList7.stop(true).animate({
                opacity:1
            },300)
        })

        var sideBtn7      = $(".sidefocus7 .btn a");
        var sideFocus7    = $(".sidefocus7 ul");
        var sideFocusli7  = $(".sidefocus7 ul li");
        var sideImgwidth7 = 212;
        var iTimer7       = null;
        var iIndex7       = 0;
        sideBtn7.mouseenter(function(){
            var iIndex7 = $(this).index();
            sideBtn7.removeClass("active").eq(iIndex7).addClass("active");
            sideFocus7.stop(true).animate({
                left:-iIndex7*sideImgwidth7
            })
        });
        function autoPlay7(){
            iTimer7=setInterval(function(){
                iIndex7++;
                if(iIndex7==2){
                    iIndex7=0
                }
                sideBtn7.removeClass("active").eq(iIndex7).addClass("active");
                sideFocus7.stop(true).animate({
                    left:-iIndex7*sideImgwidth7
                })
            },4000);
        }autoPlay7();

        $(".sidefocus7").mouseenter(function(){
            clearInterval(iTimer7)
        });
        $(".sidefocus7").mouseleave(function(){
            autoPlay7();
        });

        //----------------------8F 图书音像-----------------
        var midList8   = $(".mid-ads8 .tab-nav li");
        var midArrow8  = $(".mid-ads8 .tab-nav .arrow");
        var tabPanels8 = $(".mid-ads8 .tab-panel");
        midList8.mouseenter(function(){
            var iIndex = $(this).index();
            midList8.removeClass("select").eq(iIndex).addClass("select")
            midArrow8.hide().eq(iIndex).show();
            tabPanels8.hide().eq(iIndex).show();
        });

        var panel28     = $(".mid-ads8 .panel2");
        var panel2List8 = $(".mid-ads8 .panel2 li");
        panel2List8.mouseenter(function(){
            var iIndex = $(this).index();
            panel2List8.stop(true).animate({
                opacity:0.25
            }).eq(iIndex).stop(true).animate({
                opacity:1
            })
        });
        panel28.mouseleave(function(){
            panel2List8.stop(true).animate({
                opacity:0.9
            })
        });

        var brandAll8  = $(".brandlist8");
        var brandList8 = $(".brandlist8 li");
        brandList8.mouseenter(function(){
            var iIndex=$(this).index();
            brandList8.stop(true).animate({
                opacity:0.5
            },300).eq(iIndex).stop(true).animate({
                opacity:1
            },300)
        });
        brandAll8.mouseleave(function(){
            brandList8.stop(true).animate({
                opacity:1
            },300)
        })

        var sideBtn8      = $(".sidefocus8 .btn a");
        var sideFocus8    = $(".sidefocus8 ul");
        var sideFocusli8  = $(".sidefocus8 ul li");
        var sideImgwidth8 = 212;
        var iTimer8       = null;
        var iIndex8       = 0;
        sideBtn8.mouseenter(function(){
            var iIndex8 = $(this).index();
            sideBtn8.removeClass("active").eq(iIndex8).addClass("active");
            sideFocus8.stop(true).animate({
                left:-iIndex8*sideImgwidth8
            })
        });
        function autoPlay8(){
            iTimer8=setInterval(function(){
                iIndex8++;
                if(iIndex8==2){
                    iIndex8=0
                }
                sideBtn8.removeClass("active").eq(iIndex8).addClass("active");
                sideFocus8.stop(true).animate({
                    left:-iIndex8*sideImgwidth8
                })
            },4000);
        }autoPlay8();

        $(".sidefocus8").mouseenter(function(){
            clearInterval(iTimer8)
        });
        $(".sidefocus8").mouseleave(function(){
            autoPlay8();
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
        })
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

        //----------------左侧导航栏------------------
        var slideNav   = $("#slidenav");
        var slideNavli = $("#slidenav li");
        var floorList  = $(".floor");
        var floor1     = $(".tcyl");
        $(window).scroll(function(){
            var iSrolltop = $("body").scrollTop();
            var floo1Top  = floor1.offset().top-250;
            if(iSrolltop>floo1Top){
                slideNav.show();
            }else{
                slideNav.hide();
            }
            for(var i=0;i<floorList.length;i++){
                if(iSrolltop>floorList.eq(i).offset().top-250){
                    slideNavli.removeClass("current").eq(i).addClass("current");
                }
            }
        });
        slideNavli.click(function(){
            var iIndex = $(this).index();
            //slideNavli.removeClass("current").eq(iIndex).addClass("current"); 在滚动过程中已经添加了类名，所以这里不需要再次添加
            var el= $(this).attr('id');
            $("html,body").stop(true).animate({
                scrollTop:$("." + el).offset().top
            })
        })

    })
})(jQuery)