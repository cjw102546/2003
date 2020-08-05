var form = document.getElementsByTagName("form")[0];
var pwdInp = document.getElementById("pwd");
var randCode = document.getElementsByClassName("randCode")[0];
var regBtn = document.getElementById("regBtn");

var userInp = document.getElementById("user");
var userSpan = document.getElementById("user_span");
var pwdInp = document.getElementById("pwd");
var pwdSpan = document.getElementById("pwd_span");
var phoneInp = document.getElementById("phone");
var phoneSpan = document.getElementById("phone_span");
var emailInp = document.getElementById("email");
var emailSpan = document.getElementById("email_span");

randCode.textContent = getCode();

var isUserRight = false;
var isPwdRight = false;
var isRepwdRight = false;
var isPhoneRight = false;
var isEmailRight = false;
var isCodeRight = false;



// var a = b = 10

form.onchange = form.oninput = function (e) {
  var e = e || window.event;
  var target = e.target || e.srcElement;
  console.log(target);
  if (target.id == "user") {
    var user = target.value;
    var tipsSpan = next(target);
    // 用户
    judgeUserHandler(user, tipsSpan);
  } else if (target.id == "pwd") {
    var pwd = target.value;
    var tipsSpan = next(target);
    // 用户
    judgePwdHandler(pwd, tipsSpan);
  } else if (target.id == "repwd") {
    var repwd = target.value;
    var tipsSpan = next(target);
    var pwd = pwdInp.value;
    // 用户
    judgeRepwdHandler(repwd, pwd, tipsSpan);
  } else if (target.id == "phone") {
    var phone = target.value;
    var tipsSpan = next(target);

    // 用户
    judgePhoneHandler(phone, tipsSpan);
  } else if (target.id == "email") {
    var email = target.value;
    var tipsSpan = next(target);

    // 用户
    judgeEmailHandler(email, tipsSpan);
  } else if (target.id == "code") {
    var code = target.value;
    var randCode = next(target);
    var tipsSpan = next(randCode);

    var judgeCode = randCode.textContent;
    // 用户
    judgeCodeHandler(code, judgeCode, tipsSpan);
  }
}

// 单用户  
// var count = 0;
regBtn.onclick = function () {
  // 提交时等所有内容验证通过之后才可以
  var user = userInp.value;
  var pwd = pwdInp.value;
  var phone = phoneInp.value;
  var email = emailInp.value;

  console.log(isUserRight, isPwdRight, isRepwdRight, isPhoneRight, isEmailRight, isCodeRight)
  if (isUserRight && isPwdRight && isRepwdRight && isPhoneRight && isEmailRight && isCodeRight) {
    var xhr = new XMLHttpRequest();
    xhr.open("post", "http://www.2003.com/project/php/register.php", true);

    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(`user=${user}&pwd=${pwd}&phone=${phone}&email=${email}`);

    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        console.log(xhr.responseText);
        var data = JSON.parse(xhr.responseText);
        console.log(data);
        if (data.status) {
          location.href = "./login.html";
        } else {
          alert("注册失败");
        }
      }
    }

  }
}



function judgeUserHandler(user, tipsSpan) {
  // 1. 判断长度
  // 2. 首字符
  // 3. 是否含有非法字符
  isUserRight = false;
  var lengthReg = /^.{6,12}$/;
  var startReg = /^[^0-9]/;
  var illegalReg = /[^\w$]/; // 非法字符

  if (lengthReg.test(user)) {
    if (startReg.test(user)) {
      if (!illegalReg.test(user)) {
        // tipsSpan.textContent = "√";
        // tipsSpan.className = "right";
        // isUserRight = true;

        var xhr = new XMLHttpRequest();
        // 0  创建请求 但是未初始化

        // 请求报文  (请求行,请求头,空行,请求数据)
        xhr.open("get", "http://www.2003.com/project/php/isExistUser.php?user=" + user, true);
        // 1   建立TCP链接 但是请求未发送

        xhr.send();

        // 异步
        xhr.onreadystatechange = function () {
          // 2.   请求已发送  服务器接收请求 准备处理
          // 3.   正在处理
          // 4.   处理完毕,   返回服务器响应 
          if (xhr.readyState == 4 && xhr.status == 200) {
            var data = JSON.parse(xhr.responseText);
            if (data.status) {
              tipsSpan.textContent = "√";
              tipsSpan.className = "right";
              isUserRight = true;
            } else {
              tipsSpan.textContent = data.msg;
              tipsSpan.className = "err";
            }
          }
        }


      } else {
        tipsSpan.textContent = "用户名由数字,大小写字母,下划线,$组成";
        tipsSpan.className = "err";
      }
    } else {
      tipsSpan.textContent = "用户名不能以数字开头";
      tipsSpan.className = "err";
    }
  } else {
    tipsSpan.textContent = "用户名需要在 6-12 位之间";
    tipsSpan.className = "err";
  }
}

function judgePwdHandler(str, tipsSpan) {
  // 1. 判断长度
  // 2. 首字符
  // 3. 是否含有非法字符
  isPwdRight = false;
  var lengthReg = /^.{6,12}$/;
  var illegalReg = /[^\w]/; // 非法字符
  var isExistNum = /[0-9]/;
  var isExistSmall = /[a-z]/;
  var isExistBig = /[A-Z]/;

  if (lengthReg.test(str)) {
    if (!illegalReg.test(str)) {
      // tipsSpan.textContent = "√";
      // tipsSpan.className = "right";

      var sum = 0;
      if (isExistNum.test(str)) {
        sum++;
      }
      if (isExistSmall.test(str)) {
        sum++;
      }
      if (isExistBig.test(str)) {
        sum++;
      }

      switch (sum) {
        case 1:
          tipsSpan.textContent = "弱";
          break;
        case 2:
          tipsSpan.textContent = "中";
          break;
        case 3:
          tipsSpan.textContent = "强";
          break;
      }
      tipsSpan.className = "right";

      isPwdRight = true;


    } else {
      tipsSpan.textContent = "密码由数字,大小写字母,下划线,$组成";
      tipsSpan.className = "err";
    }

  } else {
    tipsSpan.textContent = "密码需要在 6-12 位之间";
    tipsSpan.className = "err";
  }
}

function judgeRepwdHandler(pwd_1, pwd_2, tipsSpan) {
  isRepwdRight = false;
  if (pwd_1 === pwd_2) {
    tipsSpan.textContent = "√";
    tipsSpan.className = "right";
    isRepwdRight = true;
  } else {
    tipsSpan.textContent = "两次密码输入不一致";
    tipsSpan.className = "err";
  }
}

function judgePhoneHandler(str, tipsSpan) {
  var phoneReg = /^1[3456789]\d{9}$/;
  isPhoneRight = false;

  if (phoneReg.test(str)) {

    var xhr = new XMLHttpRequest();
    // 0  创建请求 但是未初始化

    // 请求报文  (请求行,请求头,空行,请求数据)
    xhr.open("get", "http://www.2003.com/project/php/isExistPhone.php?phone=" + str, true);
    // 1   建立TCP链接 但是请求未发送

    xhr.send();

    // 异步
    xhr.onreadystatechange = function () {
      // 2.   请求已发送  服务器接收请求 准备处理
      // 3.   正在处理
      // 4.   处理完毕,   返回服务器响应 
      if (xhr.readyState == 4 && xhr.status == 200) {
        var data = JSON.parse(xhr.responseText);
        if (data.status) {
          tipsSpan.textContent = "√";
          tipsSpan.className = "right";
          isPhoneRight = true;
        } else {
          tipsSpan.textContent = data.msg;
          tipsSpan.className = "err";
        }
      }
    }

  } else {
    tipsSpan.textContent = "请输入正确的手机号";
    tipsSpan.className = "err";
  }
}

function judgeEmailHandler(str, tipsSpan) {
  //  1272071492@qq.com
  var phoneReg = /^\w{5,12}@\w{2,5}(\.com|\.cn)$/;
  isEmailRight = false;
  if (phoneReg.test(str)) {
    // tipsSpan.textContent = "√";
    // tipsSpan.className = "right";
    // isEmailRight = true;


    var xhr = new XMLHttpRequest();
    // 0  创建请求 但是未初始化

    // 请求报文  (请求行,请求头,空行,请求数据)
    xhr.open("get", "../php/isExistEmail.php?email=" + str, true);
    // 1   建立TCP链接 但是请求未发送

    xhr.send();

    // 异步
    xhr.onreadystatechange = function () {
      // 2.   请求已发送  服务器接收请求 准备处理
      // 3.   正在处理
      // 4.   处理完毕,   返回服务器响应 
      if (xhr.readyState == 4 && xhr.status == 200) {
        var data = JSON.parse(xhr.responseText);
        if (data.status) {
          tipsSpan.textContent = "√";
          tipsSpan.className = "right";
          isEmailRight = true;
        } else {
          tipsSpan.textContent = data.msg;
          tipsSpan.className = "err";
        }
      }
    }

  } else {
    tipsSpan.textContent = "请输入正确的邮箱";
    tipsSpan.className = "err";
  }
}


function judgeCodeHandler(code, judgeCode, tipsSpan) {
  isCodeRight = false;
  var codeReg = new RegExp(code, "i");
  if (codeReg.test(judgeCode)) {
    tipsSpan.textContent = "√";
    tipsSpan.className = "right";
    isCodeRight = true;
  } else {
    tipsSpan.textContent = "×";
    tipsSpan.className = "err";
  }
}

function prev(ele) {
  return ele.previousElementSibling || ele.previousSibling;
}


function next(ele) {
  return ele.nextElementSibling || ele.nextSibling;
}

function getCode() {
  var str = "1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
  var newStr = "";
  for (var i = 0; i < 4; i++) {
    var index = Math.floor(Math.random() * str.length);
    newStr += str.charAt(index);
  }
  return newStr;
}