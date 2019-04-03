const mongoose = require('mongoose')
const Schema = mongoose.Schema

const citySchema = new Schema({
    name: String,
    updated: String,
    temp: String,
    condition: String,
    conditionIcon: String
})

const City = mongoose.model('City', citySchema)

module.exports = City