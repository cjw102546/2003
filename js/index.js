$('.header a').hover(
  function () {
    $(this).css({
      color: '#ed145b',
    });
  },
  function () {
    $(this).css({
      color: '#6c6c6c',
    });
  }
);
$('.hot_word li').hover(
  function () {
    $(this).css({
      color: '#ed145b',
    });
  },
  function () {
    $(this).css({
      color: '#6c6c6c',
    });
  }
);
//header的二级菜单效果
$('.myJum').hover(

  function () {
    $('.header_top_right_two').css({

      height: '270px',
      display: 'block',
      transition: "2s"
    })
  },
  function () {
    $('.header_top_right_two').css({

        height: '270px',
        display: 'none',

      }

    )
  }



)

//轮播
var timer = null;
var index = 0;
autoPlay();
$(".wrapBox").hover(function () {
  clearInterval(timer);
}, function () {
  autoPlay();
})

$(".dotBox li").click(function () {
  index = $(this).index();
  swiper();
})

$(".right").click(function () {
  index++;
  swiper();
})
$(".left").click(function () {
  index--;
  swiper();
})


function autoPlay() {
  clearInterval(timer);
  timer = setInterval(function () {
    index++;
    swiper();

  }, 2000)
}


function swiper() {

  var width = $(".swiperBox li").width();
  console.log(width);
  if (index < 0) {
    $(".swiperBox").finish().css({
      left: -width * ($(".swiperBox li").length - 1)
    });
    index = $(".swiperBox li").length - 2;
  }

  $(".swiperBox").finish().animate({
    left: -width * index
  }, 500, function () {
    console.log()
    if (index >= $(".swiperBox li").length - 1) {
      index = 0;
      $(".swiperBox").css({
        left: 0
      });
    }
  });


  if (index >= $(".swiperBox li").length - 1) {
    $(".dotBox li").eq(0).addClass("active").siblings().removeClass("active");
  } else {
    $(".dotBox li").eq(index).addClass("active").siblings().removeClass("active");
  }
}