
import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import line from './line'
import stop from './stop'

const reducer = combineReducers({line, stop})

const middleware = composeWithDevTools(applyMiddleware(
    thunkMiddleware,
    createLogger({collapsed: true})
  ))

const store = createStore(reducer, middleware)

export default store

export * from './line'
export * from './stop'