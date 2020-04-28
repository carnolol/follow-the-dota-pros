SELECT * FROM dota_posts
JOIN dota_users ON dota_users.dota_users_id = dota_posts.author_id
WHERE dota_posts_id = $1