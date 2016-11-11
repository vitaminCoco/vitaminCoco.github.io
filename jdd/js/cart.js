/**
 * Created by Administrator on 2016/10/8.
 */
(function($){
    $(function(){
        //--------------五角星旋转-------------------------
       /*  $('.fav a').hover(
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


        //------------------购物车--------------------
        var sGoods = getCookie("goods");
        var aGoods = JSON.parse(sGoods);
        var SULhtml = "";
        var allPrice =0;
        for(var i=0;i<aGoods.length;i++){
            allPrice+=(aGoods[i].goodPrice)*(aGoods[i].goodNum);
            SULhtml+='<tbody><tr class="store"> <th colspan="20"><strong>店铺：<a href="javascript:;" style="color:#333">'+aGoods[i].goodStore+'</a></strong></th> </tr> <tr class="info"> <td class="chosebtn"><input type="checkbox" name="checkbox" value="" class="checkgoods" checked="checked"></td> <td class="goodimg"><a href="product.html"><img src="'+aGoods[i].goodSrc+'"></a></td> <td class="goodname"><a href="product.html">'+aGoods[i].goodName+'</a></td> <td class="goodprice"><em class="gprice">'+aGoods[i].goodPrice+'</em></td><td class="goodnum"> <a href="javascript:;" class="decrease arithbtn">-</a> <input type="text" name="tx" value="'+aGoods[i].goodNum+'" class="tx"> <a href="javascript:;" class="increase arithbtn">+</a> </td> <td class="add-price"><em class="subtotal">'+(aGoods[i].goodPrice)*(aGoods[i].goodNum)+'</em></td> <td class="status"><a href="javascript:;" class="collect">收藏</a><br/><a href="javascript:;" class="delate">删除</a></td> </tr> <tr class="storeprice"><td colspan="20"><p class="dphj"><span>店铺合计：</span><em class="shoptotal">'+(aGoods[i].goodPrice)*(aGoods[i].goodNum)+'</em>元</p></td></tr> </tbody>'

        }
        SULhtml+='<thead> <tr> <th class="th1"><input type="checkbox" id="selectAll" name="checkbox" value="" checked="checked"><label for="selectAll">全选</label></th> <th style="width:60px;"></th> <th class="th2" style="width:448px;">商品</th> <th class="th3" style="width:120px;">单价(元)</th> <th class="th4" style="width:120px;">数量</th> <th class="th5" style="width:120px;">小计(元)</th> <th class="th6" style="width:80px;">操作</th> </tr></thead><tfoot> <tr class="foot"><td colspan="20"><p>商品总价 ( 不含运费 )<strong class="totalprice">'+allPrice.toFixed(2)+'</strong>元</p></td></tr></tfoot>';
        $("#box").html(SULhtml);


        //收藏
        var collectB    = $(".collect");
        var diaLog      = $("#dialog");
        var dialogHide  = $("#dialog .close");
        var ensureB     = $(".ensurebtn");
        collectB.click(function(){
            diaLog.show();
        });
        dialogHide.click(function(){
            diaLog.hide();
        });
        ensureB.click(function(){
            diaLog.hide();
        });

        var delateBtn   = $(".delate");
        var goodLists   = $("tbody");
        var goodimg     = $(".goodimg a img");
        var totalPrice  = $(".totalprice");
        var subTotal    = $(".subtotal");
        var shopTotal   = $(".shoptotal");
        var goodPrice   = $(".gprice");
        //--------------删除-------------------
        delateBtn.click(function(){
            var iIndex = delateBtn.index($(this));
            for(var j = 0;j<aGoods.length;j++){
                if(aGoods[j].goodSrc == goodimg.eq(iIndex).attr("src")){
                    aGoods.splice(j,1)//从原有cookie转换的数组中找到对应项删除，然后将新的数组转换为字符串存入cookie
                }
            }
            setCookie("goods",JSON.stringify(aGoods),7,"/");
            allPrice = (allPrice-subTotal.eq(iIndex).text()).toFixed(2);//浮电脑的二进制 在做小数 表达 0.1 的时候实际上是一个近似数,所以用js计算浮点数时会出现很多位小数，可以用toFix（N）取N位小数
            totalPrice.text(allPrice);
            goodLists.eq(iIndex).remove();
        });

        var decreaseB = $(".decrease");
        var increaseB = $(".increase");
        var goodNum   = $(".tx");
        var bBtn      = true;
        //-----------------数量减----------------
        decreaseB.click(function(){
            var iIndex = decreaseB.index($(this));
            if(goodNum.eq(iIndex).val()-1==0) {
                goodNum.eq(iIndex).val(1);
                return;
            }
            goodNum.eq(iIndex).val(goodNum.eq(iIndex).val()-1);
            subTotal.eq(iIndex).text((goodNum.eq(iIndex).val()*goodPrice.eq(iIndex).text()).toFixed(2));
            shopTotal.eq(iIndex).text(subTotal.eq(iIndex).text());

            var allPrice = 0;
            for(var i=0;i<aGoods.length;i++){
                allPrice+=parseFloat(shopTotal.eq(i).text());
            }
            totalPrice.text(allPrice.toFixed(2));

            aGoods[iIndex].goodNum = goodNum.eq(iIndex).val();
            setCookie("goods",JSON.stringify(aGoods),7,"/")
        });

        //------------------数量加------------------
        increaseB.click(function(){
            var iIndex = increaseB.index($(this));
            goodNum.eq(iIndex).val(parseInt(goodNum.eq(iIndex).val())+1);
            subTotal.eq(iIndex).text((goodNum.eq(iIndex).val()*goodPrice.eq(iIndex).text()).toFixed(2));
            shopTotal.eq(iIndex).text(subTotal.eq(iIndex).text());

            var allPrice = 0;
            for(var i=0;i<aGoods.length;i++){
                allPrice+=parseFloat(shopTotal.eq(i).text());
            }
            totalPrice.text(allPrice.toFixed(2));

            aGoods[iIndex].goodNum = goodNum.eq(iIndex).val();
            setCookie("goods",JSON.stringify(aGoods),7,"/")
        });

        //-------------------全选 单选------------------------
        var checkGoods = $(".checkgoods");
        var selectAll  = $("#selectAll");
        checkGoods.click(function(){
            var iIndex = checkGoods.index($(this));

        });
        selectAll.click(function(){
            if(selectAll.attr("checked")=="checked"){
                selectAll.removeAttr("checked");
                checkGoods.removeAttr("checked");
            }

        })
        selectAll.change(function(){
            if(selectAll.attr("checked")=="checked"){
                selectAll.removeAttr("checked");
                checkGoods.removeAttr("checked");
            }
            checkGoods.attr("checked",this.checked)
        })


    })
})(jQuery)