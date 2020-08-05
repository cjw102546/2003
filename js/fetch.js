function request(url, data = {}) {
  return new Promise(function (resolve, reject) { //Promise对象
    $.ajax({ //ajax异步
      data, //接收对象
      // type: "POST",
      url, //请求路径
      success: function (data) { //成功回调

        resolve(data);
        //resolve  解析正确的data
        //console.log(data)
      },
      dataType: 'json' //返回的数据格式，不写默认以文档返回
    });
  });
}


const APILogin = params => request('http://w0328.gz01.bdysite.com/php/03login.php', params); //返回parems 调用的结果    APILogin带参
const APIRegister = params => request('http://w0328.gz01.bdysite.com/php/04register.php', params);

const APIGoodsDetail = params => request('http://w0328.gz01.bdysite.com/php/09goods_detail.php', params);
const APICartAdd = params => request('http://w0328.gz01.bdysite.com/php/10cart_add.php', params);
const APICartList = params => request('http://w0328.gz01.bdysite.com/php/11cart_list.php', params);
const APICartSetCount = params => request('http://w0328.gz01.bdysite.com/php/12cart_setCount.php', params);
const APICartDel = params => request('http://w0328.gz01.bdysite.com/php/cartdel.php', params);