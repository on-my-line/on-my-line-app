'use strict'
import firebase from '../fire'
import React, {Component} from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import D3 from './components/D3'
import {Switch} from 'react-router'
import SingleStopList from './components/SingleStopList'
import Home from './components/Home'
import Login from './components/Login'
import SignUp from './components/SignUp'
import OneItemPage from './components/OneItemPage'
import NavBar from './components/NavBar'

export default class Routes extends Component {
    render() {
        return (
            <div>
                <Router>
                    <div>
                    <NavBar />
                        <Route exact path='/' component={Home} />
                        <Route exact path='/login' component={Login} />
                        <Route exact path='/signup' component={SignUp} />
                        <Route exact path='/:line/:stopID' component={SingleStopList} />
                        <Route exact path='/:line' component={D3} />
                        <Route exact path='/:line/:stopID/:type/:thingId' component={OneItemPage} />
                    </div>
                </Router>
            </div>
        )
    }
}