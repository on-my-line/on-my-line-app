const router = require('express').Router()
const allRoutes = require('../allRoutes')

router.get('/:line', (req, res, next) => {
    const currentLine = req.params.line
    const singleRoute = allRoutes.features.filter(route => route.properties.route_id === currentLine)
    res.send(singleRoute)
})

module.exports = router