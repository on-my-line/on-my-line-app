const secrets = require('../secrets')
const router = require('express').Router()
const axios = require('axios')

const TOKEN = process.env.EVENTBRITE_TOKEN
const USER_KEY = process.env.EVENTBRITE_USER_KEY
const APP_KEY = process.env.EVENTBRITE_APP_KEY

router.get('/:lat_long_rad', (req, res, next) => {
    let parsed
    const userInput = req.params.lat_long_rad
    const userInputSplit = userInput.split('_')
    const latitude = userInputSplit[0]
    const longitude = userInputSplit[1]
    const radius = (userInputSplit[2])/1000 //follow by "mi" or "km"
    const url = `https://www.eventbriteapi.com/v3/events//?location.latitude=${latitude}&location.longitude=${longitude}&location.within=${radius}km&token=${TOKEN}`
    
    axios.get(url)
    .then(response => response.data)
    .then(data => res.json(data))
    .catch(next)
})

module.exports = router
