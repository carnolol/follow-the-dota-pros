module.exports = {
    getProPlayers: async (req, res) => {
        const db = req.app.get('db')
        const pros = await db.get_pro_players()
        // console.log(pros)
        res.status(200).send(pros)
    },
    getUsersProPlayers: async (req, res) => {
        const db = req.app.get('db')
        const {user_id} = req.params
        const myPros = await db.get_users_pros([user_id])
        res.status(200).send(myPros)
    },
    addProPlayer: async (req, res) => {
        const db = req.app.get('db')
        const {dota_users_account_id} = req.session.user.dota_users_id
        const {pro_player_account_id} = req.params
        const usersPros = await db.add_pro([dota_users_account_id, pro_player_account_id])
        console.log('DUACCID:', dota_users_account_id)
        res.status(200).send(usersPros)
    }
}