UPDATE dota_users
SET bio = $1
WHERE dota_users_id = $2
returning *;