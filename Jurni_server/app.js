const express = require('express')
const { formidable } = require('formidable')
const app = express()
// const formidable = require('formidable')
const pgp = require('pg-promise')()
const connectionString = 'postgres://zegafusk:vTO3n-Vlxp5xuS1QNKA6_ZRGr2MSBKBP@chunee.db.elephantsql.com/zegafusk'
const db = pgp(connectionString)
const bcrypt = require('bcryptjs')

app.use(express.json())

global.__basedir = __dirname

//USER ROUTES

//add new user 
app.post('/add-user', (req, res) => {
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const email = req.body.email
    const username = req.body.username
    const password = req.body.password
    const aboutMe = req.body.aboutMe
    
    console.log(firstName, lastName, email, username, password, aboutMe)
    
    bcrypt.genSalt(10, function (error, salt) {
        bcrypt.hash(password, salt, function (error, hash) {
            if (!error) {
                db.none('INSERT INTO users(first_name, last_name, email, username, password, about_me) VALUES ($1,$2,$3,$4,$5,$6)',[firstName, lastName, email, username, hash, aboutMe])
                 .then(() => {
                     res.json(
                         {message: 'SUCCESS'})
                         }
                         )
                 } else {
                     res.send('Error occured.')
                 }
             })
    })

})

// user log in 
app.post('/login', (req, res) => {
    const username = req.body.username
    const password = req.body.password

    db.one('SELECT user_id, username, password FROM users WHERE username = $1', [username])
        .then((user) => {
            const match = bcrypt.compare(password, user.password)

            if (!match) {
                return res.status(401).json({
                    error: "Password incorrect"
                })
            }else{
                res.json({message: 'You have been authenticated'}) 
            }
        })

        
})


//JOURNEY ROUTES

//upload an image file to the database. 
function uploadFile(req, callback) {
    new formidable.IncomingForm().parse(req)
        .on('fileBegin', (name, file) => {

            file.path = basedir + '/uploads/' + file.name
        })
        .on('file', (name, file) => {
            callback(file.name)
        })
}

//test this in client side first 
app.post('/upload', (req, res) => {
    uploadFile(req, (photoURL) => {
        res.send("UPLOAD")
    })
})

//get all journeys for one user 
app.get('/all-journeys',(req,res)=>{
    const userId = req.body.userId

    console.log(userId)
    db.any('SELECT journey_id, title, description, start_date FROM journeys WHERE user_Id=$1', [userId])
    .then((journeys)=>{
        console.log(journeys)
        res.send(
            'SUCCESS'
        )
    })
})

//start a journey
app.post('/new-journey', (req, res) => {
    const title = req.body.title
    const description = req.body.description
    const is_public = req.body.is_public
    const userId = req.body.userId

    db.none('INSERT INTO journeys (title, description, is_public, user_id) VALUES($1,$2,$3,$4)',[title, description, is_public, userId])
    .then(()=>{
        console.log('New journey started')
        res.send(
            'SUCCESS'
        )
    })
})


//add a journal entry
app.post('/add-entry', (req,res)=>{
    const title = req.body.title
    const entry = req.body.entry
    const userId = req.body.userId
    const journeyId = req.body.journeyId
    const entryUpload = req.body.entryUpload

    // function uploadFile(req, callback) {
    //     new formidable.IncomingForm().parse(req)
    //         .on('fileBegin', (name, file) => {
    
    //             file.path = basedir + '/uploads/' + file.name
    //         })
    //         .on('file', (name, file) => {
    //             callback(file.name)
    //         })
    // }
    
    db.none('INSERT INTO journal_entries (title, entry, journey_id, user_id) VALUES ($1, $2, $3, $4)',[title, entry, journeyId, userId])
    .then(()=>{
        console.log('New entry added')
        res.send(
            'SUCCESS'
        )
    })
})





//static folder
app.use('uploads', express.static('uploads'))






app.listen(8080, (req, res) => {
    console.log('Jurni server is running')
})