import axios from 'axios'
import history from '../history'

function delay(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time)
    })
}

const SET_YELP_THINGS = 'SET_YELP_THINGS'

const defaultYelp = []

const setYelpThings = yelpThings => ({ type: SET_YELP_THINGS, yelpThings })

export const fetchYelpThunk = (arrayOfStops, rad = 400) => // array of arrays lon/lat
    dispatch => {
        const fetchAllPromiseArray = []
        arrayOfStops.forEach((stopObj, i) => {
            const stopId = stopObj.stopId
            const promise = delay(300*i).then(() => axios.get(`/yelp/${stopObj.coordinates[1]}_${stopObj.coordinates[0]}_${rad}`))
                .then(response => {
                    response.data.forEach(thing => {
                        thing.stopId = stopId
                    })
                    return response
                })
            fetchAllPromiseArray.push(promise)
        })
        Promise.all(fetchAllPromiseArray)
            .then(resolvedArray => {
                let allYelpThings = []
                resolvedArray.forEach(yelpResponse => {
                    allYelpThings = [...allYelpThings, ...yelpResponse.data]
                })
                let alreadyFound = {}
                let uniqueThings = []
                allYelpThings.forEach(obj => {
                    let name = obj.id
                    if (!alreadyFound[name]) {
                        alreadyFound[name] = true
                        uniqueThings.push(obj)
                    }
                })
                return uniqueThings
            })
            .then(uniqueYelpThings =>
                dispatch(setYelpThings(uniqueYelpThings)))
            .catch(err => console.log(err))
    }

export default function (state = defaultYelp, action) {
    switch (action.type) {
        case SET_YELP_THINGS:
            return action.yelpThings
        default:
            return state
    }
}

// comment
