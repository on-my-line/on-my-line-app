import axios from 'axios'
import history from '../history'

const SET_GOOGLE_THINGS = 'SET_GOOGLE_THINGS'

const defaultGoogle = []

const setGoogleThings = googleThings => ({ type: SET_GOOGLE_THINGS, googleThings })

export const fetchGoogleThunk = (arrayOfStops, rad = 400, callback) =>
    dispatch => {
        const fetchAllPromiseArray = []
        arrayOfStops.forEach((stopObj, i) => {
            const stopId = stopObj.stopId
            const promise = delay(400*i).then(() => axios.get(`/googlePlaces/${stopObj.coordinates[1]}_${stopObj.coordinates[0]}_${rad}`))
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
                    let allgoogleThings = []
                    resolvedArray.forEach(googleResponse => {
                        allGoogleThings = [...allGoogleThings, ...googleResponse.data]
                    })
                    let alreadyFound = {}
                    let uniqueThings = []
                    allGoogleThings.forEach(obj => {
                        let name = obj.id
                        if (!alreadyFound[name]) {
                            alreadyFound[name] = true
                            uniqueThings.push(obj)
                        }
                    })
                    return uniqueThings
                })
                .then(uniqueGoogleThings =>
                    dispatch(setMeetupThings(uniqueGoogleThings)))
                .then(() => {
                    callback(null)
                })
                .catch(err => console.log(err))
        }

export default function (state = defaultGoogle, action) {
            switch (action.type) {
                case SET_GOOGLE_THINGS:
                let allthings = [...state, ...action.googleThings]
                let alreadyFound = {}
                let uniqueThings = []
                allthings.forEach(obj => {
                    let id = obj.id
                    if (!alreadyFound[id]) {
                        alreadyFound[id] = true
                        uniqueThings.push(obj)
                    }
                })
                return uniqueThings
                default:
                    return state
            }
        }