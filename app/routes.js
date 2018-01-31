'use strict'
import firebase from '../fire'
import React, {Component} from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import D3 from './components/D3'
import WhatIsYourLine from './components/WhatIsYourLine'
import NotFound from './components/NotFound'
import SingleStopList from './components/SingleStopList'
import WhoAmI from './components/WhoAmI'
import Home from './components/Home'

const auth = firebase.auth()

const App = ({children}) =>
    <div>
    <nav>
          {/* WhoAmI takes a firebase auth API and renders either a
            greeting and a logout button, or sign in buttons, depending
            on if anyone's logged in */}
        <WhoAmI auth={auth}/>
      </nav>
      {/* Render our children (whatever the router gives us) */}
      {children}
    </div>

export default class Routes extends Component {
    render() {
        return (
            <div>
                <Router>
                    <div>
                    <Route exact path='/' component={WhatIsYourLine} />
                    <Route exact path='/:line/:stopID' component={SingleStopList} />
                    <Route exact path='/:line' component={D3} />
                    {/* <Route path='/*' component={NotFound}/> */}
                    </div>
                </Router>
            </div>
        )
    }
}