import React from 'react'
import firebase from '../../fire'
const auth = firebase.auth()


export default class Hello extends React.Component {
    constructor(){
    super()
    this.state = {}
    }
    componentDidMount() {
        this.unsubscribe = auth.onAuthStateChanged(user => this.setState(user))
    }

    componentWillUnmount() {
        this.unsubscribe()
    }

    render() {
    return (
        <div>
            {console.log('HELLO COMPONENT STATE', this.state)}
            <h1> Hello 
            {this.state.displayName ? 
           this.state.displayName :
            null}
            </h1>
        </div>
    )
    }
}