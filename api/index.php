<?php

require('Slim/Slim.php');
\Slim\Slim::registerAutoloader();
$app = new \Slim\Slim();

$app->get('/articles', 'getArticles');
$app->get('/articles/:id',  'getArticle');

//$app->get('/articles/search/:query', 'findByName');
//$app->post('/articles', 'addArticle');
//$app->put('/articles/:id', 'updateArticle');
//$app->delete('/articles/:id',   'deleteArticle');

$app->get('/orders/:id',  'getOrder');
$app->post('/orders/',    'addOrder');

$app->get('/order_article/:id',  'getOrderArticles');
$app->post('/order_article', 'addOrderArticles');

$app->get('/orders/send/:id',  'sendOrders');

/*
$app->options('/articles', function () use($app) {
    $response = $app->response();
    $response->header('Access-Control-Allow-Origin', 'http://localhost:8880');
    $response->header('Access-Control-Allow-Methods', 'GET, POST');
    $response->header('Access-Control-Allow-Headers', 'accept, origin, content-type');
});
*/

$app->run();

function getArticles() {
    $sql = "SELECT * FROM articles ORDER BY title";
    try {
        $db = getConnection();
        $stmt = $db->query($sql);
        $articles = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        echo json_encode($articles);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

function getArticle($id) {
    $sql = "SELECT * FROM articles WHERE article_id=:id";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("id", $id);
        $stmt->execute();
        $article = $stmt->fetchObject();
        $db = null;
        echo json_encode($article);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

function getOrder($id) {
    $sql = "SELECT * FROM orders WHERE order_id=:id";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("id", $id);
        $stmt->execute();
        $order = $stmt->fetchObject();
        $db = null;
        echo json_encode($order);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

function addOrder() {
    $request = \Slim\Slim::getInstance()->request();
    $order = json_decode($request->getBody());
    $sql = "INSERT INTO orders (email, name, phone, address) VALUES (:email, :name, :phone, :address)";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("email", $order->email);
        $stmt->bindParam("name", $order->name);
        $stmt->bindParam("phone", $order->phone);
        $stmt->bindParam("address", $order->address);
        $stmt->execute();
        //$order->order_id = $db->lastInsertId();

        $stmt = $db->query("SELECT * FROM orders WHERE order_id=".$db->lastInsertId());
        $stmt->execute();
        $order = $stmt->fetchObject();

        $db = null;
        echo json_encode($order);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

function getOrderArticles($id) {
    $sql = "select * FROM order_article WHERE order_id = :id ";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("id", $id);
        $stmt->execute();
        $orders = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        echo json_encode($orders);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

function addOrderArticles() {
    $request = \Slim\Slim::getInstance()->request();
    $order = json_decode($request->getBody());
    $sql = "INSERT INTO order_article (order_id, article_id, qty, size, size_type, logo_print, char_print, order_prize) VALUES (:orderId, :articleId, :qty, :size, :sizeType, :logoPrint, :orderCharPrint, :orderPrize)";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("orderId", $order->order_id);
        $stmt->bindParam("articleId", $order->article_id);
        $stmt->bindParam("qty", $order->qty);
        $stmt->bindParam("size", $order->size);
        $stmt->bindParam("sizeType", $order->size_type);
        $stmt->bindParam("logoPrint", $order->logo_print);
        $stmt->bindParam("orderCharPrint", $order->order_char_print);
        $stmt->bindParam("orderPrize", $order->order_prize);
        $stmt->execute();
        $order->order_article_id = $db->lastInsertId();
        $db = null;
        echo json_encode($order);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

function sendOrders($id) {
    $sql_o = "SELECT * FROM orders WHERE order_id = :id ";

    $sql_oa = "SELECT oa.qty as qty, oa.size as size, oa.logo_print as logo_print, oa.char_print as char_print, a.article_number as article_number, a.title as title, oa.order_prize as order_prize FROM order_article as oa, articles as a WHERE oa.article_id = a.article_id AND oa.order_id = :id ";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql_o);
        $stmt->bindParam("id", $id);
        $stmt->execute();
        $orders = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;

        $db = getConnection();
        $stmt = $db->prepare($sql_oa);
        $stmt->bindParam("id", $id);
        $stmt->execute();
        $order_article = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;

        // Betreff
        $betreff = 'Ihre Bestellung im FCL-Shop by Vaucher Sports';
        $bestellung='';
        // Nachricht
        foreach ($order_article as $article){
            $bestellung .='<tr>
                            <td>'.$article->article_number.'</td>
                            <td>'.$article->title.'</td>
                            <td>'.$article->qty.'</td>
                            <td>'.$article->size.'</td>
                            <td>'.$article->logo_print.'</td>
                            <td>'.$article->char_print.'</td>
                            <td>'.$article->order_prize.'</td>
                          </tr>';
        }

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
          Vielen Dank f&uuml;r Ihre Bestellung im FCL-Shop by Vaucher Sports.<p />
          Ihre Bestell-Nummer lautet: '.$id.'<p />
          <strong>'.$orders[0]->name.'</strong><br />
          '.$orders[0]->address.'<br />
          '.$orders[0]->phone.'<br />
          '.$orders[0]->email.'
          <p />
          <table>
          <thead>
            <tr>
                <th>Art. Nummer</th>
                <th>Artikel</th>
                <th>Anzahl</th>
                <th>Gr&ouml;sse</th>
                <th>FCL Logo</th>
                <th>Beschriftung</th>
                <th>Preis</th>
            </tr>
          </thead>
          <tbody>
          '.$bestellung.'
          </tbody>
          </table>
          <p />
          ((Sobald die Bestellung bla bla bla...))
        </body>
        </html>';

        $header  = 'MIME-Version: 1.0' . "\r\n";
        $header .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
        $header .= 'To: Vaucher Sports <tdascoli@fclaenggasse.ch>' . "\r\n";
        $header .= 'From: FCL-Shop by Vaucher Sports <no-reply@fclaenggasse.ch>' . "\r\n";
        $header .= 'Reply-To: Vaucher Sports <thomas@dasco.li>' . "\r\n";

        // verschicke die E-Mail
        mail($orders[0]->email, $betreff, $nachricht, $header);

    echo '{"msg":{"text": "email sent to '.$orders[0]->name.' <'.$orders[0]->email.'>" }}';
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}
/*
function updateWine($id) {
    $request = \Slim\Slim::getInstance()->request();
    $body = $request->getBody();
    $wine = json_decode($body);
    $sql = "UPDATE wine SET name=:name, grapes=:grapes, country=:country, region=:region, year=:year, description=:description WHERE id=:id";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("name", $wine->name);
        $stmt->bindParam("grapes", $wine->grapes);
        $stmt->bindParam("country", $wine->country);
        $stmt->bindParam("region", $wine->region);
        $stmt->bindParam("year", $wine->year);
        $stmt->bindParam("description", $wine->description);
        $stmt->bindParam("id", $id);
        $stmt->execute();
        $db = null;
        echo json_encode($wine);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

function deleteWine($id) {
    $sql = "DELETE FROM wine WHERE id=:id";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("id", $id);
        $stmt->execute();
        $db = null;
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}
function findByName($query) {
    $sql = "SELECT * FROM wine WHERE UPPER(name) LIKE :query ORDER BY name";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $query = "%".$query."%";
        $stmt->bindParam("query", $query);
        $stmt->execute();
        $wines = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        echo '{"wine": ' . json_encode($wines) . '}';
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}
*/

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