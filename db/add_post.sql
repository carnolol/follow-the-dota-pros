INSERT INTO dota_posts
(author_id, title, content, created_at, match_id)
VALUES
($1, $2, $3, now(), $4)
returning *;

select * from dota_posts