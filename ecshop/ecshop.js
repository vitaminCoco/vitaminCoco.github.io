
(function ($){
	$(function (){

		// ***************nav部分js**************

		var navHide1=$(".nav-li3-hide");
		var navLi3=$(".nav-li3");
		navLi3.hover(function(){
			navHide1.css({display:"block"}).stop(true).animate({height:"229px",opacity:1},500);
		},function (){
		   navHide1.animate({height:"0",opacity:0},function (){navHide1.css({display:"none"})});
		});

		var navHide2=$(".nav-li4-hide");
		var navLi4=$(".nav-li4");
		navLi4.hover(function(){
			navHide2.css({display:"block"}).stop(true).animate({height:"155px",opacity:1});
		},function (){
		   navHide2.animate({height:"0",opacity:0},function (){navHide2.css({display:"none"})});
		});

		// *********header部分js**************

		var midLi1=$(".mid-li1");
		var midHide1=$(".mid-hide1");
		midLi1.hover(function(){
			midHide1.css({display:"block"}).stop(true).animate({height:"230px",opacity:1});
		},function (){
		   midHide1.animate({height:"0",opacity:0},function (){midHide1.css({display:"none"})});
		});

		var midLi3=$(".mid-li3");
		var midHide3=$(".mid-hide3");
		midLi3.hover(function(){
			midHide3.css({display:"block"}).stop(true).animate({height:"230px",opacity:1});
		},function (){
		   midHide3.animate({height:"0",opacity:0},function (){midHide3.css({display:"none"})});
		});

		var midLi2=$(".mid-li2");
		var midHide2=$(".mid-hide2");
		midLi2.hover(function(){
			midHide2.css({display:"block"}).stop(true).animate({height:"230px",opacity:1});
		},function (){
		   midHide2.animate({height:"0",opacity:0},function (){midHide2.css({display:"none"})});
		});

		
		var header=$("#header");
		$(window).scroll(function (){
			var oscrollTop=document.documentElement.scrollTop || document.body.scrollTop;
			if(oscrollTop>40){
				header.css({
					position:"fixed",
					background: "rgba(255, 255, 255, 0.95) none repeat scroll 0% 0%",
                    zIndex: "3",
                    top: "0"
				});
			}else{
				header.css({
				    position:"relative",
					background: "#fff",
				});
			}
            
           // ***********右侧固定菜单栏********
           
            var backTop=$("#backtop");
			if(oscrollTop>30){
				backTop.css({display:"block"}).stop(true).animate({opacity:1},800,"linear");
			}else{
				backTop.stop(true).animate({opacity:0},800,"linear",function (){backTop.css({display:"none"})})
			}
		});

		// **************搜索框跨域*************
		/*var searchText=$("#search-text");
     	var iIndex=-1;
     	searchText.bind("input propertychange",function(){
     		$.getJSON("https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?&json=1&p=3&sid=1457_19033_18240_17943_21113&req=2&csor=1&cb=?",{wd:$(this).val()},function (data){
                     var str="";
                   data.s.forEach(function (v,k){
                     str+="<li><a href='javascript:;'>"+v+"</a></li>";
                   })
                     searchContent.html(str);
            });
            iIndex=-1;
     	}*/
     	var searchText=$("#search-text");
     	searchText.focus(function (){
     		searchText.val("");
     	});
     	searchText.blur(function (){
     		searchText.val("输入关键字搜索");
     	});

      // *************banner图部分********
      var btnList=$("#btn-list a");
      var imgList=$("#img-list");
      var imgs=$("#img-list li")
      var dirLeft=$(".dir-left");
      var dirRight=$(".dir-right");
      var oBanner=$("#banner");
      var iLiWidth=1920;
      var iIndex=1;
      var flag=true;
      var iTimer=null;
      btnList.mouseenter(function (){
      	iIndex=$(this).index()+1;
      	imgList.animate({left:-iIndex*iLiWidth});
      	btnList.removeClass("active").eq(iIndex-1).addClass("active");
      });
      dirLeft.click(function (){
      	if(flag){
      		flag=false;
      		iIndex--;
      	    imgList.animate({left:-iIndex*iLiWidth},function (){
      	    	flag=true;
      		    if(iIndex==imgs.length-2){
      			   imgList.css({left:-(imgs.length-2)*iLiWidth});
      		    }
          	});
      	    if(iIndex==0){
      		    iIndex=imgs.length-2;
      	    }
      	    btnList.removeClass("active").eq(iIndex-1).addClass("active");
      	}
      	
      });
      dirRight.click(function (){
      	if(flag){
      		flag=false;
      		iIndex++;
      	    imgList.animate({left:-iIndex*iLiWidth},function (){
      	       flag=true;
      		   if(iIndex==1){
      			  imgList.css({left:-iLiWidth});
      		   }
      	    });
      	    if(iIndex==imgs.length-1){
      		   iIndex=1;
      	    }
      	    btnList.removeClass("active").eq(iIndex-1).addClass("active");
      	}
      	
      });

      function setRun(){
      	iTimer=setInterval(function (){
      		flag=false;
      		iIndex++;
      	    imgList.animate({left:-iIndex*iLiWidth},function (){
      	       flag=true;
      		   if(iIndex==1){
      			  imgList.css({left:-iLiWidth});
      		   }
      	    });
      	    if(iIndex==imgs.length-1){
      		   iIndex=1;
      	    }
      	    btnList.removeClass("active").eq(iIndex-1).addClass("active");
      	},3000);
      }
      setRun();

      oBanner.hover(function (){
      	clearInterval(iTimer);
      },function (){
      	setRun();
      });
	  
	 // ************左侧菜单栏部分***********
	 
	 var aconLi=$("#con-li li");
	 var aconLiA=$("#con-li li a");
	 var conRight=$("#con-right");
	 var aconRight=$("#con-right>div");
	 var conTotal=$("#con-total");
	 var menuIndex=0;
	 aconLi.mouseenter(function (){
		 menuIndex=$(this).index();
		 conRight.css({display:"block"});
		 aconRight.css({display:"none"}).eq(menuIndex).css({display:"block"});
	 });
	 conRight.mouseenter(function (){
		 aconLiA.removeClass("hua").eq(menuIndex).addClass("hua");
	 });
	 conRight.mouseleave(function (){
		 aconLiA.removeClass("hua");
	 });
	 conTotal.mouseleave(function (){
		 conRight.css({display:"none"});
     });

//================main1部分==========
    var main1Li=$("#main1 li");
	var main1LiImg=$("#main1 li img");
	main1Li.hover(function (){
		var iIndex=$(this).index();
		main1LiImg.eq(iIndex).stop(true).animate({left:"-10px"},100,"linear");
    },function (){
		main1LiImg.animate({left:"0"},100,"linear");
	});
	
//================main2部分==========
    var main2Li=$("#main2 li");
	var liMid=$("#main2 .li-mid");
	main2Li.hover(function (){
		var iIndex=$(this).index();
		liMid.eq(iIndex).stop(true).animate({top:"269px"},200,"linear");
    },function (){
		liMid.animate({top:"290px"},200,"linear");
	});
	
	var main3Li1=$(".main3 .more li");
	var liMidMore1=$(".main3 .more .li-mid");
	main3Li1.hover(function (){
		var iIndex=$(this).index();
		liMidMore1.eq(iIndex).stop(true).animate({top:"269px"},200,"linear");
    },function (){
		liMidMore1.animate({top:"290px"},200,"linear");
	});
	
	var main3Li2=$(".main3 .more1 li");
	var liMidMore2=$(".main3 .more1 .li-mid");
	main3Li2.hover(function (){
		var iIndex=$(this).index();
		liMidMore2.eq(iIndex).stop(true).animate({top:"269px"},100,"linear");
    },function (){
		liMidMore2.animate({top:"290px"},100,"linear");
	});
	
	var main3Li3=$(".main3 .more2 li");
	var liMidMore3=$(".main3 .more2 .li-mid");
	main3Li3.hover(function (){
		var iIndex=$(this).index();
		liMidMore3.eq(iIndex).stop(true).animate({top:"269px"},100,"linear");
    },function (){
		liMidMore3.animate({top:"290px"},100,"linear");
	});

	// *************main4****************
	var main4Li=$("#main4 li");
	var main4Img=$("#main4 li img");
	main4Li.hover(function (){
		var iIndex=$(this).index();
		main4Img.eq(iIndex).stop(true).animate({top:"-20px",left:"-20px",width:"280px"},100,"linear");
    },function (){
		main4Img.animate({top:"0",left:"0",width:"240px"},100,"linear");
	});

	
	main4Li.bind("mouseenter mouseleave",function(e) {
	   var iIndex=$(this).index();
       var w = $(this).width(); 
       var h = $(this).height();
       var main4A=$("#main4 li a");

       var x = (e.pageX - this.offsetLeft - (w / 2)) * (w > h ? (h / w) : 1);
       var y = (e.pageY - this.offsetTop - (h / 2)) * (h > w ? (w / h) : 1);
       var direction = Math.round((((Math.atan2(y, x) * (180 / Math.PI)) + 180) / 90) + 3) % 4; 
       if(e.type=="mouseenter"){
           	switch(direction){
           	 case 0:main4A.eq(iIndex).stop(true).css({top:"-242px",left:"0"}).animate({top:"0"});return false;
           	 case 1:main4A.eq(iIndex).stop(true).css({left:"241px",top:"0"}).animate({left:"0"});return false;
           	 case 2:main4A.eq(iIndex).stop(true).css({top:"242px",left:"0"}).animate({top:"0"});return false;
           	 case 3:main4A.eq(iIndex).stop(true).css({left:"-241px",top:"0"}).animate({left:"0"});return false;
           	 default:return false;
           }
       }else{
       	switch(direction){
           	 case 0:main4A.eq(iIndex).stop(true).animate({top:"-242px"});return false;
           	 case 1:main4A.eq(iIndex).stop(true).animate({left:"241px"});return false;
           	 case 2:main4A.eq(iIndex).stop(true).animate({top:"242px"});return false;
           	 case 3:main4A.eq(iIndex).stop(true).animate({left:"-241px"});return false;
           	 default:return false;
           }
       }
		           
		           
    });
 
    var backTop=$("#backtop");
    var time=0;
    backTop.click(function (){
    	var iscrollTop=document.body.scrollTop || document.documentElement.scrollTop;
		time =setInterval(function (){
			document.body.scrollTop -=20;
			if(document.body.scrollTop==0){
				clearInterval(time);
			}
        },1)
	});
    



	});
})(jQuery);