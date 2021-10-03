const express = require('express')
const { formidable } = require('formidable')
const app = express()
// const formidable = require('formidable')
const pgp = require('pg-promise')()
const connectionString = 'postgres://zegafusk:vTO3n-Vlxp5xuS1QNKA6_ZRGr2MSBKBP@chunee.db.elephantsql.com/zegafusk'
const db = pgp(connectionString)
const bcrypt = require('bcryptjs')
const cors = require('cors')

app.use(express.json())
app.use(cors())

global.__basedir = __dirname

//USER ROUTES

//add new user 
app.post('/api/add-user', (req, res) => {
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
                         {message: 'USER ADDED'})
                         }
                         )
                 } else {
                     res.send('Error occured.')
                 }
             })
    })

})

// user log in 
app.post('/api/login', (req, res) => {
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
                res.json({userId:user.user_id, username: user.username}) 
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
app.post('/api/upload', (req, res) => {
    uploadFile(req, (photoURL) => {
        res.send("UPLOAD")
    })
})

//get all journeys for one user 
app.get('/api/all-journeys/:userId',(req,res)=>{
    const userId = req.params.userId

    console.log(userId)
    db.any('SELECT journey_id, title, description, start_date FROM journeys WHERE user_Id=$1', [userId])
    .then((journeys)=>{
        res.json(journeys)
    })
})

//display all journal entires for one journey
app.get('/api/all-journal-entries/:journeyId', (req,res)=>{
    const journeyId = req.params.journeyId
    const userId = req.params.userId

    console.log(journeyId, userId)

    db.any('SELECT entry_id, title, entry, date_created FROM journal_entries WHERE journey_id=$1', [journeyId])
    .then((entries)=>{
        res.json(entries)
    })
})

//get one user journey for the journey detail page
app.get('/api/journey-detail/:journeyId', (req,res)=>{
    const journeyId = req.params.journeyId
    
    console.log(journeyId)

    db.one('SELECT journey_id, title FROM journeys WHERE journey_id=$1', [journeyId])
    .then((journey) => {
        res.json(journey)
    })
})


//start a journey
app.post('/api/new-journey/:userId', (req, res) => {
    const title = req.body.title
    const description = req.body.description
    const is_public = req.body.is_public
    const userId = req.params.userId

    db.none('INSERT INTO journeys (title, description, is_public, user_id) VALUES($1,$2,$3,$4)',[title, description, is_public, userId])
    .then(()=>{
        console.log('New journey started')
        res.json({success: true})
    })
})


//add a journal entry
app.post('/api/add-entry/:journeyId', (req,res)=>{
    const title = req.body.title
    const entry = req.body.entry
    const userId = req.body.userId
    const journeyId = req.params.journeyId
    // const entryUpload = req.body.entryUpload

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
        res.json({success: true}
        )
    })
})





//static folder
app.use('uploads', express.static('uploads'))






app.listen(8080, (req, res) => {
    console.log('Jurni server is running')
})