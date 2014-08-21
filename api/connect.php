<?php
function getConnection() {
    $dbhost="127.0.0.1:8889";
    $dbuser="root";
    $dbpass="root";
    $dbname="fcl-shop";
    $dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);
    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    return $dbh;
}
?>