import axios from 'axios'
import history from '../history'

const SET_YELP_THINGS = 'SET_YELP_THINGS'

const defaultYelp = []

const setYelpThings = yelpThings => ({type: SET_YELP_THINGS, yelpThings})

export const fetchYelpThunk = (arrayOfStops, rad=1000) => // array of arrays lon/lat
  dispatch => {
    const fetchAllPromiseArray = []
    arrayOfStops.forEach(stop => {
      const promise = axios.get(`/yelp/${stop[1]}_${stop[0]}_${rad}`)
          .then(response => response)
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
            let name = obj.name
            if(!alreadyFound[name]){
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

export default function(state = defaultYelp, action) {
  switch (action.type) {
  case SET_YELP_THINGS:
    return action.yelpThings
  default:
    return state
  }
}

// comment
