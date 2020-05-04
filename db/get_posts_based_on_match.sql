SELECT dp.dota_posts_id, dp.content, dp.title, dp.created_at, dp.match_id, du.dota_users_id, du.username, du.profile_pic FROM dota_posts dp
JOIN dota_users du ON du.dota_users_id = dp.author_id
WHERE match_id = $1

-- i need to do more... find a way to only display posted based on the match id