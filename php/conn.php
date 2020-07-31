<?php
@header("Content-type:text/html;charset=utf-8");


@header("Access-Control-Allow-Origin:*");
$conn = mysqli_connect("127.0.0.1:3306", "root", "123456", "2003");



mysqli_query($conn, "set names utf8");   // 从数据库 取数据的时候  将数据转为utf-8
mysqli_query($conn, "set character set utf-8");  // 向数据库 存数据的时候  将数据转为utf-8
