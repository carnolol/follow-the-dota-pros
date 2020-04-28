SELECT * FROM dota_posts
JOIN dota_users ON dota_users.dota_users_id = dota_posts.author_id

-- i need to do more... find a way to only display posted based on the match id