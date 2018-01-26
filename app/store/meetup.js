import axios from 'axios'
import history from '../history'

const SET_MEETUP_THINGS = 'SET_MEETUP_THINGS'

const defaultMeetup = []

const setMeetupThings = meetupThings => ({type: SET_MEETUP_THINGS, meetupThings})

export const fetchMeetupThunk = (LatLonRad) =>
  dispatch =>
    axios.get(`/meetup/${LatLonRad}`)
        .then(res =>
            dispatch(setMeetupThings(res)))
        .catch(err => console.log(err))

export default function(state = defaultMeetup, action) {
    switch (action.type) {
        case SET_MEETUP_THINGS:
            return action.meetupThings
    default:
        return state
    }
}