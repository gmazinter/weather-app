const APIKey = 'acd077cb7b1e4071be7122055181912'
const express = require('express')
const router = express.Router()
const request = require('request')
const mongoose = require('mongoose')
const City = require('../model/City')

router.get(`/sanity`, function(req, res) {
    console.log("Everything A-OK!!")
    res.end()
})

router.get('/city/:cityName', function(req, res) {  
    request(`http://api.apixu.com/v1/current.json?key=${APIKey}&q=${req.params.cityName}`, function(err, data) {
        data = JSON.parse(data.body)
        data = {
            cityName: data.location.name,
            cityDate: data.current.last_updated,
            cityTemp: data.current.temp_c,
            cityCond: data.current.condition.text,
            cityCondIcon: data.current.condition.icon
        }
        console.log(err || null)
        res.send(data)
    })
})

router.get('/cities', function(req, res) {
    City.find({}, function(err, cities) {
        res.send(cities)
        //should handle error somehow
    })
})

router.post('/city', function(req, res) {
    // let newCity = new City({
    //     name: req.body.name,
    //     date: req.body.updated,
    //     temperature: req.body.temp,
    //     condition: req.body.condition
    //     conditionIcon: req.body.conditionIcon
    // })
    let newCity = new City(req.body)
    newCity.save()
    res.end()
})

router.delete('/city/:cityName', function(req, res) {
    City.deleteOne({name: req.params.cityName}, function(err){})
        res.end()
})

router.put(`/city/:cityName`, function(req, res) {
    request(`http://api.apixu.com/v1/current.json?key=${APIKey}&q=${req.params.cityName}`, function(err, data) {
        data = JSON.parse(data.body)
        data = {
            cityName: data.location.name,
            cityDate: data.current.last_updated,
            cityTemp: data.current.temp_c,
            cityCond: data.current.condition.text,
            cityCondIcon: data.current.condition.icon
        }
        City.findOneAndUpdate({name: data.cityName}, {
            date: data.cityDate,
            temperature: data.cityTemp,
            condition: data.cityCond,
            conditionPic: data.cityCondIcon
        }, function(err) {null})
        res.send(data)
    })
})

module.exports = router