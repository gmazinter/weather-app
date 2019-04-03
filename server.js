const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const api = require('./server/routes/api')
const request = require('request')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/weatherDB', {useNewUrlParser: true})


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use('/', api)
app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))


const port = 8080
app.listen(port, function() {
    console.log(`Server up and running on port ${port}`)
})