INSERT INTO dota_posts
(author_id, title, content, created_at)
VALUES
($1, $2, $3, now())