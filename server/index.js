require('dotenv').config()
const massive = require('massive')
const express = require('express')
const session = require('express-session')
const postCtrl = require('./postController')
const userCtrl = require('./userController')
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

//TODO: End points here

app.post('/user/login', userCtrl.login)
app.post('/user/register', userCtrl.register)
app.delete('/user/logout', userCtrl.logout)
app.get('/user/me', userCtrl.getLoggedInUser)
app.get('/user/proplayers', userCtrl.getUsersProPlayers)



