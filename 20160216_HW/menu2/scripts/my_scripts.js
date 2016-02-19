$(document).ready(function() {

    var v = false;
    var $f, $m;
    //按下按鈕切換成素食
    $("button#vegOn").click(function() {
        //若素食flag為false
        if (v == false) {
            //fish類別往上爬兩層,會是li將其解除,並存放於$f這個陣列中
            $f = $(".fish").parent().parent().detach();

            //用"<li class='portobello'><em>Portobello Mushroom</em></li>"去取代漢堡類別
            //會用replaceWith是因為漢堡和Portobello都是單一元素所以可以一對一換
            $(".hamburger").replaceWith("<li class='portobello'><em>Portobello Mushroom</em></li>");
            //portobello類別往上爬兩層,再利用.addClass加上名為veg_leaf之CSS樣式(葉子圖片)
            $(".portobello").parent().parent().addClass("veg_leaf");
            //以下三行目的為將豆腐類別取代肉類別
            //先再肉類別後面插入豆腐類別,下一行保肉類別解除後,豆腐類別自然會取而代之顯示
            $(".meat").after("<li class='tofu'><em>Tofu</em></li>");
            //將肉類別給解除,並且放入$m陣列中保存
            $m = $(".meat").detach();
            //豆腐類別往上爬兩層,再利用.addClass加上名為veg_leaf之CSS樣式(葉子圖片)
            $(".tofu").parent().parent().addClass("veg_leaf");
            //將素食flag改true
            v = true;
        } // end if
    }); //end veg button

    //按下按鈕切換回肉類
    $("button#restoreMe").click(function() {
        //如果判斷目前為素食菜單
        if (v == true) {
            //portobello類別往上爬兩層,並且移除葉子圖片
            $(".portobello").parent().parent().removeClass("veg_leaf");
            //用漢堡類別取代portobello
            $(".portobello").replaceWith("<li class='hamburger'>Hamburger</li>");
            //到menu_entrees 下一層的li,再移到第一個元素的後面插入上面$f(fish)陣列內容
            $(".menu_entrees li").first().before($f);
            //移除葉子
            $(".tofu").parent().parent().removeClass("veg_leaf");
            //用each方法繞行豆腐類別,$(this)代表目前執行到豆腐哪一個元素,在其後方插入肉類類別
            $(".tofu").each(function(i) {
                $(this).after($m[i]);
            }); //end each
            //將豆腐類別給移除
            $(".tofu").remove();
            //將素食給tag給改掉
            v = false;
        } //end if
    }); //end restoreMe button
}); //end doc ready
