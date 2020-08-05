$(".btn").on("click", function () {
  location.href = 'login.html';
})
if (getCookie("logUser")) {
  console.log(getCookie("logUser"))

  console.log($('.heads'))
  $('.heads').text(`欢迎您,${getCookie("logUser")}`);
}! function () {
  const $wrap = $('.wrap');
  const $spic = $('#spic');
  const $sf = $('#sf');
  const $bf = $('#bf');
  const $bpic = $('#bpic');
  const $moveul = $('#list ul'); //1
  const $listpic = $('#list li'); //10
  const $left = $('#left');
  const $right = $('#right');
  //1.鼠标经过小图显示小放和大放。鼠标移出隐藏小放和大放。
  // 小图 / 大图 = 小放 / 大放
  // 小图 / 小放 = 大图 / 大放
  $('#spic').hover(function () {
    $('#sf,#bf').css('visibility', 'visible');
    //2.求小放的尺寸和比例。
    $('#sf').css({
      width: $spic.width() * $bf.width() / $bpic.width(),
      height: $spic.height() * $bf.height() / $bpic.height()
    });
    let bili = $bpic.width() / $spic.width();
    //3.鼠标小图移动，小放跟随。
    $spic.on('mousemove', function (ev) {
      let $left = ev.pageX - $wrap.offset().left - $sf.width() / 2;
      let $top = ev.pageY - $wrap.offset().top - $sf.height() / 2;
      if ($left < 0) {
        $left = 0;
      } else if ($left >= $spic.width() - $sf.width()) {
        $left = $spic.width() - $sf.width();
      }
      if ($top < 0) {
        $top = 0;
      } else if ($top >= $spic.height() - $sf.height()) {
        $top = $spic.height() - $sf.height();
      }
      $sf.css({
        left: $left,
        top: $top
      });
      //大图进行赋值
      $bpic.css({
        left: -$left * bili,
        top: -$top * bili
      });
    })

  }, function () {
    $('#sf,#bf').css('visibility', 'hidden');
  });
  //4.点击下面的对应li里面的小图，将li里面的小图图片路径给上面的小图和大图
  $listpic.on('click', function () {
    //当前点击的li里面的小图路径。
    let $imgurl = $(this).find('img').attr('src');
    $spic.find('img').attr('src', $imgurl);
    $bpic.attr('src', $imgurl);
  });

  //5.点击左右箭头，进行图片运动。
  //控制ul位置。
  let $num = 6; //可视的li的个数
  let $liwidth = $listpic.eq(0).outerWidth(true); //一个li的宽度。

  if ($listpic.length <= $num) {
    $right.css('color', '#fff');
  }

  $right.on('click', function () {
    if ($listpic.length > $num) {
      $num++;
      $left.css('color', '#333');
      if ($num === $listpic.length) {
        $right.css('color', '#fff');
      }
      $moveul.animate({
        left: -$liwidth * ($num - 6)
      });
    }
  });

  $left.on('click', function () {
    if ($num > 6) {
      $num--;
      $right.css('color', '#333');
      if ($num === 6) {
        $left.css('color', '#fff');
      }
      $moveul.animate({
        left: -$liwidth * ($num - 6)
      });
    }

  });


}();
//放大镜


var search = location.search;
if (search) {
  var gid = search.split("=")[1];
} else {
  location.href = "./index.html";
}
console.log(gid)

searchGoods(gid).then(data => {
  console.log(data);
  var {
    goodsId,
    goodsName,
    goodsImg,
    goodsImgList,
    goodsPrice
  } = data;

  var detailHtml = `<p class="goodsName">
                 ${goodsName}
              </p>

              <div class="pop_change clearfix"><span class="pop_tit ">运费</span><span class="pop_black" id="freight">单商家订单满159元包邮</span></div>

              <div class="pop_change clearfix">
      <span class="pop_tit">服务</span>
      <ul class="commitment">
                                  <li><a href="http://pop.jumei.com/i/pop/rule" target="_blank">质量保险</a></li>
                                  <li><a href="http://pop.jumei.com/i/pop/rule" target="_blank">本商品支持7天无条件退货（拆封后不支持）</a></li>
                      <!--退货政策-->
                          <li><a href="http://pop.jumei.com/i/pop/rule" target="_blank">本商品不支持换货</a></li>
          <!--            <li><a href="http://pop.jumei.com/i/pop/rule" target="_blank">满159包邮</a></li>-->
                          <li><a href="http://pop.jumei.com/i/pop/rule" target="_blank">闪电发货</a></li>
                      <!-- 海淘判断 -->
                  </ul>
  </div>
              <div class="goodsPrice">
                  价格:￥ ${goodsPrice}
              </div>
              <div class="goodsNumBox">
                  <span class="left">-</span>
                  <input class="buyNum" value="1" type="number" min="1" max="100">
                  <span class="right">+</span>
              </div>
              <div class="addCarBox">
                  <button class="addToCar">加入购物车</button>
              </div>`;

  $(".detailBox .detail").html(detailHtml);
  $(".wrap img").attr("src", goodsImg.replace("n5", "n1"));
  $("#bf img").width(800).height(800)

}).catch(err => {
  console.log(err);
})

$(document).on("click", ".left", function () {
  var value = $(".buyNum").val()
  value--

  if (value == 0) {
    $(".buyNum").val(1)
  } else {
    $(".buyNum").val(value)
  }

})


$(document).on("click", ".right", function () {
  var value = $(".buyNum").val()
  value++
  $(".buyNum").val(value)

})

// 点击事件的相关处理
$(document).on("click", ".addToCar", {
  gid
}, function () {

  // 判断是否登录
  var user = getCookie("logUser"); // 获取当前登录的用户
  if (user) {
    var buyNum = $(".buyNum").val();
    addToCar(user, gid, buyNum).then(data => {
      if (confirm("加入成功,是否进入购物车?")) {
        location.href = "../html/shoppingCar.html";
      }

    }).catch(err => {
      alert(err.msg);
    })



  } else {

    if (confirm("您还没有登录,请登录")) {
      var url = location.href; // 获取当前地址
      location.href = "./login.html?ReturnUrl=" + encodeURIComponent(url);
    }
  }


})




function addToCar(user, goodsId, buyNum) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      type: "post",
      url: "http://www.2003.com/project/php/addToCar.php",
      data: {
        user,
        goodsId,
        buyNum,
      },
      dataType: "json",
      success(data) {
        if (data.status) {
          resolve(data);
        } else {
          reject(err);
        }
      }
    })
  })
}



function searchGoods(gid) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: "../php/searchGoodsById.php",
      data: {
        gid,
      },
      dataType: "json",
      success(data) {
        resolve(data);
      },
      error(err) {
        reject(err);
      }
    })
  })
}