const router = require('express').Router()
const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const sierraNumber = process.env.MY_PHONE_NUMBER
const twilioNumber = process.env.TWILIO_NUMBER
const client = require('twilio')(accountSid, authToken)

router.post('/', (req, res, next) => {
    const toNumber = req.body.toNumber
    const website = req.body.url
    const message = req.body.message
    //console.log("in the message sending ")
    client.messages.create({
        to: toNumber,
        from: twilioNumber,
        body: `${website} ${message}`
    })
    .then(message => console.log(message.sid))
    .then(()=> res.send("Message Sent!"))
    .catch(next)
    //res.send("Message sent!")
})

module.exports = router
