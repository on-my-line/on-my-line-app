'use strict'
import firebase from '../fire'
import React, {Component} from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import D3 from './components/D3'
import WhatIsYourLine from './components/WhatIsYourLine'
import NotFound from './components/NotFound'
const auth = firebase.auth()
///test
export default class Routes extends Component {
    render() {
        return (
            <div>
                <Router>
                    <div>
                    <Route exact path='/' component={WhatIsYourLine} />
                    <Route path='/:line' component={D3} />
                    {/* <Route path='/*' component={NotFound}/> */}
                    </div>
                </Router>
            </div>
        )
    }
}