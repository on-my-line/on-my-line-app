import axios from 'axios'

const SET_SINGLE_STOPS = "SET_SINGLE_STOPS"

const defaultStops = {}

const setSingleStops = singleStops => {type: SET_SINGLE_STOPS, singleStops}

export const fetchSingleStopsThunk = (currentLine) => 
    dispatch => {
        axios.get(`/routes/${currentLine}`)
        .then(res =>  res.data)
        .then(res => dispatch(setSingleStops(res)))
        .catch(err => console.log(err))
    }

export default function (state = defaultStops, action) {
    switch (action.type) {
        case SET_SINGLE_STOPS:
            return action.singleStops
        default:
            return state
    }
}