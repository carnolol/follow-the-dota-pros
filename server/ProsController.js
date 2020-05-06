module.exports = {
    getProPlayers: async (req, res) => {
        const db = req.app.get('db')
        const {search} = req.query
        const pros = await db.get_pro_players()
     
            const filteredPros = pros.filter( pro => {
                    return pro.name.toLowerCase().includes(search)
            })
            if(filteredPros[0]){
                return res.status(200).send(filteredPros)
            }
        res.status(200).send(pros)
        //working
    },
    getUsersProPlayers: async (req, res) => {
        const db = req.app.get('db')
        const {user_id} = req.params
        const myPros = await db.get_users_pros([user_id])
        res.status(200).send(myPros)
        //WORKING
    },
    addProPlayer: async (req, res) => {
        const db = req.app.get('db')
        const {dota_users_id} = req.session.user
        const {pro_player_account_id} = req.params
        const usersPros = await db.add_pro([ pro_player_account_id, dota_users_id])
        res.status(200).send(usersPros)
        //WORKING 
    }, 
    deletePro: async (req, res) =>{
        const db = req.app.get('db')
        const {id} = req.params
        const deletedPro = await db.delete_pro([id])
        res.status(200).send(deletedPro)
        //WORKING
    }
}