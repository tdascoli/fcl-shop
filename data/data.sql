------------------------------------------------------------------
--  TABLE admins
------------------------------------------------------------------

CREATE TABLE admins
(
   admin_id   int(10),
   user       varchar(200),
   password   varchar(200)
);


------------------------------------------------------------------
--  TABLE articles
------------------------------------------------------------------

CREATE TABLE articles
(
   article_id    int(11),
   title         varchar(200),
   description   varchar(200),
   prize         float
);


------------------------------------------------------------------
--  TABLE order_article
------------------------------------------------------------------

CREATE TABLE order_article
(
   order_article_id   int(11),
   order_id           int(11),
   article_id         int(11),
   qty                int(2),
   prize              float,
   title              varchar(200)
);


------------------------------------------------------------------
--  TABLE orders
------------------------------------------------------------------

CREATE TABLE orders
(
   order_id     int(11),
   email        varchar(200),
   name         varchar(200),
   phone        varchar(20),
   address      varchar(200),
   order_date   timestamp DEFAULT 'CURRENT_TIMESTAMP',
   confirmed    tinyint(1) DEFAULT 0,
   completed    tinyint(1) DEFAULT 0,
   order_hash   varchar(32) DEFAULT '1'
);


