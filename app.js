// App.js

/*
    SETUP
*/
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
PORT        = 3050;        

var db = require('./Database/db-connector');         // Set a port number at the top so it's easy to change in the future

/*
console.log(db)

db.pool.query("SELECT 'Hello, World!'", function(error, results, fields) {
    if(error){
        console.error(error);
    }
    console.log(fields);
    console.log(results);
});
*/

const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

function getAndRenderCustomers(req, res)
{
    db.pool.query("SELECT * FROM Customers;", function(error, results, fields) {
        if(error) {
            res.write(JSON.stringify(error));
            res.end();
        }
        else {
            var d = { customers: [] };

            results.forEach(result => {
                d.customers.push(result);
            });
    
            res.render('customers', d);
        }
    });
}
function getAndRenderorderContents(req, res)
{
    db.pool.query("SELECT * FROM OrderContents;", function(error, results, fields) {
        if(error) {
            res.write(JSON.stringify(error));
            res.end();
        }
        else {
            var d = { orderContents: [] };

            results.forEach(result => {
                d.orderContents.push(result);
            });
    
            res.render('orderContents', d);
        }
    });
}
function getAndRenderproducts(req, res)
{
    db.pool.query("SELECT * FROM PlantsUnlimitedProducts;", function(error, results, fields) {
        if(error) {
            res.write(JSON.stringify(error));
            res.end();
        }
        else {
            var d = { products: [] };

            results.forEach(result => {
                d.products.push(result);
            });
    
            res.render('products', d);
        }
    });
}
function getAndRenderpromotions(req, res)
{
    db.pool.query("SELECT * FROM Promotions;", function(error, results, fields) {
        if(error) {
            res.write(JSON.stringify(error));
            res.end();
        }
        else {
            var d = { promotions: [] };

            results.forEach(result => {
                d.promotions.push(result);
            });
    
            res.render('Promotions', d);
        }
    });
}
function getAndRendersales(req, res)
{
    db.pool.query("SELECT * FROM Sales;", function(error, results, fields) {
        if(error) {
            res.write(JSON.stringify(error));
            res.end();
        }
        else {
            var d = { sales: [] };

            results.forEach(result => {
                d.sales.push(result);
            });
    
            res.render('sales', d);
        }
    });
}

// 
/*
    ROUTES
*/
app.get('/', function(req, res)
    {
        res.render('index');                    // Note the call to render() and not send(). Using render() ensures the templating engine
    });                                         // will process this file, before sending the finished HTML to the client.                                      // requesting the web site.

app.get('/customers', function(req, res)
{
    console.log(req.query);

    if (req.query["crud"] && req.query.crud == 'create') {

        var kvps = [];
        if (req.query['include_cid'] && req.query.include_cid == 'yes') {
            kvps.push({"customerID" : req.query['customerID']});
        }
        if (req.query['include_email'] && req.query.include_email == 'yes') {
            kvps.push({"customerID" : req.query['customerID']});
        }

        var insertSql = "INSERT INTO `Customers` ("

        var sqlWithId = "INSERT INTO `Customers`(`customerID`, `email`, `street`, `city`, `zip`, `status`, `lastPurchaseDate`, `lastPurchaseID`) VALUES (?,?,?,?,?,?,?,?)";
        var sqlWithoutId = "INSERT INTO `Customers`(`email`, `street`, `city`, `zip`, `status`, `lastPurchaseDate`, `lastPurchaseID`) VALUES (?,?,?,?,?,?,?)";

        var sql = null
        var inserts = null;
        if (req.query['include_cid'] && req.query.include_cid == 'yes') {
            sql = sqlWithId;
            inserts = [req.query['customerID'], req.query['email'], req.query['street'], req.query['city'], req.query['zip'], req.query['status'], req.query['lastPurchaseDate'], req.query['lastPurchaseID']];
        } else {
            sql = sqlWithoutId;
            inserts = [req.query['email'], req.query['street'], req.query['city'], req.query['zip'], req.query['status'], req.query['lastPurchaseDate'], req.query['lastPurchaseID']];
        }

        db.pool.query(sql, inserts, function(error, results, fields) {
            if(error) {
                res.write(JSON.stringify(error));
                res.end();
            } else {
                getAndRenderCustomers(req, res);
            }
        });
    } else if (req.query["crud"] && req.query.crud == 'delete') {
        // Delete using email as the identifier
        let sql = `Delete From Customers Where email = ${req.query.email};`
        console.log(sql)
        db.pool.query(sql)
        getAndRenderCustomers(req, res);
    } else {
        getAndRenderCustomers(req, res);
    }
});

app.get('/promotions', function(req, res)
{
    console.log(req.query);

    if (req.query["crud"] && req.query.crud == 'create') {
        var sqlWithId = "INSERT INTO `Promotions`(`promoID`, `status`, `discountSize`) VALUES (?,?,?)";
        var sqlWithoutId = "INSERT INTO `Customers`(`promoID`, `status`, `discountSize`) VALUES (?,?,?)";

        var sql = null
        var inserts = null;
        if (req.query['include_cid'] && req.query.include_cid == 'yes') {
            sql = sqlWithId;
            inserts = [req.query['promoID'], req.query['status'],[discountSize]];
        } else {
            sql = sqlWithoutId;
            inserts = [req.query['promoID'], req.query['status'],[discountSize]];
        }

        db.pool.query(sql, inserts, function(error, results, fields) {
            if(error) {
                res.write(JSON.stringify(error));
                res.end();
            } else {
                getAndRenderpromotions(req, res);
            }
        });
    } else if (req.query["crud"] && req.query.crud == 'delete') {
        // Delete using promoId as the identifier
        let sql = `Delete From Promotions Where promoID = ${req.query.promoID};`
        console.log(sql)
        db.pool.query(sql)
        getAndRenderpromotions(req, res);
    } else {
        getAndRenderpromotions(req, res);
    }
});    

app.get('/sales', function(req, res)
{
    console.log(req.query);

    if (req.query["crud"] && req.query.crud == 'create') {
        var sqlWithId = "INSERT INTO `Sales`(`orderID`, `customerID`, `saleDate`,''orderFulfilled','orderFulfilledDate','totalPrice') VALUES (?,?,?,?,?,?)";
        var sqlWithId = "INSERT INTO `Sales`(`orderID`, `customerID`, `saleDate`,''orderFulfilled','orderFulfilledDate','totalPrice') VALUES (?,?,?,?,?,?)";

        var sql = null
        var inserts = null;
        if (req.query['include_cid'] && req.query.include_cid == 'yes') {
            sql = sqlWithId;
            inserts = [req.query['orderID'], req.query['customerID'],req.query['saleDate'],res.query['orderFulfilled'],res.query['orderFulfilledDate'],res.quer['totalPrice']];
        } else {
            sql = sqlWithoutId;
            inserts = [req.query['orderID'], req.query['customerID'],req.query['saleDate'],res.query['orderFulfilled'],res.query['orderFulfilledDate'],res.quer['totalPrice']];
        }

        db.pool.query(sql, inserts, function(error, results, fields) {
            if(error) {
                res.write(JSON.stringify(error));
                res.end();
            } else {
                getAndRendersales(req, res);
            }
        });
    } else if (req.query["crud"] && req.query.crud == 'delete') {
        // Delete using orderId as the identifier
        let sql = `Delete From Sales Where orderID= ${req.query.orderID};`
        console.log(sql)
        db.pool.query(sql)
        getAndRendersales(req, res);
    } else {
        getAndRendersales(req, res);
    }
});    

app.get('/products', function(req, res)
{
    console.log(req.query);

    if (req.query["crud"] && req.query.crud == 'create') {
        var sqlWithId = "INSERT INTO `PlantsUnlimitedProducts`(`productID`, `promoID`, `productType`,''description','price','quantityInStock') VALUES (?,?,?,?,?,?)";
        var sqlWithId = "INSERT INTO `PlantsUnlimitedProducts`(`productID`, `promoID`, `productType`,''description','price','quantityInStock') VALUES (?,?,?,?,?,?)";

        var sql = null
        var inserts = null;
        if (req.query['include_cid'] && req.query.include_cid == 'yes') {
            sql = sqlWithId;
            inserts = [req.query['productID'], req.query['promoID'],req.query['productType'],res.query['description'],res.query['price'],res.quer['quantityInStock']];
        } else {
            sql = sqlWithoutId;
            inserts =[req.query['productID'], req.query['promoID'],req.query['productType'],res.query['description'],res.query['price'],res.quer['quantityInStock']];
        }

        db.pool.query(sql, inserts, function(error, results, fields) {
            if(error) {
                res.write(JSON.stringify(error));
                res.end();
            } else {
                getAndRenderproducts(req, res);
            }
        });
    } else if (req.query["crud"] && req.query.crud == 'delete') {
        // Delete using productType as the identifier
        let sql = `Delete From PlantsUnlimitedProducts Where productType = ${req.query.type};`
        console.log(sql)
        db.pool.query(sql)
        getAndRenderproducts(req, res);
    } else {
        getAndRenderproducts(req, res);
    }
})
app.get('/orderContents', function(req, res)
{
    console.log(req.query);

    if (req.query["crud"] && req.query.crud == 'create') {
        var sqlWithId = "INSERT INTO `OrderContents`(`contentID`, `orderID`, `productID`,'quantityOrderd') VALUES (?,?,?,?)";
        var sqlWithId = "INSERT INTO `OrderContents`(`contentID`, `orderID`, `productID`,'quantityOrderd') VALUES (?,?,?,?)";

        var sql = null
        var inserts = null;
        if (req.query['include_cid'] && req.query.include_cid == 'yes') {
            sql = sqlWithId;
            inserts = [req.query['contentID'], req.query['orderID'],req.query['productID'],res.query['quantityOrdered']];
        } else {
            sql = sqlWithoutId;
            inserts =[req.query['contentID'], req.query['orderID'],req.query['productID'],res.query['quantityOrdered']];
        }

        db.pool.query(sql, inserts, function(error, results, fields) {
            if(error) {
                res.write(JSON.stringify(error));
                res.end();
            } else {
                getAndRenderorderContents(req, res);
            }
        });
    } else if (req.query["crud"] && req.query.crud == 'delete') {
        // Delete using cid as the identifier
        let sql = `Delete From OrderContents Where contentID = ${req.query.cid};`
        console.log(sql)
        db.pool.query(sql)
        getAndRenderorderContents(req, res);
    } else {
        getAndRenderorderContents(req, res);
    }
})
/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});