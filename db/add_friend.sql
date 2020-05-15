INSERT INTO dota_friends
(name, picture, steam_account_id, dota_users_account_id)
VALUES
($1, $2, $3, $4)
returning *;