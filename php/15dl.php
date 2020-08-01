<?php

header("Content-type:textml;charset=utf-8");
header("Access-Control-Allow-Origin:*");
$server = 'localhost:3306';
$username = 'root';
$password = '123456';
$dbname = '2003';
$conn = mysqli_connect($server, $username, $password, $dbname);
mysqli_set_charset($conn, 'utf8');
if (!$conn) {
  die('数据库连接失败');
};



if (!isset($_REQUEST['username']) || !isset($_REQUEST['password'])) {
  $obj = array(
    'code' => 0,
    'data' => false,
    'msg' => '缺少必要参数'
  );
  die(json_encode($obj));
}

//从前端拿数据
$username = $_REQUEST['username'];
$password = $_REQUEST['password'];



//获取用户名
$sql = "SELECT*FROM userinfo WHERE username='$username'";

$result = mysqli_query($conn, $sql); //在数据库查询用户名
$data = mysqli_fetch_assoc($result); //结果集中取得一行作为关联数组

$array = array(
  'code' => 0,
  'data' => false,
  'msg' => '用户名或者密码错误'

);
//如果用户名存在并且密码能在数据库中存在表明登录成功
if ($data && $data['password'] === $password) {

  $array = array(
    'code' => 1,
    'data' => true,
    'msg' => '登录成功',
  );
}

echo json_encode($array);
