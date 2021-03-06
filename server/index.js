
require('dotenv').config()
const massive = require('massive')
const express = require('express')
const session = require('express-session')
const postCtrl = require('./postController')
const userCtrl = require('./userController')
const proCtrl = require('./ProsController')
const path = require('path')
const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env
const app = express()
app.use(express.json())

app.use(session({
    resave: false, 
    saveUninitialized: true,
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 30},
    secret: SESSION_SECRET
}))

massive({
    connectionString: CONNECTION_STRING, 
    ssl: {
        rejectUnauthorized: false
    }
}).then(db => {
    app.set('db', db)
    console.log('DB IS CONNECTED')
    app.listen(SERVER_PORT, () => console.log(`Docked at port ${SERVER_PORT}`))
})

//* User endpoints
app.get('/user/me', userCtrl.getLoggedInUser)
app.get('/user/me/friends/:dota_users_account_id', userCtrl.getUsersFriends)
app.post('/user/login', userCtrl.login)
app.post('/user/register', userCtrl.register)
app.post('/user/friends', userCtrl.addFriend)
app.put('/user/me/friends/:id', userCtrl.editFriend)
app.put('/user/me/:dota_users_id', userCtrl.editUserInfo)
app.delete('/user/logout', userCtrl.logout)
app.delete('/user/me/friends/:id', userCtrl.deleteFriend)


//* Post Controllers
app.get('/dota-pros/posts/:match_id', postCtrl.getPostsBasedOnMatch)
app.get('/dota-pros/all-posts', postCtrl.getAllPosts)
app.get('/dota-pros/posts/:dota_posts_id', postCtrl.getOnePost)
app.post('/dota-pros/posts', postCtrl.addNewPost)
app.put('/dota-pros/posts/:dota_posts_id', postCtrl.editPost)
app.delete('/dota-pros/posts/:dota_posts_id', postCtrl.deletePost)

//* Pro Controllers
app.get('/dota-pros/pros', proCtrl.getProPlayers)
app.get('/user/me/pros/:user_id', proCtrl.getUsersProPlayers)
app.post('/user/me/:pro_player_account_id', proCtrl.addProPlayer)
app.delete('/user/me/:id', proCtrl.deletePro)

app.use(express.static(__dirname + '/../build'))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'))
})
