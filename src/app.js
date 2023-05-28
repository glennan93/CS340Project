//This file was adapted from CS340's nodejs starter app repo.


// App.js
/*
    SETUP
*/
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
PORT        = 6523;                 // Set a port number at the top so it's easy to change in the future
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.
var helpers = require('handlebars-helpers')();

// Database
var db = require('./database/db-connector')
/*
    ROUTES
*/
// app.js
app.get('/index', function(req, res)
    {
        res.render('index');                    // Note the call to render() and not send(). Using render() ensures the templating engine
    });                                         // will process this file, before sending the finished HTML to the client.

app.get('/comments', function(req, res)
    {
        res.render('comments');                    // Note the call to render() and not send(). Using render() ensures the templating engine
    });

app.get('/edit-comment', function(req, res)
    {
        res.render('edit-comment');                    // Note the call to render() and not send(). Using render() ensures the templating engine
    });

app.get('/edit-hashtag', function(req, res)
    {
        res.render('edit-hashtag');                    // Note the call to render() and not send(). Using render() ensures the templating engine
    });

app.get('/edit-user', function(req, res)
    {
        res.render('edit-user');                    // Note the call to render() and not send(). Using render() ensures the templating engine
    });

app.get('/hashtags', function(req, res)
    {
        res.render('hashtags');                         // Note the call to render() and not send(). Using render() ensures the templating engine
    });

app.get('/post-details', function(req, res)
    {
        res.render('post-details');                    // Note the call to render() and not send(). Using render() ensures the templating engine
    });

app.get('/users', function(req, res)
    {
        //query db on page load
        let query1 = "SELECT * FROM Users;";
        
        //execute the query
        db.pool.query(query1, function(error, rows, fields){
            res.render('users', {data:rows});           // Note the call to render() and not send(). Using render() ensures the templating engine
        })
                            
    });

app.get('/posts', function(req, res)
    {
        //query db on page load
        let query1 = "SELECT Posts.post_id, Users.name, Posts.contents FROM Posts Inner Join Users ON Posts.author = Users.user_id;";    //define query for posts page
        console.log(query1);
        db.pool.query(query1, function(error, rows, fields){    //Execute the query

            res.render('posts', {data:rows});   // Render the posts.hbs file, and also send the renderer
                                                // an object where 'data' is equal to the 'rows' we 
                                                // received back from the query
        })
    });

app.get('/edit-post', function(req, res) {
    let postID = parseInt(req.query.id); // Retrieve the post ID from the query parameter
    
    // fetch the posts data with author names
    let queryPosts = "SELECT Posts.post_id, Users.name, Posts.contents FROM Posts INNER JOIN Users ON Posts.author = Users.user_id;";
    
    //  fetch all registered users
    let queryUsers = "SELECT * FROM Users;";
    
    // Execute the first query to fetch posts data
    db.pool.query(queryPosts, function(error, postRows, fields) {
        if (error) {
        console.log(error);
        res.sendStatus(400);
        return;
        }
    
        // Execute the second query to fetch users data
        db.pool.query(queryUsers, function(error, userRows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
            return;
        }
    
        // Find the selected post based on the post ID
        let selectedPost = postRows.find(post => post.post_id === postID);
        if (!selectedPost) {
            // If the selected post is not found, handle the error accordingly
            res.sendStatus(404);
            return;
        }
    
        // Render the edit-post template with data
        res.render('edit-post', {
            data: postRows, // Pass posts data 
            users: userRows, // Pass users data 
            postID: postID, // Pass the post ID
            selectedContents: selectedPost.contents // Pass the selected post's contents
            });
        });
    });
});
      

app.post('/add-user-ajax', function(req, res) 
{   //add user function adapted from node.js starter guide for CS340

    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Users (name, email, password, username, about, interests, location) VALUES ('${data.name}', '${data.email}', '${data.password}', '${data.username}', '${data.about}', '${data.interests}', '${data.location}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on Users
            query2 = `SELECT * FROM Users;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});


app.post('/add-post-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Get user ID
    let getUserQuery = `SELECT user_id FROM Users WHERE name = '${data['postAuthor']}'`;

    // Run query
    db.pool.query(getUserQuery, function(error, rows, fields){
        if (error) {
            window.alert('User not found.');
            res.sendStatus(400);
        } else {
            if (rows.length > 0){
                // Get user ID from query result
                let userId = rows[0].user_id;

                // Capture NULL values
                let hashtags = parseInt(data['postHashtags']);
                if (isNaN(hashtags))
                {
                    hashtags = 'NULL'
                }
                // Create the query and run it on the database
                query1 = `INSERT INTO Posts (author, contents) VALUES (${userId}, '${data['postContent']}')`;
                db.pool.query(query1, function(error, rows, fields){

                    // Check to see if there was an error
                    if (error) {

                        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                        console.log(error)
                        res.sendStatus(400);
                    }

                    // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
                    // presents it on the screen
                    else
                    {
                        res.redirect('/posts');
                    }
                });

            } else {
                window.alert('User not found.');
                res.sendStatus(400);
            }
        }
    });
});

app.delete('/delete-post-ajax/', function(req,res,next){
    let data = req.body;
    let postID = parseInt(data.id);
    let deletePosts_Hashtags = `DELETE FROM Posts_Hashtags WHERE post_id = ?`;
    let deletePost= `DELETE FROM Posts WHERE post_id = ?`;
  
  
          // Run the 1st query
          db.pool.query(deletePosts_Hashtags, [postID], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
  
              else
              {
                  // Run the second query
                  db.pool.query(deletePost, [postID], function(error, rows, fields) {
  
                      if (error) {
                          console.log(error);
                          res.sendStatus(400);
                      } else {
                          res.sendStatus(204);
                      }
                  });
              };
  });
});

app.delete('/delete-user-ajax/', function(req,res,next){
    let data = req.body;
    let userID = parseInt(data.id);
    let deleteUser= `DELETE FROM Users WHERE user_id = ?`;
  
  
          // Run the 1st query
          db.pool.query(deleteUser, [userID], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
  
              else
              {
                  res.sendStatus(204);
              };
  });
});

  app.put('/put-post-ajax', function (req, res, next) {
    let data = {
        postAuthor: parseInt(req.body.postAuthor),
        postContent: req.body.postContent
    };

    let queryUpdatePost = `UPDATE Posts SET author = ?, contents = ? WHERE post_id = ?`;
    let selectPosts = `SELECT * FROM Posts;`;

    // Run the 1st query
    db.pool.query(queryUpdatePost, [data.postAuthor, data.postContent, req.query.id], function (error, rows, fields) {
        if (error) {
            // Log the error 
            console.log("Update Error:", error);
            res.sendStatus(400);
        } else {
            // Run the second query
            db.pool.query(selectPosts, function (error, rows, fields) {
                if (error) {
                    // Log the error 
                    console.log("Select Error:", error);
                    res.sendStatus(400);
                } else {
                    res.send(rows);
                }
            });
        }
    });
});



/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});