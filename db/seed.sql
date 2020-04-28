


CREATE TABLE dota_posts (
dota_posts_id SERIAL PRIMARY KEY, 
content VARCHAR(1000),
title VARCHAR (100),
created_at date, 
author_id INT, 
FOREIGN KEY (author_id) REFERENCES dota_users(dota_users_id)
)

CREATE TABLE dota_users(
dota_users_id serial primary key,
username VARCHAR(50),
password VARCHAR(500),
bio VARCHAR(500),
age INT, 
profile_pic VARCHAR(2500)

)


CREATE TABLE pro_players(
pro_player_id SERIAL PRIMARY KEY, 
name VARCHAR(250),
picture TEXT, 
steam_account_id INT, 
dota_user INT,
FOREIGN KEY (dota_user) REFERENCES dota_users(dota_users_id)
)

-- CREATE TABLE pro_players_join(
-- pro_player_account_id INT REFERENCES pro_players(pro_player_id),
-- dota_users_account_id INT REFERENCES dota_users(dota_users_id)
-- )

-- INSERT INTO pro_players
-- (name, picture, steam_account_id)
-- VALUES
-- ('Puppey', 'https://game-tournaments.com/media/logo/p78.png', 87278757),
-- ('MATUMBAMAN','https://glamourbiz.com/images/introimg/matumbaman-dota-2-net-worth-earnings-heroes-bio.jpg', 72312627),
-- ('Nisha', 'https://game-tournaments.com/media/logo/p3672.png', 121769650)

-- INSERT INTO dota_posts
-- (author_id, title, content, created_at)
-- VALUES
-- (2, 'MIKES TEST POST', 'TEST CONTENT', now()),
-- (1, 'scotts test post', 'some testing content', now()),
-- (1, 'SCOTTS TEST POST TITLE', 'MORE TESTING CONTENT', now()),
-- (3, 'codys test post', 'some test content stuff', now()),
-- (3, 'CODYS FINAL POST', 'EVEN MORE CONTENT', now());