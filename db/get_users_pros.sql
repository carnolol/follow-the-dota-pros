SELECT u.dota_users_id, u.username, p.pro_player_id, p.winnings, p.name, p.picture, p.steam_account_id FROM pro_players_join ppj 
join dota_users u on ppj.dota_users_account_id = u.dota_users_id
JOIN pro_players p on ppj.pro_player_account_id = p.pro_player_id
where u.dota_users_id = $1