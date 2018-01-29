import axios from 'axios'
import history from '../history'

const SET_EVENTBRITE_THINGS = 'SET_EVENTBRITE_THINGS'

const defaultEventBrite = []

const setEventBriteThings = eventBriteThings => ({type: SET_EVENTBRITE_THINGS, eventBriteThings})

export const fetchEventBriteThunk = (arrayOfStops) =>
  dispatch => {
      const fetchAllPromiseArray = []
      arrayOfStops.forEach(stop => {
      const promise = axios.get(`/eventBrite/${stop[1]}_${stop[0]}`)
          .then(response => response)
      fetchAllPromiseArray.push(promise)
    })
    Promise.all(fetchAllPromiseArray)
        .then(resolvedArray => {
            let allEventBriteThings = []
            resolvedArray.forEach(eventBrtieResponse => {
            allEventBriteThings = [...allEventBriteThings, ...eventBrtieResponse.data]
            })
            let alreadyFound = {}
            let uniqueThings = []
            allEventBriteThings.forEach(obj => {
                let name = obj.name
                if(!alreadyFound[name]){
                    alreadyFound[name] = true
                    uniqueThings.push(obj)
                }
    //right now it is only picking up the nearest date of the event if it is reoccuring. 
            })
            return uniqueThings
        })
        .then(uniqueEventBriteThings =>
              dispatch(setEventBriteThings(uniqueEventBriteThings)))
          .catch(err => console.log(err))
  }

export default function(state = defaultEventBrite, action) {
    switch (action.type) {
        case SET_EVENTBRITE_THINGS:
            return action.eventBriteThings
    default:
        return state
    }
}