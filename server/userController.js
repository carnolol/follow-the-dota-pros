const bcrypt = require('bcryptjs')
const pictures = [
    'https://api.opendota.com/apps/dota2/images/items/moon_shard_lg.png?t=1587186172645',
    'https://api.opendota.com/apps/dota2/images/items/hand_of_midas_lg.png?t=1587186172645',
    'https://api.opendota.com/apps/dota2/images/items/rapier_lg.png?t=1587186172645',
    'https://api.opendota.com/apps/dota2/images/items/dagon_5_lg.png?t=1587186172645',
    'https://api.opendota.com/apps/dota2/images/items/heart_lg.png?t=1587186172645',
    'https://api.opendota.com/apps/dota2/images/items/recipe_lg.png?t=1587186172645',
    'https://api.opendota.com/apps/dota2/images/items/tango_lg.png?t=1587186172645',
    'https://api.opendota.com/apps/dota2/images/items/branches_lg.png?t=1587186172645',
    'https://api.opendota.com/apps/dota2/images/items/travel_boots_lg.png?t=1587186172645',
    'https://api.opendota.com/apps/dota2/images/items/bloodthorn_lg.png?t=1587186172645',
    'https://api.opendota.com/apps/dota2/images/items/radiance_lg.png?t=1587186172645',
    'https://api.opendota.com/apps/dota2/images/items/invis_sword_lg.png?t=1587186172645',
    'https://api.opendota.com/apps/dota2/images/items/orchid_lg.png?t=1587186172645',
    'https://api.opendota.com/apps/dota2/images/items/desolator_lg.png?t=1587186172645',
    'https://api.opendota.com/apps/dota2/images/items/desolator_lg.png?t=1587186172645',
    'https://api.opendota.com/apps/dota2/images/items/sange_and_yasha_lg.png?t=1587186172645',
    'https://api.opendota.com/apps/dota2/images/items/skadi_lg.png?t=1587186172645',
    'https://api.opendota.com/apps/dota2/images/items/flask_lg.png?t=1587186172645',
    'https://api.opendota.com/apps/dota2/images/items/ultimate_scepter_lg.png?t=1587186172645',
    'https://api.opendota.com/apps/dota2/images/items/greater_crit_lg.png?t=1587186172645',
    'https://api.opendota.com/apps/dota2/images/items/basher_lg.png?t=1587186172645'
]

const random = Math.floor(Math.random() * pictures.length)
const randomPicture = pictures[random]

module.exports = {
    login: async (req, res) => {
        const db = req.app.get('db')
        const { username, password } = req.body
        const existingUser = await db.check_if_user([username])
        if (!existingUser[0]) {
            res.status(404).send('Username does not exist')
        }
        const authenticated = bcrypt.compareSync(password, existingUser[0].password)
        if (authenticated) {
            delete existingUser[0].password
            req.session.user = existingUser[0]
            res.status(200).send(req.session.user)
            console.log('login:', req.session.user)
        } else {
            res.status(403).send('Username or Password is incorrect')
        }
        //working
    },
    register: async (req, res) => {
        const db = req.app.get('db')
        const { username, password, email } = req.body
        const existingUser = await db.check_if_user([username])
        if (existingUser[0]) {
            return res.status(409).send('That Username is Taken')
        }
        const salt = bcrypt.genSaltSync(9)
        const hash = bcrypt.hashSync(password, salt)
        const profile_pic = randomPicture
        const newUser = await db.register_new_user([username, hash, profile_pic, email])

        req.session.user = newUser[0]
        res.status(200).send(req.session.user)
        // working
    },
    editUserInfo: async (req, res) => {
        const db = req.app.get('db')
        const { dota_users_id } = req.params
        const { bio } = req.body
        const editedUser = await db.edit_user([bio, dota_users_id])
        req.session.user = editedUser[0]
        res.status(200).send(req.session.user)
        //working
    },
    logout: (req, res) => {
        req.session.destroy()
        res.sendStatus(200)
        //working
    },
    getLoggedInUser: async (req, res) => {
        // console.log('GetLoggedInUser', req.session.user)
        if (req.session.user) {
           return res.status(200).send(req.session.user)
        } else {
            res.sendStatus(409)
        }
    }
}
//working