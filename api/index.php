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

// FUNCTIONS
function sendOrderEMail($data,$order_id){
  $betreff = 'Ihre Bestellung im Beef-Shop Schüpfenried';
  $bestellung='';
  // Nachricht
  $total_prize=0;
  foreach ($data['cart'] as $article){
    $bestellung .='<tr>
                            <td>'.$article['title'].'</td>
                            <td>'.$article['qty'].'</td>
                            <td>'.$article['prize'].'</td>
                            <td>'.($article['prize']*$article['qty']).'</td>
                          </tr>';
    $total_prize+=($article['prize']*$article['qty']);
  }
  // TOTAL
  $bestellung .='<tr>
                  <td colspan="3" align="right"><strong>Total</strong></td>
                  <td>'.$total_prize.'</td>
                </tr>';
  $nachricht = '
        <html>
        <head>
          <title>'.$betreff.'</title>
          <style type="text/css">
            table {
                border-width: 1px;
                border-spacing: 2px;
                border-style: outset;
                border-color: gray;
                border-collapse: collapse;
                background-color: white;
            }
            table th {
                border-width: 2px;
                padding: 5px;
                border-style: solid;
                border-color: gray;
                background-color: white;
                -moz-border-radius: ;
            }
            table td {
                border-width: 2px;
                padding: 5px;
                border-style: solid;
                border-color: gray;
                background-color: white;
                -moz-border-radius: ;
            }
            </style>
        </head>
        <body>
          <p>Dieses E-Mail wurde automatisch generiert. Bitte beantworten Sie es nicht.</p>
          <hr />
          Vielen Dank f&uuml;r Ihre Bestellung im Beef-Shop Sch&uuml;pfenried.<p />
          <a href="http://www.schuepfenried.ch/shop/#!/order/'.$order_id.'">Ihre Bestell-Nummer lautet: <strong>'.$order_id.'</strong></a><p />
          <ul>
            <li>Sobald die Ware abholbereit ist, bekommen Sie <strong>vom Bauernhof Sch&uuml;pfenried</strong> eine Nachricht</li>
            <li>Die Ware muss auf dem <strong>Bauernhof Sch&uuml;pfenried</strong> abgeholt und auch bezahlt werden</li>
            <li><a href="http://www.schuepfenried.ch/shop/">Weitere Information auf der Webseite</a></li>
          </ul>
          <p />
          <strong>'.$data['name'].'</strong><br />
          '.$data['address'].'<br />
          '.$data['phone'].'<br />
          '.$data['email'].'
          <p />
          <table>
          <thead>
            <tr>
                <th>Artikel</th>
                <th>Anzahl</th>
                <th>Preis</th>
                <th>Total</th>
            </tr>
          </thead>
          <tbody>
          '.$bestellung.'
          </tbody>
          </table>
        </body>
        </html>';
  $header  = 'MIME-Version: 1.0' . "\r\n";
  $header .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
  // TO
  $header .= 'To: Bauernhof Schüpfenried <thomas.dascoli@gmail.com>' . "\r\n";
  // FROM
  $header .= 'From: Bauernhof Schüpfenried <thomas.dascoli@gmail.com>' . "\r\n";
  // Antwort Adresse
  $header .= 'Reply-To: Bauernhof Schüpfenried <thomas.dascoli@gmail.com>' . "\r\n";
  // verschicke die E-Mail
  mail($data['email'], $betreff, $nachricht, $header);
}

// GENERAL
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
  $data = $request->getParsedBody();
  $confirmed=true;
  $db = getConnection();

  // INSERT ORDER
  $sql = "INSERT INTO orders (name, address, email, phone)  VALUES (:name, :address, :email, :phone)";
  $sth = $db->prepare($sql);
  $sth->bindParam("name", $data['name']);
  $sth->bindParam("address", $data['address']);
  $sth->bindParam("email", $data['email']);
  $sth->bindParam("phone", $data['phone']);
  $sth->bindParam("confirmed", $confirmed);
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

  sendOrderEMail($data,$order_id);

  return $response->withJson($order_id);
});

/** ADMIN-SECTION */
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

$app->get('/orders', function (Request $request, Response $response) {
  $db = getConnection();
  $sth = $db->prepare("SELECT * FROM orders ORDER BY order_id");
  $sth->execute();
  $orders = $sth->fetchAll();

  // LOAD ORDER ARTICLES!!

  for($i=0;$i<count($orders);$i++){
    $sth = $db->prepare("SELECT * FROM order_article WHERE order_id=:id");
    $sth->bindParam("id", $orders[$i]['order_id']);
    $sth->execute();
    $orders[$i]['cart'] = $sth->fetchAll();
  }

  return $response->withJson($orders);
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
