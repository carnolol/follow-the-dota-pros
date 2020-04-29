INSERT INTO dota_users
(username, password, profile_pic, email)
VALUES
($1, $2, $3, $4)
returning dota_users_id, username, profile_pic, bio, age, email; 