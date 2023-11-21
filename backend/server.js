require('dotenv').config()
const { MongoClient } = require('mongodb')
const mongoose = require('mongoose')
const express = require('express')
const workoutsRoutes = require('./routes/workouts')

// create an express app
const app = express()

// middleware

// to get json data to the request var to send to the server
app.use(express.json())

// to log our requests
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/workouts', workoutsRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log("listening on port 4000");
        })
    })
    .catch((error) => {
        console.log(error)
    })