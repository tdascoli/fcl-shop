<?php
function getConnection() {
  $dbhost="localhost:3306";
  $dbuser="shop-user";
  $dbpass="shop";
  $dbname="beef_shop";
  $dbh = new PDO("mysql:host=$dbhost;dbname=$dbname;charset=utf8", $dbuser, $dbpass);
  $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  return $dbh;
}
?>
