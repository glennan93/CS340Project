// this file was adapted from cs340's node starter app git repo  ./database/db-connector.js

// Get an instance of mysql we can use in the app
var mysql = require('mysql')

// Create a 'connection pool' using the provided credentials
var pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'classmysql.engr.oregonstate.edu',
    user            : 'cs340_<onid_username>',
    password        : '<onide_password>',
    database        : 'cs340_<onid_username>'
})

// Export it for use in our applicaiton
module.exports.pool = pool;