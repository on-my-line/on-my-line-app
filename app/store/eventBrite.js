import axios from 'axios'
import history from '../history'

const SET_EVENTBRITE_THINGS = 'SET_EVENTBRITE_THINGS'

const defaultEventBrite = []

const setEventBriteThings = eventBriteThings => ({type: SET_EVENTBRITE_THINGS, eventBriteThings})

export const fetchEventBriteThunk = (LatLonRad) =>
  dispatch =>
    axios.get(`/eventBrite/${LatLonRad}`)
        .then(res =>
            dispatch(setEventBriteThings(res)))
        .catch(err => console.log(err))

export default function(state = defaultEventBrite, action) {
    switch (action.type) {
        case SET_EVENTBRITE_THINGS:
            return action.eventBriteThings
    default:
        return state
    }
}