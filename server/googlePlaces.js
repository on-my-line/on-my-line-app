const router = require('express').Router()
const secrets = require('../secrets')
const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY
const axios = require('axios')

// const googleMapsClient = require('@google/maps').createClient({
//     key: GOOGLE_PLACES_API_KEY
//     })

// const googleMapsClient.createClient({
//     key: secrets.GOOGLE_PLACES_API_KEY
//   })

router.get('/:lat_long_rad', (req, res, next) => {
const userInput = req.params.lat_long_rad
const userInputSplit = userInput.split('_')
const lon = userInputSplit[0]
const lat = userInputSplit[1]
const rad = userInputSplit[2]
const type = 'museum'
console.log(rad)

axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lon},${lat}&radius=${rad}&key=${GOOGLE_PLACES_API_KEY}`)
//only one type can be searched at a time. 
// amusement_park
// aquarium
// art_gallery      //<<<
// bowling_alley
// movie_theater 
// museum           //<<<
// night_club       //<<<
// park
// spa
// shopping_mall
// zoo
.then(response => response.data.results)
.then(data => {
    const placesThings = data.filter(elem => elem.photos)
    .map(elem => {
                const date = new Date(elem.time)
                let month = date.getMonth()
                let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec']
                month = months[month]
                let day = date.getDay()
                let days = ['Mon','Tue','Wed','Thur','Fri','Sat','Sun']
                day = days[day]
                let min = date.getMinutes()
                if(!min) min = '00'
                else if(min.length<2) min = '0'+ min
            return (
                {
                    id: elem.id,
                    name: elem.name,
                    place_id: elem.place_id,
                    //url: elem.event_url,
                    lat: elem.geometry.location.lat,
                    lon: elem.geometry.location.lng,
                    //location: (elem.venue.address_2) ? elem.venue.name + ', ' + elem.venue.address_1 + ' ' + elem.venue.address_2 + ', ' + elem.venue.city + ' NY' : elem.venue.name + ', ' + elem.venue.address_1 + ', ' + elem.venue.city + ' NY',
                    //date: day + ", " + month + " " + date.getDate() + ", " + date.getFullYear(), //in datetime form
                    //start_time: date.getHours() + ':' + min,
                    img: elem.photos,
                }
            )
        })
        res.json(data)
    })
.catch(next)
})
module.exports = router
