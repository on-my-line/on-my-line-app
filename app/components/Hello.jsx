import React from 'react'
import firebase from '../../fire'
const auth = firebase.auth()


export default class Hello extends React.Component {
    constructor(){
    super()
    this.state = {
        user: ''
    }
    }
    componentDidMount() {
        this.unsubscribe = auth.onAuthStateChanged(user => this.setState({user}))
    }

    componentWillUnmount() {
        this.unsubscribe()
    }

    render() {
    return (
        <div>
            <h1> Hello 
            {this.state.user.displayName ? 
           " " + this.state.user.displayName :
            null}
            </h1>
        </div>
    )
    }
}