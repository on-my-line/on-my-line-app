import axios from 'axios'
import history from '../history'

const SET_YELP_THINGS = 'SET_YELP_THINGS'

const defaultYelp = []

const setYelpThings = yelpThings => ({type: SET_YELP_THINGS, yelpThings})

export const fetchYelpThunk = (LatLonRad) =>
  dispatch =>
    axios.get(`/yelp/${LatLonRad}`)
        .then(res =>
            dispatch(setYelpThings(res)))
        .catch(err => console.log(err))

export default function(state = defaultYelp, action) {
    switch (action.type) {
        case SET_YELP_THINGS:
            return action.yelpThings
    default:
        return state
    }
}
