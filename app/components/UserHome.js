import React, { Component } from 'react'
import firebase from '../../fire'
import { getCurrentUser, addToUserEvents } from '../store'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getUserExtras } from '../../fire/refs'

class UserHome extends React.Component {
    constructor() {
    super()
    
    this.state = {}
    }

    render() {
        return(
            <div>
            </div>
        )
    }
}