// App.js

/*
    SETUP
*/
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
PORT        = 6523;                 // Set a port number at the top so it's easy to change in the future
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.


// Database
var db = require('./database/db-connector')
/*
    ROUTES
*/
// app.js 

// app.js

app.get('/', function(req, res)
    {
        let query1 = "SELECT Posts.post_id, Users.name, Posts.contents FROM Posts Inner Join Users ON Posts.author = Users.user_id;";    //define query for posts page

        db.pool.query(query1, function(error, rows, fields){    //Execute the query

            res.render('posts', {data:rows});   // Render the posts.hbs file, and also send the renderer
                                                // an object where 'data' is equal to the 'rows' we 
                                                // received back from the query
        })
    });

/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});