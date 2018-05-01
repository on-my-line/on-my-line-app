const secrets = require('../secrets')
const axios = require('axios')
const router = require('express').Router()
const graphqlHTTP = require('express-graphql')
const schema = require('./schema')

const API_KEY = process.env.MEETUP_API_KEY

router.use('/', graphqlHTTP({
    schema,
    graphiql: false
}))

// router.get('/?query=query%20%7B%0A%20%20meetup(longitude%3A%20"-73.951822"%2C%20latitude%3A%20"40.799075"%2C%20radius%3A%20"0.24860161591050342"%2C%20API_KEY%3A%20"596d4368354c2a69415858555a7566")%20%7B%0A%20%20%20%20events%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D', (req, res, next) => {
//     console.log(res)
//     res.send(res)
// })

router.get('/:lat_long_rad', (req, res, next) => {
    let parsed
    const userInput = req.params.lat_long_rad
    const userInputSplit = userInput.split('_')
    const latitude = userInputSplit[0]
    const longitude = userInputSplit[1]
    const radius = (userInputSplit[2])/1609 //convert meters to miles
    console.log('lat', latitude, 'long', longitude, 'rad', radius)
    const url = `https://api.meetup.com/2/concierge?lon=${longitude}&lat=${latitude}&radius=${radius}&key=${API_KEY}`
    const query = `query {
        meetup(longitude: ${longitude}, latitude: ${latitude}, radius: ${radius}, API_KEY: ${API_KEY}){
          events {
            name
          }
        }
      }`

    axios.post(query)
        .then(response => {
            console.log(response)
            res.json(response)})
    // .then(data => {
    //     let meetupThings
    //     if(data){
    //         meetupThings = data.filter(elem => elem.venue)
    //         .map(elem => {
    //                  const date = new Date(elem.time)
    //                  let month = date.getMonth()
    //                  let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec']
    //                  month = months[month]
    //                  let day = date.getDay()
    //                  let days = ['Sun','Mon','Tue','Wed','Thur','Fri','Sat']
    //                  day = days[day]
    //                  let min = date.getMinutes()
    //                  if(!min) min = '00'
    //                  else if(min.length<2) min = '0'+ min
    //                  let hours = date.getHours()
    //                  let timeOfDay = ' PM'
    //                  if((hours-12)<0){timeOfDay = ' AM'}
    //                  if(hours%12 === 0){hours = 12}
    //                  else{hours = hours%12}
    //              return (
    //                  {
    //                      id: elem.id,
    //                      name: elem.name,
    //                      url: elem.event_url,
    //                      lat: elem.venue.lat,
    //                      lon: elem.venue.lon,
    //                      price: (elem.fee) ? elem.fee.amount : null,
    //                      group: (elem.group) ? elem.group.name : null,
    //                      description: (elem.description) ?  elem.description : null,
    //                      location: (elem.venue.address_2) ? elem.venue.name + ', ' + elem.venue.address_1 + ' ' + elem.venue.address_2 + ', ' + elem.venue.city + ' NY' : elem.venue.name + ', ' + elem.venue.address_1 + ', ' + elem.venue.city + ' NY',
    //                      date: day + ", " + month + " " + date.getDate() + ", " + date.getFullYear(), //in datetime form
    //                      start_time: hours + ':' + min + timeOfDay,
    //                      img: (elem.photo_url) ? elem.photo_url : null,
    //                  }
    //              )
    //          })
    //     }
    //     res.json(meetupThings)
    // })
    // .catch(next)
})

module.exports = router