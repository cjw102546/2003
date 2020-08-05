var user = getCookie("logUser");

if (!user) {
  var url = location.href; // 获取当前地址
  location.href = "./login.html?ReturnUrl=" + encodeURIComponent(url);
}

getShopGoodsByUser(user).then(data => {
  console.log(data);
  var html = "";
  data.forEach(function ({
    id,
    goodsName,
    goodsImg,
    goodsPrice,
    buyNum
  }) {

    html += `<tr>
                    <td class="checkbox"><input goodsId="${id}" class="check-one check" type="checkbox" /></td>
                    <td class="goods"><img src="${goodsImg.replace("n5", "n1")}" alt="" /><span>${goodsName}</span></td>
                    <td class="price">${goodsPrice}</td>
                    <td class="count"><span class="reduce">${buyNum == 1 ? "" : "-"}</span>
                        <input class="count-input" type="text" value="${buyNum}" />
                        <span class="add">+</span></td>
                    <td class="subtotal">${(buyNum * goodsPrice).toFixed(2)}</td>
                    <td class="operation"><span class="delete"  goodsId="${id}">删除</span></td>
                </tr>`;
  })
  // 动态生成 (保证元素显示到页面之后  才能获取元素绑定事件) 
  $("table tbody").html(html);
}).catch(function (error) {
  console.log(error);
})

// 
// $(".check-one:checked").map(function(){return ($(this).attr("goodsId"))}).get()

function getShopGoodsByUser(user) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: "http://www.2003.com/project/php/searchShopCarByUser.php",
      data: {
        user
      },
      dataType: "json",
      success(data) {
        resolve(data);
      },
      error(err) {
        console.log(err);
        reject(err);
      }
    })


  })
}


function prev(ele) {
  return ele.previousElementSibling || ele.previousSibling;
}

function next(ele) {
  return ele.nextElementSibling || ele.nextSibling;
}
//购物车的动态生成


//全选


$(document).on('click', '#cartTable .check-all', function () {
  var flag = $('.check-all').prop('checked');
  $('.check-one').prop('checked', flag);


  cook()
});



$(document).on('click', '.check-one', function () {
  console.log(777)
  if ($('.check-one').is(':not(:checked)')) {
    $('.check-all').prop('checked', false);
  } else {
    $('.check-all').prop('checked', true);
  }

  cook()


})

//加

$(document).on('click', '.add', function () {

  var num = $(this).prev().val()
  num++
  $(this).prev().val(num)

  var oneNum = $(this).parent().prev().html()
  var allNum = $(this).parent().next().html()


  allNum = oneNum * num
  // console.log(allNum)
  $(this).parent().next().html(allNum)


  if (num > 1) {

    $('.reduce').html("-")
  }
  cook()
});

//减

$(document).on('click', '.reduce', function () {

  var num = $(this).next().val()

  if (num == 1) {
    return false
  }
  num--

  $(this).next().val(num)
  console.log(num)
  if (num == 1) {

    $('.reduce').html(" ")

  }
  var oneNum = $(this).parent().prev().html()
  var allNum = $(this).parent().next().html()


  allNum = oneNum * num
  // console.log(allNum)
  $(this).parent().next().html(allNum)

  cook()

});

//购物车总加减
// 结算功能




function cook() {
  var ni = 0;
  var su = 0;
  var sum = 0
  $(".check-one:checked").each(function () {
    ni += Number(($(this).parents("tr").children(".subtotal").text()))
    su += Number(($(this).parents("tr").children(".count").children(".count-input").val()))
  })
  $("#selectedTotal").text(su)
  $("#priceTotal").text(ni)
}
//全删


$("#deleteAll").on("click", function () {
  var checkOneList = $(".check-one")
  for (var i = 0; i < checkOneList.length; i++) {
    var checkOne = checkOneList[i];
    if (checkOne.checked) {
      var tr = checkOne.parentElement.parentElement;
      tr.remove();
    }
  }
})

//删除
$(document).on("click", ".delete", function () {
  $(this).parent().parent().remove()
})



$('.closing').on("click", function () {


  location.href = "../html/cash.html"




})