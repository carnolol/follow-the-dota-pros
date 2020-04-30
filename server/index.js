require('dotenv').config()
const massive = require('massive')
const express = require('express')
const session = require('express-session')
const postCtrl = require('./postController')
const userCtrl = require('./userController')
const proCtrl = require('./ProsController')
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
app.post('/user/login', userCtrl.login)
app.post('/user/register', userCtrl.register)
app.delete('/user/logout', userCtrl.logout)
app.get('/user/me', userCtrl.getLoggedInUser)
app.get('/user/proPlayers', userCtrl.getUsersProPlayers)


//* Post Controllers
app.get('/dota-pros/posts', postCtrl.getPostsBasedOnMatch)
app.get('/dota-pros/all-posts', postCtrl.getAllPosts)
app.get('/dota-pros/posts/:dota_posts_id', postCtrl.getOnePost)
app.post('/dota-pros/posts', postCtrl.addNewPost)
app.put('/dota-pros/posts/:dota_posts_id', postCtrl.editPost)
app.delete('/dota-pros/posts/:dota_posts_id', postCtrl.deletePost)

//* Pro Controlelrs
app.get('/dota-pros/pros', proCtrl.getProPlayers)



