
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

const reducer = combineReducers(
  {
    line,
    stop,
    yelp,
    meetup,
    eventBrite,
    singleTrainStops,
    singleRoute
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