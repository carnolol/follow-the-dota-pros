UPDATE dota_friends
SET name = $1,
picture = $2,
steam_account_id = $3
WHERE id = $4