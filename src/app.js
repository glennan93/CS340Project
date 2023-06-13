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

app.get('/edit-comment', function(req, res)
    {
        let commentID = parseInt(req.query.id); // Retrieve the post ID from the query parameter

        let loadComments = "SELECT * FROM Comments;";

        let queryComment = "SELECT * FROM Comments WHERE comment_id = ?;";

        // Execute the first query to fetch posts data
        db.pool.query(loadComments, function(error, commentsRows, fields) {
            if (error) {
            console.log(error);
            res.sendStatus(400);
            return;
            }
        
            // Execute the second query to fetch users data
            db.pool.query(queryComment, commentID, function(error, commentRows, fields) {
            if (error) {
                console.log(error);
                res.sendStatus(400);
                return;
            }
        
            // Find the selected post based on the post ID
            let selectedComment = commentRows.find(comment => comment.comment_id === commentID);
            if (!selectedComment) {
                // If the selected post is not found, handle the error accordingly
                res.sendStatus(404);
                return;
            }
        
            // Render the edit-post template with data
            res.render('edit-comment', {
                data: commentsRows, // Pass users data 
                commments: commentRows, // Pass user data 
                commentID: commentID, // Pass the user ID
                selectedComment: selectedComment // Pass the selected post's contents
                });
            });
        })
        console.log(req.body)                   // Note the call to render() and not send(). Using render() ensures the templating engine
    });

    app.get('/edit-posts-hashtags', function(req, res) {

        let postHashID = parseInt(req.query.id);

        let postHashTable = `SELECT * FROM Posts_Hashtags;`;

        let query1 = `SELECT hashtag_id FROM Hashtags`;


        db.pool.query(postHashTable, function(error, rows, fields){

            let postHashTable = rows;

            db.pool.query(query1, postHashID, function(error, rows, fields){
                
                let hashID = rows;

                res.render('edit-posts-hashtags', {postHashTable: postHashTable, hashID: hashID});

            })
                
        });
      });
      

    app.get('/edit-hashtag', function(req, res) {
        let hashtagID = parseInt(req.query.id); // Retrieve the hashtag ID from the query parameter
      
        let loadHashtags = "SELECT * FROM Hashtags;";
        let queryHashtag = "SELECT * FROM Hashtags WHERE hashtag_id = ?;";
      
        // Execute the first query to fetch hashtags data
        db.pool.query(loadHashtags, function(error, hashtagsRows, fields) {
          if (error) {
            console.log(error);
            res.sendStatus(400);
            return;
          }
      
          // Execute the second query to fetch the selected hashtag data
          db.pool.query(queryHashtag, hashtagID, function(error, selectedHashtagRows, fields) {
            if (error) {
              console.log(error);
              res.sendStatus(400);
              return;
            }
      
            // Find the selected hashtag based on the hashtag ID
            let selectedHashtag = selectedHashtagRows.find(hashtag => hashtag.hashtag_id === hashtagID);
            if (!selectedHashtag) {
              // If the selected hashtag is not found, handle the error accordingly
              res.sendStatus(404);
              return;
            }
      
            // Render the edit-hashtag template with data
            res.render('edit-hashtag', {
              data: hashtagsRows, // Pass hashtags data
              hashtagID: hashtagID, // Pass the hashtag ID
              selectedHashtag: selectedHashtag // Pass the selected hashtag's contents
            });
          });
        });
      });
      

app.get('/edit-user', function(req, res)
    {
        let userID = parseInt(req.query.id); // Retrieve the post ID from the query parameter

        let loadUsers = "SELECT * FROM Users;";

        let queryUser = "SELECT * FROM Users WHERE user_id = ?;";

        // Execute the first query to fetch posts data
        db.pool.query(loadUsers, function(error, usersRows, fields) {
            if (error) {
            console.log(error);
            res.sendStatus(400);
            return;
            }
        
            // Execute the second query to fetch users data
            db.pool.query(queryUser, userID,function(error, userRows, fields) {
            if (error) {
                console.log(error);
                res.sendStatus(400);
                return;
            }
        
            // Find the selected post based on the post ID
            let selectedUser = userRows.find(user => user.user_id === userID);
            if (!selectedUser) {
                // If the selected post is not found, handle the error accordingly
                res.sendStatus(404);
                return;
            }
        
            // Render the edit-post template with data
            res.render('edit-user', {
                data: usersRows, // Pass users data 
                users: userRows, // Pass user data 
                userID: userID, // Pass the user ID
                selectedUser: selectedUser // Pass the selected post's contents
                });
            });
        })
        console.log(req.body)
    });
app.get('/posts_hashtags', function(req, res)
{
    //query db on page load
    let query1 = "SELECT * FROM Posts_Hashtags;";
    let query2 = "SELECT hashtag_id FROM Hashtags;";
    let query3 = "SELECT post_id FROM Posts;";
    
     //execute the query
     db.pool.query(query1, function(error, rows, fields){
        // Saving comments
        let table = rows
        db.pool.query(query2, (error, rows, fields) => {
            let hashtags = rows;

            db.pool.query(query3, (error, rows, fields) => {
                let postIds = rows;
                return res.render('posts_hashtags', {table: table, hashtags: hashtags, postIds: postIds})
                })
            })
        });
    });

app.get('/hashtags', function(req, res)
    {
        //query db on page load
        let query1 = "SELECT * FROM Hashtags;";
        
        //execute query
        db.pool.query(query1, function(error, rows, fields){
            res.render('hashtags', {data:rows});
        })
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

app.get('/comments', function(req, res)
    {
        //query db on page load
        let query1 = "SELECT Comments.comment_id, Users.name, Comments.contents, Comments.parent_post FROM Comments JOIN Users ON Comments.commenter = Users.user_id;"

        let query2 = "SELECT name FROM Users;";

        let query3 = "SELECT post_id FROM Posts;";
        //execute the query
        db.pool.query(query1, function(error, rows, fields){
            // Saving comments
            let comments = rows;

            db.pool.query(query2, (error, rows, fields) => {
                let userNames = rows;

                db.pool.query(query3, (error, rows, fields) => {
                    let postIds = rows;
                    return res.render('comments', {data: comments, userNames: userNames, postIds: postIds})
                })
            })
             // Note the call to render() and not send(). Using render() ensures the templating engine
        })
                            
    });

app.get('/posts', function(req, res)
    {
        //query db on page load
        let query1 = `SELECT p.post_id, u.name AS author_name, p.contents AS post_contents, h.description AS hashtag_description FROM Posts p INNER JOIN Users u ON p.author = u.user_id LEFT JOIN Posts_Hashtags ph ON p.post_id = ph.post_id LEFT JOIN Hashtags h ON ph.hashtag_id = h.hashtag_id;`;
    
        console.log(query1);

        let query2 = "SELECT name FROM Users;";

        let query3 = "SELECT hashtag_id, description FROM Hashtags;";

        db.pool.query(query1, function(error, rows, fields){    //Execute the query
            // Saving the posts
            let posts = rows;
            
            db.pool.query(query2, (error, rows, fields) => {

                let userNames = rows;

                db.pool.query(query3, (error, rows, fields) => {

                    let hashtag = rows;
                    return res.render('posts', {data: posts, userNames: userNames, hashtag: hashtag});
                })
            })
    });
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

app.post('/add-post-hashtag-ajax', function(req, res) 
{   //add user function adapted from node.js starter guide for CS340

    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Posts_Hashtags (hashtag_id, post_id) VALUES ('${data.hashtag}', '${data.post}')`;
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
            query2 = `SELECT * FROM Posts_Hashtags;`;
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

app.post('/add-hashtag-ajax', function(req, res) 
{   //add user function adapted from node.js starter guide for CS340

    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Hashtags (description) VALUES ('${data.name}')`;
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
            query2 = `SELECT * FROM Hashtags;`;
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

app.post('/add-post-form', function(req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Get user ID
    let getUserQuery = `SELECT user_id FROM Users WHERE name = ?`;

    // Run query
    db.pool.query(getUserQuery, [data['postAuthor']], function(error, rows, fields) {
        if (error) {
            console.error(error);
            return res.status(500).send('Internal Server Error');
        } else {
            if (rows.length > 0) {
                // Get user ID from query result
                let userId = rows[0].user_id;

                // Create the query and run it on the database
                let query1 = `INSERT INTO Posts (author, contents) VALUES (?, ?)`;
                let query2 = `INSERT INTO Posts_Hashtags (hashtag_id, post_id) VALUES (?, ?)`;
                db.pool.query(query1, [userId, data['postContent']], function(error, rows, fields) {
                    if (error) {
                        console.error(error);
                        return res.status(500).send('Internal Server Error');
                    }

                    let postId = rows.insertId; // Get the newly inserted post ID
                    let hashtagIds = data['hashtagId']; // Get the selected hashtag IDs from the form as an array

                    if (typeof hashtagIds === 'string') {
                        hashtagIds = [hashtagIds]; // Convert to an array if only one checkbox is selected
                    }

                    // Iterate over the selected hashtag IDs and insert them into the Posts_Hashtags table
                    hashtagIds.forEach(function(hashtagId) {
                        db.pool.query(query2, [hashtagId, postId], function(error, rows, fields) {
                            if (error) {
                                console.error(error);
                                return res.status(500).send('Internal Server Error');
                            }
                        });
                    });

                    res.redirect('/posts');
                });

            } else {
                return res.status(400).send('User not found.');
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

app.delete('/delete-post-hashtag-ajax/', function(req,res,next){
    let data = req.body;
    let post_hashID = parseInt(data.id);
    let deletePostHash = `DELETE FROM Posts_Hashtags WHERE post_hash_id = ?`;
  
  
          // Run the 1st query
          db.pool.query(deletePostHash, [post_hashID], function(error, rows, fields){
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

app.delete('/delete-hashtag-ajax/', function(req,res,next){
    let data = req.body;
    let hashtagID = parseInt(data.id);
    let deleteHashtag= `DELETE FROM Hashtags WHERE hashtag_id = ?`;
  
  
          // Run the 1st query
          db.pool.query(deleteHashtag, [hashtagID], function(error, rows, fields){
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

app.delete('/delete-comment-ajax/', function(req,res,next){
    let data = req.body;
    let commentID = parseInt(data.id);
    let deleteComment= `DELETE FROM Comments WHERE comment_id = ?`;
  
  
          // Run the 1st query
          db.pool.query(deleteComment, [commentID], function(error, rows, fields){
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

app.put('/put-user-ajax', function(req,res,next){
    let data = req.body;
    let userID = req.query.id;
    
    console.log('Received userID: ', userID);

    let name = data.name;
    let email = data.email;
    let password = data.password;
    let username = data.username;
    let about = data.about;
    let interests = data.interests;
    let location = data.location;
  
    let queryUpdateUser = `UPDATE Users SET name = ?, email = ?, password = ?, username = ?, about = ?, interests = ?, location = ? WHERE Users.user_id = ?`;
    let selectUsers = `SELECT * FROM Users`;
  
          // Run the 1st query
          db.pool.query(queryUpdateUser, [name, email, password, username, about, interests, location, userID], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
  
              // If there was no error, we run our second query and return that data so we can use it to update the people's
              // table on the front-end
              else
              {
                  // Run the second query
                  db.pool.query(selectUsers, function(error, rows, fields) {
  
                      if (error) {
                          console.log(error);
                          res.sendStatus(400);
                      } else {
                          res.send(rows);
                      }
                  })
              }
  })
});

app.put('/put-comment-ajax', function(req,res,next){
    let data = req.body;
    let commentID = req.query.id;
    
    console.log('Received commentID: ', commentID);

    let contents = data.contents;
  
    let queryUpdateComment = `UPDATE Comments SET contents = ? WHERE Comments.comment_id = ?;`;
    let selectComments = `SELECT * FROM Comments;`;
  
          // Run the 1st query
          db.pool.query(queryUpdateComment, [contents, commentID], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
  
              // If there was no error, we run our second query and return that data so we can use it to update the people's
              // table on the front-end
              else
              {
                  // Run the second query
                  db.pool.query(selectComments, function(error, rows, fields) {
  
                      if (error) {
                          console.log(error);
                          res.sendStatus(400);
                      } else {
                          res.send(rows);
                      }
                  })
              }
  })
});

app.put('/put-postHashtag-ajax', function(req,res,next){
    let data = req.body;
    let postHashtagID = req.query.id;
    
    console.log('Received postHashtagID: ', postHashtagID);

  
    let queryUpdateHashtag = `UPDATE Posts_Hashtags SET hashtag_id = ? WHERE Posts_Hashtags.post_hash_id = ?;`;
    let selectPostsHashtags = `SELECT * FROM Posts_Hashtags;`;
  
          // Run the 1st query
          db.pool.query(queryUpdateHashtag, [data.hashtag, postHashtagID], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
  
              // If there was no error, we run our second query and return that data so we can use it to update the people's
              // table on the front-end
              else
              {
                  // Run the second query
                  db.pool.query(selectPostsHashtags, function(error, rows, fields) {
  
                      if (error) {
                          console.log(error);
                          res.sendStatus(400);
                      } else {
                          res.send(rows);
                      }
                  })
              }
  })
});

app.put('/put-hashtag-ajax', function(req,res,next){
    let data = req.body;
    let hashtagID = req.query.id;
    
    console.log('Received hashtagID: ', hashtagID);

    let description = data.name;
  
    let queryUpdateHashtag = `UPDATE Hashtags SET description = ? WHERE Hashtags.hashtag_id = ?;`;
    let selectHashtags = `SELECT * FROM Hashtags;`;
  
          // Run the 1st query
          db.pool.query(queryUpdateHashtag, [description, hashtagID], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
  
              // If there was no error, we run our second query and return that data so we can use it to update the people's
              // table on the front-end
              else
              {
                  // Run the second query
                  db.pool.query(selectHashtags, function(error, rows, fields) {
  
                      if (error) {
                          console.log(error);
                          res.sendStatus(400);
                      } else {
                          res.send(rows);
                      }
                  })
              }
  })
});

app.post('/add-comment-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Get user ID
    let getUserQuery = `SELECT user_id FROM Users WHERE name = '${data['commentAuthor']}'`;
    let getPostQuery = `SELECT post_id FROM Posts WHERE post_id = '${data['parentPost']}'`;

    // Checking if the user exists in the database
    db.pool.query(getUserQuery, function(error, rows, fields){
        if (error) {
            window.alert('User not found.');
            res.sendStatus(400);
        } else {
            if (rows.length > 0){
                // Get user ID from query result
                let userId = rows[0].user_id;
                
                db.pool.query(getPostQuery, function(error, rows, fields){
                    if (error) {
                        window.alert('Post not found.');
                        res.sendStatus(400);
                    } else {
                        if (rows.length > 0){
                            query1 = `INSERT INTO Comments (contents, parent_post, commenter) VALUES ('${data['commentContent']}', '${data['parentPost']}', ${userId})`;
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
                                    res.redirect('/comments');
                                }
                            });

                        } else {
                            window.alert('Post not found.');
                            res.sendStatus(400);
                        }
                    }
                });
            

            

            } else {
                window.alert('User not found.');
                res.sendStatus(400);
            }
        }
    });

    // Checking if the post exists in the database
    db.pool.query(getPostQuery, function(error, rows, fields){
        console.log("POST");
        if (error) {
            window.alert('Post not found.');
            res.sendStatus(400);
        } else {
            if (rows.length > 0){
                foundPost = true
            } else {
                window.alert('Post not found.');
                res.sendStatus(400);
            }
        }
    });
});


/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
