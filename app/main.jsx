'use strict'
import React from 'react'
import {Route, IndexRedirect, browserHistory} from 'react-router'
import { BrowserRouter as Router } from 'react-router-dom'
import {render} from 'react-dom'
import WhoAmI from './components/WhoAmI'
import NotFound from './components/NotFound'
import firebase from '../fire'
import WhatIsYourLine from './components/WhatIsYourLine'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {Provider} from 'react-redux'
import store from './store'
import Routes from './routes'

render(
  <Provider store={store}>
  <MuiThemeProvider>
      <Routes />
  </MuiThemeProvider>
  </Provider>,
  document.getElementById('main')
)
