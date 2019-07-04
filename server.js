const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const { port, database, host, driver} = require('./settings/database');
const uri = `${driver}://${host}:${port}/${database}`

mongoose.connect(uri, { useNewUrlParser: true })

app = express()


app.get('/cities', (request, response) => {

    City.find({})
    .then(data=>response.json(data))
    .catch(error=>response.json({error}))

})


app.post('/cities', jsonParser, (request, response) => {

    let message = new City(
    {
        name: request.body.name,
        country: request.body.country,
        population: request.body.population
    })

    message.save()
    .then(doc => response.status(200).json({success:"Saved city"}))
    .catch(error => response.status(500).json({error}))
})