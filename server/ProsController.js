module.exports = {
    getProPlayers: async (req, res) => {
        const db = req.app.get('db')
        const pros = await db.get_pro_players()
        res.status(200).send(pros)
    }
}