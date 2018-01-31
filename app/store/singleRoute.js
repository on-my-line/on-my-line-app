import axios from 'axios'

const SET_SINGLE_ROUTE = "SET_SINGLE_ROUTE"

const defaultRoute = []

const setSingleRoute = singleRoute => ({type: SET_SINGLE_ROUTE, singleRoute})

export const fetchSingleRouteThunk = (currentLine) => 
    dispatch => 
        axios.get(`/routes/${currentLine}`)
        .then(res =>  res.data)
        .then(res => dispatch(setSingleRoute(res)))
        .catch(err => console.log(err))
    

export default function (state = defaultRoute, action) {
    switch (action.type) {
        case SET_SINGLE_ROUTE:
            return action.singleRoute
        default:
            return state
    }
}