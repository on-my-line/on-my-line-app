import { createStore, combineReducers, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import line from './line'
import stop from './stop'
import yelp from './yelp'
import meetup from './meetup'
import singleTrainStops from './singleTrainStops'
import singleRoute from './singleRoute'
import userLine from './userLine'
import loading from './loading'
import google from './googlePlaces'
import user from './user'

console.log("Enviornment ", process)

const reducer = combineReducers(
  {
    line,
    stop,
    yelp,
    meetup,
    google,
    singleTrainStops,
    singleRoute,
    userLine,
    loading,
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
export * from './singleTrainStops'
export * from './singleRoute'
export * from './userLine'
export * from './loading'
export * from './user'
export * from './googlePlaces'

