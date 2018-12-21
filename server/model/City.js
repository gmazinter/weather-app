const mongoose = require('mongoose')
const Schema = mongoose.Schema

const citySchema = new Schema({
    name: String,
    date: String,
    temperature: Number,
    condition: String,
    conditionPic: String
})

const City = mongoose.model('City', citySchema)

// const c1 = new City({
//     name: 'Tel-Aviv',
//     date: new Date(),
//     temperature: 20,
//     condition: 'Sunny'
// })

// c1.save()

module.exports = City