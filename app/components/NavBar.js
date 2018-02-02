import React from 'react'
import firebase from '../../fire'
const auth = firebase.auth()


export default class NavBar extends React.Component {
    constructor(){
    super()
        this.state = {}
    }

    render() {
    return (
        <div className="navBar">
        </div>
    )
    }
}