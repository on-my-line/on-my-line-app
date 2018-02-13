import React, { Component } from 'react'
import { connect } from 'react-redux'
import firebase from '../../fire'
import { getCurrentUser } from '../store'

const mapState = state => ({user: state.user})
const mapDispatch = dispatch => ({ getUser() { dispatch(getCurrentUser()) } })

class HelloClass extends Component {
    render() {
        if(!this.props.user) return <div />
        return (
            <div className="fade">
                <h1> Hello {this.props.user.displayName && " " + this.props.user.displayName} </h1>
            </div>
        )
    }
}

const Hello = connect(mapState, mapDispatch)(HelloClass)
export default Hello