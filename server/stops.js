const router = require('express').Router()
const allStops = require('../allStops')

router.get('/:line', (req, res, next) => {
    const currentLine = req.params.line
    const singleTrainStops = allStops.features.filter(stop => {
        const stopSet = new Set(stop.properties.Routes_ALL.split(', '))
        return stopSet.has(currentLine)
      })
    res.send(singleTrainStops)
})

module.exports = router