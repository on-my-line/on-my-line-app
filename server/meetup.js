const secrets = require('../secrets')
const axios = require('axios')
const router = require('express').Router()

const API_KEY = process.env.MEETUP_API_KEY

router.get('/:lat_long_rad', (req, res, next) => {
    let parsed
    const userInput = req.params.lat_long_rad
    const userInputSplit = userInput.split('_')
    const latitude = userInputSplit[0]
    const longitude = userInputSplit[1]
    const radius = (userInputSplit[2])/1609 //convert meters to miles
    const url = `https://api.meetup.com/2/concierge?lon=${longitude}&lat=${latitude}&radius=${radius}&key=${API_KEY}`
    
    axios.get(url)
    .then(response => response.data)
    .then(data => res.json(data))
    .catch(next)
})

module.exports = router