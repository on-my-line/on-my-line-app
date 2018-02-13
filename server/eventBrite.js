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
    const radius = ((userInputSplit[2])/1000) //follow by "mi" or "km"
    const url = `https://www.eventbriteapi.com/v3/events/?expand=venue&location.latitude=${latitude}&location.longitude=${longitude}&location.within=${radius}&token=${TOKEN}`
    axios.get(url)
    .then(response => response.data.events)
    .then(data => {
        const eventBriteThings = data.filter(elem => elem.venue)
        .map(elem => {
            const date = new Date(elem.start.local)
            const endTime = new Date(elem.end.local)
            let month = date.getMonth()
            let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec']
            month = months[month]
            let day = date.getDay()
            let days = ['Mon','Tue','Wed','Thur','Fri','Sat','Sun']
            day = days[day]
            let min = date.getMinutes()
            if(!min) min = '00'
            else if(min.length<2) min = '0'+ min
            let endMin = date.getMinutes()
            if(!endMin) endMin = '00'
            else if(endMin.length<2) endMin = '0' + endMin
            return (
                {
                    name: elem.name.text,
                    url: elem.url,
                    lat: elem.venue.latitude,
                    lon: elem.venue.longitude,
                    price: elem.is_free, //bool
                    location: elem.venue.address.localized_multi_line_address_display,
                    date: day + ", " + month + " " + date.getDate() + ", " + date.getFullYear(),
                    startTime: date.getHours() + ':' + min,
                    endTime: endTime.getHours() + ':' + endMin,
                }
            )
        })
    res.json(eventBriteThings)
    })
    .catch(next)
})

module.exports = router
