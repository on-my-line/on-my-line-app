'use strict'
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const PORT = 1337

const app = express()

if(process.env.NODE_ENV!== 'production'){
  const volleyball = require('volleyball')
  app.use(volleyball)
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/yelp', require('./yelp'))
app.use('/meetup', require('./meetup'))
app.use('/googlePlaces', require('./googlePlaces'))
//app.use('/maps', require('./googleMaps'))
app.use('/stops', require('./stops'))
app.use('/routes', require('./lines'))
app.use('/sms', require('./sendSMS'))

app.use(express.static(path.join(__dirname, '../public')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
})

app.listen(PORT, () => console.log(`doing all good things on port ${PORT}`))

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || 'Internal server error')
})

module.exports = app
