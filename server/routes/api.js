const APIKey = 'acd077cb7b1e4071be7122055181912'
const express = require('express')
const router = express.Router()
const request = require('request')

const City = require('../model/City')

router.get('/cities', function(req, res) {
    City.find({}, function(err, data) {
        const cities = {}
        data.forEach(c => cities[c.name] = c)
        res.send(cities)
    })
})

router.get('/city/:cityName', function(req, res) {  
    request(`http://api.apixu.com/v1/current.json?key=${APIKey}&q=${req.params.cityName}`,
        function(err, data) {
            data = JSON.parse(data.body)
            res.send(data)
        })
})

router.post('/city', async function(req, res) {
    console.log(req.body)
    const newCity = new City(req.body)
    await newCity.save()
    res.end()
})

router.delete('/city/:cityName', async function(req, res) {
    await City.deleteOne({name: req.params.cityName})
    res.end()
})

module.exports = router