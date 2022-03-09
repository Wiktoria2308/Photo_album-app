CREATE DATABASE Photo_album;
USE Photo_album;

DROP TABLE IF EXISTS Users;
CREATE TABLE Users (
	id INTEGER NOT NULL AUTO_INCREMENT,
    password varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    first_name varchar(255) NOT NULL,
    last_name varchar(255) NOT NULL,
    PRIMARY KEY(id)
);

-- 1:n one to many relation, 1 album belongs to 1 user
DROP TABLE IF EXISTS Albums;
CREATE TABLE Albums (
    id INTEGER NOT NULL AUTO_INCREMENT, 
    title VARCHAR(255) NOT NULL,
    userId INTEGER,
    PRIMARY KEY(id),
    FOREIGN KEY(userId) REFERENCES Users(id)
);

-- 1:n one to many relation, 1 photo belongs to 1 user
DROP TABLE IF EXISTS Photos;
CREATE TABLE Photos (
	id INTEGER NOT NULL AUTO_INCREMENT, 
    title VARCHAR(255) NOT NULL,
    url VARCHAR(255) NOT NULL,
    comment VARCHAR(255) DEFAULT NULL,
    userId INTEGER,
    PRIMARY KEY(id),
    FOREIGN KEY(userId) REFERENCES Users(id)
);


-- n:n many to many relation
DROP TABLE IF EXISTS Albums_Photos;
CREATE TABLE Albums_Photos (
    id INTEGER NOT NULL AUTO_INCREMENT,
    album_id INTEGER NOT NULL,
    photo_id INTEGER NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(album_id) REFERENCES Albums(id),
    FOREIGN KEY(photo_id) REFERENCES Photos(id)
);

-- 1 album belongs to 1 user 
-- 1 user can have many albums

-- 1 photo belongs to 1 user
-- 1 user can have many photos

-- 1 album can have many photos
-- 1 photo can be in many albums