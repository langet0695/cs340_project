// Get an instance of mysql we can use in the app
var mysql = require('mysql')

// Create a 'connection pool' using the provided credentials
var pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'classmysql.engr.oregonstate.edu',
    user            : 'cs340_langet',
    password        : '6157',
    database        : 'cs340_langet'
})

// Export it for use in our applicaiton
module.exports.pool = pool;