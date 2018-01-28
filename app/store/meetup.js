import axios from 'axios'
import history from '../history'

const SET_MEETUP_THINGS = 'SET_MEETUP_THINGS'

const defaultMeetup = []

const setMeetupThings = meetupThings => ({type: SET_MEETUP_THINGS, meetupThings})

export const fetchMeetupThunk = (arrayOfStops, rad=1000) =>
  dispatch => {
    const fetchAllPromiseArray = []
    arrayOfStops.forEach(stop => {
      const promise = axios.get(`/meetup/${stop[1]}_${stop[0]}_${rad}`)
          .then(response => response)
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
                let name = obj.name
                //let date = obj.date
                if(!alreadyFound[name]){
                    alreadyFound[name] = true
                    uniqueThings.push(obj)
                }
    //right now it is only picking up the nearest date of the event if it is reoccuring. 
            })
            return uniqueThings
        })
        .then(uniqueMeetupThings =>
            dispatch(setMeetupThings(uniqueMeetupThings)))
        .catch(err => console.log(err))
  }

export default function(state = defaultMeetup, action) {
    switch (action.type) {
        case SET_MEETUP_THINGS:
            return action.meetupThings
    default:
        return state
    }
}