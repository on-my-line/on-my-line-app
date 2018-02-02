'use strict'
import React from 'react'
import {Route, IndexRedirect, browserHistory} from 'react-router'
import { BrowserRouter as Router } from 'react-router-dom'
import {render} from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import {Provider} from 'react-redux'
import store from './store'
import Routes from './routes'

const muiTheme = getMuiTheme({
  fontFamily: "Helvetica"
})

render(
  <Provider store={store}>
  <MuiThemeProvider muiTheme={muiTheme}>
      <Routes />
  </MuiThemeProvider>
  </Provider>,
  document.getElementById('main')
)
