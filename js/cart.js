var uname = getCookie('login_user');
if (!uname) {
  layer.confirm('您还未登录，是否去登录', {
    btn: ['是，现在就去'] //按钮
  }, function () {
    // layer.msg('的确很重要', { icon: 1 });
    sessionStorage.login_back = location.href;
    location.href = './login.html';
  }, function () {
    sessionStorage.login_back = location.href;
    location.href = './login.html';
  });
} else {
  APICartList({
    uname: uname
  }).then(({
    data
  }) => {
    console.log(data);
    var html = '';

    $.each(data, function (index, {
      id,
      gid,
      goodsId,
      goodsImg,
      goodsImgList,
      goodsName,
      goodsPrice
      img,
      count,
      name,
      price
    }) {
      html += `
            <tr class="g-item"  data-id="${id}">

            <td class="g-checkbox">
                <input type="checkbox" name="selectGoods" class="selectGoods" checked="checked">
            </td>
            <td>
                <div class="container">
                    <div class="row">
                        <div class="col-3">
                            <a href="./detail.html?gid=${gid}" target="_blank">
                                <img width="80" height="80" class="img-rounded g-img "src="${img}">
                            </a>
                        </div>
                        <div class="col-9">
                            <a href="./detail.html?gid=${gid}" target="_blank">${name}</a>
                        </div>
                    </div>
                </div>
            </td>
            <td class="g-price">
                <span>￥<i>${price}</i></span>
                <input type="hidden" id="goods_2030_18728_price" value="299">
            </td>
            <td class="g-edit">
                <div class="input-group">
                    <div class="input-group-prepend">
                        <button type="button" class="btn btn-outline-secondary ${count > 1 ? 'm-icons-reduce-active' : 'm-icons-reduce'}">-</button>
                    </div>
                        <span class="form-control buy-num" type="text">${count}</span>
                    <div class="input-group-append">
                        <button type="button" class="btn btn-outline-secondary">+</button>
                    </div>
                </div>
            </td>
            <td class="g-total total">￥<i>${price * count}</i></td>
            <td class="g-btn"><a class="btn btn-danger">删除</a></td>


        </tr>
`
    });
    $('#gouwuche').html(html);
    new Checks('#cart-index', '.selectAllGoods', '.selectGoods')
    getTotal()
  })

}

$(document).on('click', '.input-group-append', function () {
  //console.log(666)
  setCount(this, true);
});

$(document).on('click', '.input-group-prepend', function () {
  //console.log($(this).parents('.g-item').find('.buy-num').html() == 1)
  if ($(this).parents('.g-item').find('.buy-num').html() == 1) return false;
  setCount(this, false)
});

function setCount(ele, tag) { // tag为true表示+
  if ($(ele).attr('data-lock') == 0) return;
  $(ele).attr('data-lock', 0); // 加锁
  var parent = $(ele).parents('.g-item');
  //console.log(parent)
  var count = parent.find('.form-control').html() * 1;

  if (tag) { // 加
    count++;

    // 增加按钮的激活状态
    parent.find('.form-control').html(count) * 1;
    // console.log(count)
    var price = $(parent).find('.g-price i').html() * 1;
    // console.log(price);
    // console.log(count);
    $(parent).find('.g-total i').html(price * count);
    $(parent).find('.input-group-prepend').removeClass('m-icons-reduce').addClass('m-icons-reduce-active');
  } else {
    count--;

    parent.find('.form-control').html(count) * 1;
    var price = $(parent).find('.g-price i').html() * 1;
    $(parent).find('.g-total i').html(price * count);
  }

  APICartSetCount({
    id: parent.attr('data-id'),
    count
  }).then(({
    code,
    msg
  }) => {
    // console.log(data);
    if (code) {
      parent.find('.form-control').html(count);

      var price = parent.find('.g-price i').html().replace('￥', '');

      var subtotal = price * count

      parent.find('.g-total').html(`<i>￥${subtotal}</i>`);
    } else {
      alert(msg)
    }
    $(ele).attr('data-lock', 1);

    getTotal();

  })


}

$(document).on('click', '.settlement', function () {
  console.log($(this).parents('.g-item'));

  var total = $(this).parents('.dp_fl').find('.g-total i').html();
  // window.location.href = `./cash.html?total=${total}`;
  // console.log(total)
  var tot = 0
  var arr = []
  $('.g-item').each((i, item) => {
    if ($(item).find('.selectGoods').prop('checked')) {
      let names = $(item).find('.col-9 a').html()
      let sums = $(item).find('.g-total i').html()
      let counts = $(item).find('.buy-num').html()
      let imgs = $(item).find('.col-3 img').attr('src')
      let onePrice = $(item).find('.g-price i').html()
      let gid = $(item).find('.g-item').attr('data-id')

      var obj = {
        gid,
        names,
        sums,
        counts,
        imgs,
        onePrice
      }
      arr.push(obj)

      tot += parseInt($(item).find('.g-total i').html())
    }
    setCookie('datas', JSON.stringify(arr), 7)
  })
  location.href = `./cash.html?total=${tot}`
});





// 全选
$(document).on('click', '#gouwuche .selectAllGoods', function () {
  console.log(666)

  // active($(this).hasClass('m-icons-check-active'), [this, $('.selectAllGoods')]);
  getTotal();
});


// 单选
$(document).on('click', '#gouwuche .selectGoods', function () {
  console.log(777)

  // active($(this).hasClass('m-icons-check-active'), [this]);
  // checkAllS();
  getTotal();

})


// 控制全选按钮是否选中函数
function checkAllS() {

}


function getTotal() {
  // console.log(666);
  var sum = 0
  $('.selectGoods').each((i, item) => {
    // console.log(index);
    if ($(item).prop('checked')) {

      sum += (parseInt($(item).parents('.g-item').find('.g-total i').html()))
    }


  })
  var total = 0;

  $('.allPrice').html(`${sum}`);
}


//删除
$(document).on('click', '.btn-danger', function () {
  $(this).parents('.g-item').remove();
  checkAllS();
  new Checks('#cart-index', '.selectAllGoods', '.selectGoods').checksAll()
  getTotal()

  APICartDel({
    id: $(this).parents('.g-item').attr('data-id')
  }).then(({
    code,
    msg
  }) => {
    if (code) {
      alert('删除成功');
    } else {
      alert(msg);
    }
  })
});








class Checks {
  constructor(el, allBtn, checBtn) {
    // 拿到盒子
    this.ele = document.querySelector(el)
    // 全选按钮
    this.checAll = this.ele.querySelector(allBtn)
    // 单选
    this.checBtn = [...this.ele.querySelectorAll(checBtn)]
    this.checkAll()
    this.checkBtn()
  }
  // 全选事件
  checkAll() {
    this.checAll.addEventListener('change', () => {
      this.checBtn.forEach((items) => {
        items.checked = this.checAll.checked
      })
      getTotal()
    })
  }
  // 单选事件
  checkBtn() {
    this.checBtn.forEach((items) => {
      items.addEventListener('change', () => this.checAll.checked = this.checBtn.every((item) => item.checked == true))
    })
  }
  ifAll() {
    return this.checBtn.every((item) => {
      return item.checked == true
    })
  }
  checksAll() {
    if (this.ifAll()) {
      this.checAll.checked = true
    }
  }
}