'use strict'
import React from 'react'
import {Route, IndexRedirect, browserHistory} from 'react-router'
import { BrowserRouter as Router } from 'react-router-dom'
import {render} from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import {Provider} from 'react-redux'
import store from './store'
import Routes from './routes'

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: "#FCCC0A",
    primary2Color: "#EE352E",
    primary3Color: "#00933C",
    accent1Color: "#FF6319",
    accent2Color: "#566573",
    accent3Color: "#2C3EE50",
    canvasColor: "#1C2833",
    borderColor: "#17202A",
    disabledColor: "#566573",
    pickerHeaderColor: "#00933C",
    clockCircleColor: "#ABB2B9",
    shadowColor: "#000000",
    textColor: "#ABB2B9",
    alternativetTextColor: "#D5D8DC"
  },
  appBar: {
    height: 50,
  },
});


render(
  <Provider store={store}>
  <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
      <Routes />
  </MuiThemeProvider>
  </Provider>,
  document.getElementById('main')
)
