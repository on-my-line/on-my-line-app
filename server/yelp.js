const yelp = require('yelp-fusion')
const secrets = require('../secrets')
const router = require('express').Router()

const YELP_API_KEY = process.env.YELP_API_KEY

const client = yelp.client(YELP_API_KEY)

router.get('/:lat_long_rad', (req, res, next) => {
  const userInput = req.params.lat_long_rad
  const userInputSplit = userInput.split('_')
  const searchRequest = {
    latitude: userInputSplit[0],
    longitude: userInputSplit[1],
    radius: userInputSplit[2]    // in meters
  }
  client.search(searchRequest)
  .then(response => {
    const Results = response.jsonBody.businesses
    return Results
  })
  .then(results => {
    const yelpThings = results.map(elem => (
      {
        name: elem.name,
        url: elem.url,
        lat: elem.coordinates[0],
        lon: elem.coordinates[0],
        rating: elem.rating,
        price: elem.price,
        location: elem.location.display_address[0],
        phone: elem.phone,
      }))
    res.json(yelpThings)
  })
  .catch(next)
})

module.exports = router
