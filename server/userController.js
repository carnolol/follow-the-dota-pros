const bcrypt = require('bcryptjs')

module.exports = {
    login: async (req, res) => {
        const db = req.app.get('db')
        const {username, password} = req.body
        const existingUser = await db.check_if_user([username])
        if(!existingUser[0]){
            res.status(404).send('Username does not exist')
        }
        const authenticated = bcrypt.compareSync(password, existingUser[0])
        if(authenticated){
            delete existingUser[0].password
            req.session.user = existingUser[0]
            res.status(200).send(req.session.user)
        } else {
            res.status(403).send('Username or Password is incorrect')
        }
    },
    register: async (req, res) => {
        const db = req.app.get('db')
        const {username, password} = req.body
        const existingUser = await db.check_if_user([username])
        if(existingUser[0]){
            return res.status(409).send('That Username is Taken')
        }
        const salt = bcrypt.genSaltSync(9)
        const hash = bcrypt.hashSync(password, salt)
        // const profile_pic = 
        const newUser = await db.register_new_user([username, hash])
        req.session.user = newUser[0]
        res.status(200).send(req.session.user)
    },
    logout: async (req, res) => {
        req.session.destroy()
        res.sendStatus(200)
    },
    getLoggedInUser: async (req, res) => {
        if(req.session.user){
            res.status(200).send(req.session.user)
        } else {
            res.sendStatus(404)
        }
    },

    getUsersProPlayers: async (req, res) => {
        const db = req.app.get('db')
    }
}