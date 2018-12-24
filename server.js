const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const api = require('./server/routes/api')
const request = require('request')
const mongoose = require('mongoose')

mongoose.connect('process.env.mongodb://<dbuser>:<dbpassword>@ds243344.mlab.com:43344/weather-app-guy-db'||'mongodb://localhost/weatherDB');
// mongoose.connect('mongodb://localhost/weatherDB', {useNewUrlParser: true})


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use('/', api)
app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))


app.listen(process.env.PORT || '8080');

// const port = 8080
// app.listen(port, function() {
//     console.log(`Server up and running on port ${port}`)
// })