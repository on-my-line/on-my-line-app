'use strict'
import React, {Component} from 'react'
import { connect } from 'react-redux'
import firebase from '../fire'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import D3 from './components/D3'
import SingleStopList from './components/SingleStopList'
import Home from './components/Home'
import Login from './components/Login'
import SignUp from './components/SignUp'
import OneItemPage from './components/OneItemPage'
import NavBar from './components/NavBar'
import { getCurrentUser } from './store'
import { getUserEvents, getUserExtras } from '../fire/refs'

const mapDispatch = dispatch => ({
    getUser() {
        dispatch(getCurrentUser())
    }
})

class RoutesClass extends Component {

    componentDidMount() {
        this.props.getUser()
    }

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

const Routes = connect(null, mapDispatch)(RoutesClass)
export default Routes