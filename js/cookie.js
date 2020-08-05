// 写入cookie
function setCookie(name, content, iDay) {
  var date = new Date();

  var day = date.getDate();
  var hours = date.getHours();

  date.setHours(hours - 8);

  date.setDate(day + iDay);

  document.cookie = `${name}=${content};path=/;expires=` + date;
}
// 删除cookie
function removeCookie(name) {
  setCookie(name, '', -1)
}
// 查找cookie列表
function getCookies() {
  return document.cookie.split('; ').map(item => ({
    name: item.split('=')[0],
    content: item.split('=')[1]
  }));
}

// 查找指定的cookie
function getCookie(key) {
  var list = getCookies();
  var data = list.filter(({ name }) => name === key)[0];
  return data ? data.content : ''
}