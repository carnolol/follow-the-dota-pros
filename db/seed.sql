


CREATE TABLE dota_posts (
dota_posts_id SERIAL PRIMARY KEY, 
content VARCHAR(1000),
title VARCHAR (100),
created_at date, 
author_id INT, 
match_id BIGINT,
FOREIGN KEY (author_id) REFERENCES dota_users(dota_users_id)
)

CREAT TABLE dota_friends(
    id serial primary key, 
    name varchar(250), 
    picture text,
    steam_account_id int,
    dota_users_account_id REFERENCES dota_users(dota_users_id)
)

CREATE TABLE dota_users(
dota_users_id serial primary key,
username VARCHAR(50),
password VARCHAR(500),
bio VARCHAR(500),
age INT, 
email VARCHAR(250),
profile_pic VARCHAR(2500)

)


CREATE TABLE pro_players(
pro_player_id SERIAL PRIMARY KEY, 
name VARCHAR(250),
picture TEXT, 
steam_account_id INT, 
winnings VARCHAR(150),
dota_user INT, 
FOREIGN KEY (dota_user) REFERENCES dota_users(dota_users_id)
)

CREATE TABLE pro_players_join(
id SERIAL PRIMARY KEY,
pro_player_account_id INT REFERENCES pro_players(pro_player_id),
dota_users_account_id INT REFERENCES dota_users(dota_users_id)
)
