
import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import line from './line'
import stop from './stop'
import yelp from './yelp'
import meetup from './meetup'
import eventBrite from './eventBrite'
import singleTrainStops from './singleTrainStops'
import singleRoute from './singleRoute'
import userLine from './userLine'
import google from './googlePlaces'
import user from './user'

const reducer = combineReducers(
  {
    line,
    stop,
    yelp,
    meetup,
    google,
    eventBrite,
    singleTrainStops,
    singleRoute,
    userLine,
    user
  })

const middleware = composeWithDevTools(applyMiddleware(
    thunkMiddleware,
    createLogger({collapsed: true})
  ))

const store = createStore(reducer, middleware)

export default store

export * from './line'
export * from './stop'
export * from './yelp'
export * from './meetup'
export * from './eventBrite'
export * from './singleTrainStops'
export * from './singleRoute'
export * from './userLine'
<<<<<<< HEAD
export * from './googlePlaces'
=======
export * from './user'
>>>>>>> 8f62ad1eeaccb926db5deb6d337b3cc5f835dba9
