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

$app->post('/articles', function (Request $request, Response $response) {
  $data = $request->getParsedBody();

  return $response->withJson($data);
  /*$sql = "INSERT INTO articles (title, description, prize)  VALUES (:articleNumber, :articleNumberChildren, :title, :description, :prize, :childrenPrize, :picture, :sizeType, :logoPrint, :charPrint, :discount)";

  $db = getConnection();
  $sth = $db->prepare($sql);
  $sth->bindParam("id", $id);
  $sth->execute();
  $articles = $sth->fetchObject();
  return $this->response->withJson($articles);*/
});

/*
 * function addArticle() {
    $request = \Slim\Slim::getInstance()->request();
    $article = json_decode($request->getBody());
    $sql = "INSERT INTO articles (article_number, article_number_children, title, description, prize, children_prize, picture, size_type, logo_print, char_print, discount)  VALUES (:articleNumber, :articleNumberChildren, :title, :description, :prize, :childrenPrize, :picture, :sizeType, :logoPrint, :charPrint, :discount)";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("articleNumber", $article->article_number);
        $stmt->bindParam("articleNumberChildren", $article->article_number_children);
        $stmt->bindParam("title", $article->title);
        $stmt->bindParam("description", $article->description);
        $stmt->bindParam("prize", $article->prize);
        $stmt->bindParam("childrenPrize", $article->children_prize);
        $stmt->bindParam("picture", $article->picture);
        $stmt->bindParam("sizeType", $article->size_type);
        $stmt->bindParam("logoPrint", $article->logo_print);
        $stmt->bindParam("charPrint", $article->char_print);
        $stmt->bindParam("discount", $article->discount);
        $stmt->execute();
        $article->article_id = $db->lastInsertId();
        $db = null;
        echo json_encode($article);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}
$app->get('/articles/:id', 'getArticle');
$app->get('/articles/search/:query', 'findByArticleNumber');
$app->post('/articles', 'addArticle');
$app->put('/articles/:id', 'updateArticle');
$app->delete('/articles/:id', 'deleteArticle');
//$app->get('/articles/search/:query', 'findByName');
$app->get('/orders/:id',  'getOrder');
$app->post('/orders/',    'addOrder');
$app->get('/order_article/:id',  'getOrderArticles');
$app->post('/order_article', 'addOrderArticles');
$app->get('/orders/send/:id',  'sendOrders');
*/

$app->run();

?>
