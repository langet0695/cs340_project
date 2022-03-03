-- Write the query to create the 4 tables below.
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS Customers;
DROP TABLE IF EXISTS Sales;
DROP TABLE IF EXISTS OrderContents;
DROP TABLE IF EXISTS PlantsUnlimitedProducts;
DROP TABLE IF EXISTS Promotions;
SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE IF NOT EXISTS `Customers` (
    `customerID`        int UNIQUE NOT NULL AUTO_INCREMENT,
    `email`             varChar(120) UNIQUE NOT NULL,
    `street`            varChar(120), 
    `city`              varChar(50),
    `zip`               int,
    `status`            boolean NOT NULL,
    `lastPurchaseDate`  date,
    `lastPurchaseID`    int,
    PRIMARY KEY(`customerID`)
);

CREATE TABLE IF NOT EXISTS `Promotions` (
    `promoID`           int UNIQUE NOT NULL AUTO_INCREMENT,
    `status`            boolean NOT NULL,
    `discountSize`      decimal(3,2) NOT NULL,
    PRIMARY KEY(`promoID`)
);

CREATE TABLE IF NOT EXISTS `Sales` (
    `orderID`               int UNIQUE NOT NULL AUTO_INCREMENT,
    `customerID`            int NOT NULL,
    `saleDate`              date NOT NULL,
    `orderFulfilled`        boolean NOT NULL,
    `orderFulfilledDate`    date,
    `totalPrice`            decimal(7,2) NOT NULL,
    PRIMARY KEY(`orderID`),
    FOREIGN KEY (`customerID`) REFERENCES `Customers` (`customerID`) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS `PlantsUnlimitedProducts` (
    `productID`               int UNIQUE NOT NULL AUTO_INCREMENT,
    `promoID`                 int NOT NULL,
    `productType`             text NOT NULL,
    `description`             text,
    `price`                   decimal(7,2) NOT NULL,
    `quantityInStock`         int NOT NULL,
    PRIMARY KEY(`productID`),
    FOREIGN KEY (`promoID`) REFERENCES `Promotions` (`promoID`)
);

CREATE TABLE IF NOT EXISTS `OrderContents` (
    `contentID`               int UNIQUE NOT NULL AUTO_INCREMENT,
    `orderID`                 int NOT NULL,
    `productID`               int NOT NULL,
    `quantityOrdered`         int,
    PRIMARY KEY(`contentID`),
    FOREIGN KEY (`orderID`) REFERENCES `Sales` (`orderID`) ON DELETE CASCADE,
    FOREIGN KEY (`productID`) REFERENCES `PlantsUnlimitedProducts` (`productID`) ON DELETE CASCADE
);

DESCRIBE Customers;
DESCRIBE Promotions;
DESCRIBE Sales;
DESCRIBE PlantsUnlimitedProducts;
DESCRIBE OrderContents;

INSERT INTO `Customers`(`email`, `street`, `city`, `zip`, `status`, `lastPurchaseDate`, `lastPurchaseID`)
VALUES  ('test1@test.com', 'fake street', 'fakeville', 55555, TRUE, '2019-04-10', 1),
        ('test2@test.com', 'fake avenue', 'fiction town', 12345, FALSE, '2018-09-09', 2);

INSERT INTO `Promotions`(`status`, `discountSize`)
VALUES  (TRUE, 0.0),
        (TRUE, 0.5),
        (TRUE, 0.3);

INSERT INTO `Sales`(`customerID`, `saleDate`, `orderFulfilled`, `orderFulfilledDate`, `totalPrice`)
VALUES  (1, '2019-04-10', TRUE, '2019-05-11', 100),
        (2,'2019-04-10', FALSE, NULL, 75);

INSERT INTO `PlantsUnlimitedProducts`(`promoID`, `productType`, `description`, `price`, `quantityInStock`)
VALUES  (1, 'pregrown', 'This is a tree for a yard', 25, 10),
        (2, 'seed', 'This is a bush', 50, 10);

INSERT INTO `OrderContents`(`orderID`, `productID`, `quantityOrdered`)
VALUES  (1, 2, 2),
        (2, 1, 1),
        (2, 2, 1);