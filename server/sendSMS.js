const secrets = require('../secrets')
const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const sierraNumber = process.env.MY_PHONE_NUMBER
const twilioNumber = process.env.TWILIO_NUMBER
const router = require('express').Router()

const client = require('twilio')(accountSid, authToken)

router.post('/', (req, res, next) => {
    const toNumber = req.body.toNumber
    const website = req.body.url
    const message = req.body.message
    res.send("Message sent!")
})

module.exports = router
