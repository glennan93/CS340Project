--
-- 	Disable commits and foreign key checks
--

SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

--
-- Creating table for Users entity
--

CREATE OR REPLACE TABLE `Users` (
  `user_id` INT AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `username` VARCHAR(45) NOT NULL,
  `about` VARCHAR(255) NULL,
  `interests` VARCHAR(45) NULL,
  `location` VARCHAR(45) NULL,
  `user_since` DATETIME DEFAULT NOW(),
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `user_id_UNIQUE` (`user_id` ASC) VISIBLE)
  Engine = InnoDB;


--
-- Create Hashtags entity
--

CREATE OR REPLACE TABLE `Hashtags` (
  `hashtag_id` INT AUTO_INCREMENT,
  `description` VARCHAR(255) NOT NULL,
  `frequency` INT NOT NULL,
  PRIMARY KEY (`hashtag_id`),
  UNIQUE INDEX `hashtag_id_UNIQUE` (`hashtag_id` ASC) VISIBLE)
ENGINE = InnoDB;

--
--Creating Posts entity
--

CREATE OR REPLACE TABLE `Posts` (
  `post_id` INT AUTO_INCREMENT,
  `author` INT NOT NULL,
  `contents` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`post_id`),
  UNIQUE INDEX `post_id_UNIQUE` (`post_id` ASC) VISIBLE,
  INDEX `author_idx` (`author` ASC) VISIBLE,
  CONSTRAINT `author`
    FOREIGN KEY (`author`)
    REFERENCES `Users` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
  ENGINE = InnoDB;

--
--Create Comments entity
--

CREATE OR REPLACE TABLE `Comments` (
  `comment_id` INT AUTO_INCREMENT,
  `contents` VARCHAR(255) NOT NULL,
  `parent_post` INT NOT NULL,
  `commenter` INT NOT NULL,
  PRIMARY KEY (`comment_id`),
  UNIQUE INDEX `comment_id_UNIQUE` (`comment_id` ASC) VISIBLE,
  INDEX `parent_post_UNIQUE` (`parent_post` ASC) VISIBLE,
  INDEX `commenter_UNIQUE` (`commenter` ASC) VISIBLE,
  CONSTRAINT `parent_post`
    FOREIGN KEY (`parent_post`)
    REFERENCES `Posts` (`post_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `commenter`
    FOREIGN KEY (`commenter`)
    REFERENCES `Users` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

--
-- Create Posts_Hashtags intersection table
--

CREATE OR REPLACE TABLE `Posts_Hashtags` (
  `post_hash_id` INT AUTO_INCREMENT,
  `hashtag_id` INT,
  `post_id` INT,
  `added_date` DATETIME DEFAULT NOW(),
  PRIMARY KEY (`post_hash_id`),
  UNIQUE INDEX `post_hash_id_UNIQUE` (`post_hash_id` ASC) VISIBLE,
  UNIQUE INDEX `hashtag_id_UNIQUE` (`hashtag_id` ASC) VISIBLE,
  UNIQUE INDEX `post_id_UNIQUE` (`post_id` ASC) VISIBLE,
  CONSTRAINT `hashtag`
    FOREIGN KEY (`hashtag_id`)
    REFERENCES `Hashtags` (`hashtag_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `post_id`
    FOREIGN KEY (`post_id`)
    REFERENCES `Posts` (`post_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

--
-- Data inserts for Posts_Hashtags
--

INSERT INTO `Posts_Hashtags` (`hashtag_id`, `post_id`) VALUES (4, 1);
INSERT INTO `Posts_Hashtags` (`hashtag_id`, `post_id`) VALUES (2, 2);
INSERT INTO `Posts_Hashtags` (`hashtag_id`, `post_id`) VALUES (1, 3);

--
-- Data inserts for Users 
--

INSERT INTO `Users` (`user_id`, `name`, `email`, `password`, `username`, `about`, `interests`, `location`) VALUES (1, 'Andrew', 'andrew@andrew.com', 'andrew', 'UsrAndrew', 'Hi, I am Andrew!', 'Computer Science', 'United States');
INSERT INTO `Users` (`user_id`, `name`, `email`, `password`, `username`, `about`, `interests`, `location`) VALUES (2, 'David', 'david@david.com', 'david', 'UsrDavid', 'Hi, I am David!', 'Computer Science', 'Poland');
INSERT INTO `Users` (`user_id`, `name`, `email`, `password`, `username`, `about`, `interests`, `location`) VALUES (3, 'Betel', 'betel@betel.com', 'betel', 'UsrBetel', 'Hi, I am Betel!', 'Fetch', 'United States');
INSERT INTO `Users` (`user_id`, `name`, `email`, `password`, `username`, `about`, `interests`, `location`) VALUES (4, 'Pluto', 'pluto@pluto.com', 'pluto', 'UsrPluto', 'Hi, I am Pluto!', 'Catnip', 'United States');
INSERT INTO `Users` (`user_id`, `name`, `email`, `password`, `username`, `about`, `interests`, `location`) VALUES (5, 'Fluffy', 'fluffy@fluffy..com', 'fluffy', 'UsrFluffy', 'Hi, I am Fluffy!', 'Bugs', 'United States');

--
-- Data inserts for Posts
--

INSERT INTO `Posts` (`post_id`, `author`, `contents`) VALUES (1, 1, 'Hi! This is a test!');
INSERT INTO `Posts` (`post_id`, `author`, `contents`) VALUES (2, 4, 'Hi, this is a sample post!');
INSERT INTO `Posts` (`post_id`, `author`, `contents`) VALUES (3, 2, 'This is a sample post!');

--
-- Data insert for Comments
--

INSERT INTO `Comments` (`comment_id`, `contents`, `parent_post`, `commenter`) VALUES (1, 'This is a test comment.', 1, 1);
INSERT INTO `Comments` (`comment_id`, `contents`, `parent_post`, `commenter`) VALUES (2, 'Testing comments!', 2, 3);
INSERT INTO `Comments` (`comment_id`, `contents`, `parent_post`, `commenter`) VALUES (3, 'Hello, this is a test.', 3, 5);

--
-- Data insert for Hashtags
--

INSERT INTO `Hashtags` (`hashtag_id`, `description`, `frequency`) VALUES (1, 'outdoors', 1);
INSERT INTO `Hashtags` (`hashtag_id`, `description`, `frequency`) VALUES (2, 'pets', 1);
INSERT INTO `Hashtags` (`hashtag_id`, `description`, `frequency`) VALUES (3, 'computer science', 1);

--
--	Enable commits and foreign key checks again
--

SET FOREIGN_KEY_CHECKS=1;
COMMIT;



