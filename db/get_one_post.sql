SELECT * FROM dota_posts dp
JOIN dota_users du ON du.dota_users_id = dp.author_id
WHERE dota_posts_id = $1