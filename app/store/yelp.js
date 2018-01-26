import axios from 'axios'
import history from '../history'

const SET_YELP_THINGS = 'SET_YELP_THINGS'

const defaultYelp = []

const setYelpThings = yelpThings => ({type: SET_YELP_THINGS, yelpThings})

export const fetchYelpThunk = (arrayOfStops) => //array of arrays lon/lat
  dispatch => {
      const fetchAllPromiseArray = []
      arrayOfStops.forEach( stop => {
          let promise =  axios.get(`/yelp/${stop[1]}_${stop[0]}_1000`)
          .then(response => response)
          fetchAllPromiseArray.push(promise)
      })
      Promise.all(fetchAllPromiseArray)
      .then(resolvedArray => {
          let allYelpThings = []
          resolvedArray.forEach(yelpResponse => {
              allYelpThings.push(yelpResponse)
          })
          return allYelpThings
      })
      .then(allYelpThings =>
          dispatch(setYelpThings(allYelpThings)))
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

//comment