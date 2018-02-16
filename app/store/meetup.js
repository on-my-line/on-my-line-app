import axios from 'axios'
import history from '../history'

function delay(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time)
    })
}

const SET_MEETUP_THINGS = 'SET_MEETUP_THINGS'

const defaultMeetup = []

const setMeetupThings = meetupThings => ({ type: SET_MEETUP_THINGS, meetupThings })

export const fetchMeetupThunk = (arrayOfStops, rad = 400, callback) =>
    dispatch => {
        const fetchAllPromiseArray = []
        arrayOfStops.forEach((stopObj, i) => {
            const stopId = stopObj.stopId
            const promise = delay(400*i).then(() => axios.get(`/meetup/${stopObj.coordinates[1]}_${stopObj.coordinates[0]}_${rad}`))
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
                    let allMeetupThings = []
                    resolvedArray.forEach(meetupResponse => {
                        allMeetupThings = [...allMeetupThings, ...meetupResponse.data]
                    })
                    let alreadyFound = {}
                    let uniqueThings = []
                    allMeetupThings.forEach(obj => {
                        let name = obj.id
                        if (!alreadyFound[name]) {
                            alreadyFound[name] = true
                            uniqueThings.push(obj)
                        }
                    })
                    return uniqueThings
                })
                .then(uniqueMeetupThings =>//{
                   // console.log(uniqueMeetupThings)
                    uniqueMeetupThings.length ? dispatch(setMeetupThings(uniqueMeetupThings)): dispatch(setMeetupThings([]))
                //}
                    )
                .then(() => {
                    callback(null)
                })
                .catch(err => console.log(err))
        }

export default function (state = defaultMeetup, action) {
            switch (action.type) {
                case SET_MEETUP_THINGS:
                let allthings = [...state, ...action.meetupThings]
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