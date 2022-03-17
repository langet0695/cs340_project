// Get an instance of mysql we can use in the app
var mysql = require('mysql')

// Create a 'connection pool' using the provided credentials
var pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'INSERT_HOST',
    user            : 'INSERT_USER',
    password        : 'INSERT_PASSWORD',
    database        : 'INSERT_DB'
})

// Export it for use in our applicaiton
module.exports.pool = pool;
