-- This file is original to our group
-- Selecting all posts with the user that posted them and the posts' contents
SELECT Posts.post_id AS Post, Users.name AS author, Posts.contents
FROM Posts
JOIN Users
ON Posts.author = Users.user_id;

-- Selecting all comments on a given post
SELECT Comments.contents
FROM Comments
WHERE Comments.parent_post = :post_id; 

-- Selecting all hashtags on a given post
SELECT Hashtags.description
FROM Hashtags
INNER JOIN Posts_Hashtags ON Posts_Hashtags.hashtag_id = Hashtags.hashtag_id
WHERE Posts_Hashtags.post_id = Posts.post_id;

-- Selecting all users in the database
-- Displays user_id, name, and username
SELECT user_id, name, username
FROM Users;

-- Add a new user
-- Auto increment the user id by finding the amount of users and adding one to it when inserting
INSERT INTO Users (user_id, name, email, password, username, about, interests, location)
-- Example data for testing: VALUES (6, 'Jeffrey', 'jeffrey@gmail.com', 'password123', 'jeff_rey', 'Likes sports', 'Sports, Football', 'USA');
VALUES (:user_id, :name, :email, :password, :username, :about, :interests, :location);

-- Add a new post with comments and hashtags
-- Auto increment post by finding amount of posts and adding one
INSERT INTO Posts (post_id, author, contents)
-- Example data for testing: VALUES (4, 6, 'This is a new post');
VALUES (:post_id, :author, :contents);

-- Add a new comment
-- Auto increment comment by finding amount of comments and adding one
INSERT INTO Comments (comment_id, contents, parent_post, commenter)
-- Example data for testing: VALUES (4, 'AMAZING!', 4, 6);
VALUES (:comment_id, :contents, :parent_post, :commenter);

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

-- Edit a post's content
UPDATE Posts SET contents = :contentsInput
WHERE post_id = :post_id_selected_from_post_edit_page;

-- Edit a comment's content
UPDATE Comments SET contents = :contentsInput
WHERE comment_id = :comment_id_selected_from_comment_edit_page;

-- Edit a hashtag
UPDATE Hashtags SET description = :descriptionInput
WHERE hashtag_id = :hashtag_id_from_table;

--Intersection Table Update for dis-association
DELETE FROM Posts_Hashtags WHERE post_id = :post_id_selected_from_posts_page
AND hashtag_id = :hashtag_id_from_input;

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
DELETE FROM Hashtags WHERE hashtag_id = :hashtag_id_from_hashtag_input;






