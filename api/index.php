<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require 'config.php';
require 'connect.php';
require 'vendor/autoload.php';

$app = new \Slim\App(["settings" => $config]);

$app->options('/{routes:.+}', function ($request, $response, $args) {
  return $response;
});

$app->add(function ($req, $res, $next) {
  $response = $next($req, $res);
  return $response
    ->withHeader('Access-Control-Allow-Origin', '*')
    ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
    ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

$app->get('/articles', function (Request $request, Response $response) {
  $db = getConnection();
  $sth = $db->prepare("SELECT * FROM articles ORDER BY article_id");
  $sth->execute();
  $articles = $sth->fetchAll();
  return $response->withJson($articles);
});

$app->get('/articles/{id}', function (Request $request, Response $response) {
  $id = $request->getAttribute('id');

  $db = getConnection();
  $sth = $db->prepare("SELECT * FROM articles WHERE article_id=:id");
  $sth->bindParam("id", $id);
  $sth->execute();
  $articles = $sth->fetchObject();
  return $response->withJson($articles);
});

$app->get('/orders/{id}', function (Request $request, Response $response) {
  $id = $request->getAttribute('id');

  $db = getConnection();
  $sth = $db->prepare("SELECT * FROM orders WHERE order_id=:id");
  $sth->bindParam("id", $id);
  $sth->execute();
  $order = $sth->fetchObject();
  $order->cart=[];

  // LOAD ORDER ARTICLES!!
  $sth = $db->prepare("SELECT * FROM order_article WHERE order_id=:id");
  $sth->bindParam("id", $id);
  $sth->execute();
  $order->cart = $sth->fetchAll();

  return $response->withJson($order);
});

$app->post('/orders', function (Request $request, Response $response) {
  /*
   * send email!
   */

  $data = $request->getParsedBody();

  $db = getConnection();

  // INSERT ORDER
  $sql = "INSERT INTO orders (name, address, email, phone)  VALUES (:name, :address, :email, :phone)";
  $sth = $db->prepare($sql);
  $sth->bindParam("name", $data['name']);
  $sth->bindParam("address", $data['address']);
  $sth->bindParam("email", $data['email']);
  $sth->bindParam("phone", $data['phone']);
  $sth->execute();

  $order_id = $db->lastInsertId();

  // INSERT ORDER_ARTICLE
  foreach ($data['cart'] as $article){
    $sql = "INSERT INTO order_article (order_id, article_id, title, prize, qty)  VALUES (:orderId, :articleId, :title, :prize, :qty)";
    $sth = $db->prepare($sql);
    $sth->bindParam("orderId", $order_id);
    $sth->bindParam("articleId", $article['article_id']);
    $sth->bindParam("title", $article['title']);
    $sth->bindParam("prize", $article['prize']);
    $sth->bindParam("qty", $article['qty']);
    $sth->execute();
  }

  return $response->withJson($order_id);
});

/** ADMIN-SECTION */
/*
$app->post('/articles', 'addArticle');
$app->put('/articles/:id', 'updateArticle');
$app->delete('/articles/:id', 'deleteArticle');

?get->orders (all orders)?
 */
$app->post('/authenticate', function (Request $request, Response $response) {
  $data = $request->getParsedBody();

  $sql = "SELECT admin_id FROM admins WHERE user = :user AND password = :password";

  $db = getConnection();
  $sth = $db->prepare($sql);
  $sth->bindParam("user", $data['user']);
  $sth->bindParam("password", $data['password']);
  $sth->execute();
  $adminId = $sth->fetchObject();

  if (!$adminId){
    return $response->withJson(false);
  }
  $token = md5($data['user'].$data['password']);

  return $response->withJson(['token'=>$token,'uid'=>$adminId]);
});

$app->put('/articles/{id}', function (Request $request, Response $response) {
  $id = $request->getAttribute('id');
  $data = $request->getParsedBody();
  $sql = "UPDATE articles SET title = :title, description = :description, prize = :prize WHERE article_id = :id";

  $db = getConnection();
  $sth = $db->prepare($sql);
  $sth->bindParam("title", $data['title']);
  $sth->bindParam("description", $data['description']);
  $sth->bindParam("prize", $data['prize']);
  $sth->bindParam("id", $id);
  $sth->execute();

  return $response->withJson($data);
});

$app->post('/articles', function (Request $request, Response $response) {
  $data = $request->getParsedBody();
  $params = $request->getQueryParams();

  $sql = "INSERT INTO articles (title, description, prize)  VALUES (:title, :description, :prize)";

  $db = getConnection();
  $sth = $db->prepare($sql);
  $sth->bindParam("title", $data['title']);
  $sth->bindParam("description", $data['description']);
  $sth->bindParam("prize", $data['prize']);
  $sth->execute();

  $data['article_id'] = $db->lastInsertId();
  return $response->withJson($data);
});

$app->delete('/articles/{id}', function (Request $request, Response $response) {
  $id = $request->getAttribute('id');

  $sql = "DELETE FROM articles WHERE article_id = :id";

  $db = getConnection();
  $sth = $db->prepare($sql);
  $sth->bindParam("id", $id);
  $sth->execute();

  return $response->withJson(true);
});

$app->put('/orders/completed/{id}', function (Request $request, Response $response) {
  $id = $request->getAttribute('id');
  $data = $request->getParsedBody();

  $sql = "UPDATE orders SET completed = :completed WHERE order_id = :id";

  $db = getConnection();
  $sth = $db->prepare($sql);
  $sth->bindParam("completed", $data['completed']);
  $sth->bindParam("id", $id);
  $sth->execute();

  return $response->withJson($data);
});

$app->delete('/orders/{id}', function (Request $request, Response $response) {
  $id = $request->getAttribute('id');

  $sql = "DELETE FROM orders WHERE order_id = :id";
  $db = getConnection();
  $sth = $db->prepare($sql);
  $sth->bindParam("id", $id);
  $sth->execute();

  $sql = "DELETE FROM order_article WHERE order_id = :id";
  $db = getConnection();
  $sth = $db->prepare($sql);
  $sth->bindParam("id", $id);
  $sth->execute();

  return $response->withJson(true);

});

$app->run();

?>
