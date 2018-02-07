const router = require('express').Router()
const axios = require('axios')

if(process.env.NODE_ENV!== 'production'){
    const secrets = require('../secrets')
}
    
const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY

router.get('/:lat_long_rad', (req, res, next) => {
const userInput = req.params.lat_long_rad
const userInputSplit = userInput.split('_')
const lon = userInputSplit[0]
const lat = userInputSplit[1]
const rad = userInputSplit[2]
const type = 'museum'

axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?type=${type}&location=${lon},${lat}&radius=${rad}&key=${GOOGLE_PLACES_API_KEY}`)
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
.then(response => response.data.results)//response without any info
.then((results)=> {
    promiseArray = results.map(elem=>{
       let promise = axios.get(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${elem.place_id}&key=${GOOGLE_PLACES_API_KEY}`)
        .then(response => response.data)
       return promise
    })
    let data = Promise.all(promiseArray)
    .then(resolvedPromiseArray => {
    const museumThings = resolvedPromiseArray.filter(elem => elem.result.website)
    .map(elem => {
        if(elem.result.photos){
            photoId = elem.result.photos[0].photo_reference
            photoWidth = elem.result.photos[0].width
        }
            return (
                {
                    id: elem.result.id,
                    name: elem.result.name,
                    place_id: elem.result.place_id,
                    category: elem.result.types,
                    url: elem.result.website,
                    lat: elem.result.geometry.location.lat,
                    lon: elem.result.geometry.location.lng,
                    location: elem.result.formatted_address,
                    phone: elem.result.formatted_phone_number,
                    time:(elem.result.opening_hours) ? elem.result.opening_hours.weekday_text : null,
                    img: (elem.result.photos) ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${photoWidth}&photoreference=${photoId}&key=${GOOGLE_PLACES_API_KEY}`   : null,
                }
            )
        })
        res.json(museumThings)
    })
})
.catch(next)
})
module.exports = router
