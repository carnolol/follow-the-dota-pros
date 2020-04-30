UPDATE dota_users
SET bio = $1,
age = $2
WHERE dota_users_id = $3
returning *;