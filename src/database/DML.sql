-- This file is original to our group
-- Selecting all posts with the user that posted them and the posts' contents
SELECT Posts.post_id, Users.name, Posts.contents 
FROM Posts 
Inner Join Users 
ON Posts.author = Users.user_id;

-- Selecting all comments 
SELECT *
FROM Comments;

-- Selecting all hashtags
SELECT *
FROM Hashtags;

-- Selecting all users in the database
SELECT *
FROM Users;

-- Selecting the hashtag_id and the description from the Hashtags table
SELECT hashtag_id, description 
FROM Hashtags;

-- Selecting the user_id of user's given a certain name
SELECT user_id 
FROM Users 
WHERE name = :nameOfUser

-- Selecting all comments where the commenter is turned into the name of the user who commented
-- Gets the comment_id, the user's name, the comment's contents and the id of the comment's parent post
SELECT Comments.comment_id, Users.name, Comments.contents, Comments.parent_post 
FROM Comments 
JOIN Users 
ON Comments.commenter = Users.user_id;

-- Selecting all names from the Users table
SELECT name 
FROM Users;

-- Selecting all post_ids from the Posts table
SELECT post_id 
FROM Posts;

-- Selecting all posts by the id selected
SELECT post_id 
FROM Posts 
WHERE post_id = post_id_selected

-- Add a new user
-- Auto increment the user id by finding the amount of users and adding one to it when inserting
INSERT INTO Users (name, email, password, username, about, interests, location)
-- Example data for testing: VALUES (6, 'Jeffrey', 'jeffrey@gmail.com', 'password123', 'jeff_rey', 'Likes sports', 'Sports, Football', 'USA');
VALUES (:name, :email, :password, :username, :about, :interests, :location);

-- Add a new post with comments and hashtags
-- Auto increment post by finding amount of posts and adding one
INSERT INTO Posts (author, contents)
-- Example data for testing: VALUES (4, 6, 'This is a new post');
VALUES (:author, :contents);

-- Add a new comment
-- Auto increment comment by finding amount of comments and adding one
INSERT INTO Comments (contents, parent_post, commenter)
-- Example data for testing: VALUES (4, 'AMAZING!', 4, 6);
VALUES (:contents, :parent_post, :commenter);

-- Add a new hashtag
-- Auto increment hashtags by finding amount of hashtags and adding one
-- Frequency also needs to be incremented
--
-- This creates a hashtag but it isn't tied to any posts.
INSERT INTO Hashtags (hashtag_id, description, frequency)
VALUES (:hashtag_id, :description, :frequency);

-- Intersection Table Insertion
INSERT INTO Posts_Hashtags (hashtag_id, post_id)
VALUES (:hashtag_id_from_hashtag_input, :post_id_from_post_page);

-- Edit a user's info
UPDATE Users SET name = :nameInput, email = :emailInput, password = :passwordInput,
                        username = :usernameInput, about = :aboutInput, 
                        interests = :interestsInput, location = :locationInput 
WHERE user_id = :user_id_selected_from_user_page;

-- Test data: UPDATE Users 
-- SET name = 'David', email = 'newEmail@hotmail.com', password = 'password123',
--            username = 'davidg', about = 'Soccer player', interests = 'soccer, CS',
--            location = 'Europe'
--WHERE user_id = 2;

-- Edit a post's content and author
UPDATE Posts 
SET author = authorInput, contents = contentInput 
WHERE post_id = post_id_toBeEdited;

-- Edit a comment's content
UPDATE Comments SET contents = :contentsInput
WHERE comment_id = :comment_id_selected_from_comment_edit_page;

-- Edit a hashtag
UPDATE Hashtags SET description = :descriptionInput
WHERE hashtag_id = :hashtag_id_from_table;

--Intersection Table Update for dis-association
DELETE FROM Posts_Hashtags 
WHERE post_hash_id = post_hash_toBeDeleted

-- Deleting a hashtag when the post it belongs to is deleted
DELETE FROM Posts_Hashtags 
WHERE post_id = :post_id_ofDeletedPost

-- Delete a user
DELETE FROM Users 
--Test data: WHERE user_id = 4;
WHERE user_id = :user_id_selected_from_user_page; 

-- Delete a post
DELETE FROM Posts
-- Test data: WHERE post_id = 1;
WHERE post_id = :post_id_selected_from_posts_page;

-- Delete a comment
DELETE FROM Comments
WHERE comment_id = :comment_id_selected_from_post_page;

-- Delete a hashtag
DELETE FROM Hashtags 
WHERE hashtag_id = :hashtag_id_from_hashtag_input;






