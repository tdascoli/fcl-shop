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
  $articles = $sth->fetchObject();
  return $response->withJson($articles);
});

$app->post('/orders', function (Request $request, Response $response) {
  /*
   * orders
   * orders->cart[]
   * send email!
   *
  $data = $request->getParsedBody();

  $sql = "INSERT INTO articles (title, description, prize)  VALUES (:title, :description, :prize)";

  $db = getConnection();
  $sth = $db->prepare($sql);
  $sth->bindParam("title", $data['title']);
  $sth->bindParam("description", $data['description']);
  $sth->bindParam("prize", $data['prize']);
  $sth->execute();

  $data->article_id = $db->lastInsertId();
  return $response->withJson($data);
  */
});

/*
$app->get('/articles/:id', 'getArticle');
$app->get('/orders/:id',  'getOrder');

$app->post('/orders/',    'addOrder');

? $app->get('/order_article/:id',  'getOrderArticles');
? $app->post('/order_article', 'addOrderArticles');
? $app->get('/orders/send/:id', 'sendOrders');
*/

/** ADMIN-SECTION */
/*
$app->post('/articles', 'addArticle');
$app->put('/articles/:id', 'updateArticle');
$app->delete('/articles/:id', 'deleteArticle');

?get->orders (all orders)?
 */
$app->post('/articles', function (Request $request, Response $response) {
  $data = $request->getParsedBody();

  $sql = "INSERT INTO articles (title, description, prize)  VALUES (:title, :description, :prize)";

  $db = getConnection();
  $sth = $db->prepare($sql);
  $sth->bindParam("title", $data['title']);
  $sth->bindParam("description", $data['description']);
  $sth->bindParam("prize", $data['prize']);
  $sth->execute();

  $data->article_id = $db->lastInsertId();
  return $response->withJson($data);
});

$app->run();

?>
