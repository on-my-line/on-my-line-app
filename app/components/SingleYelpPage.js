import React, { Component } from 'react'
import firebase from '../../fire'
import { getCurrentUser, addToUserEvents } from '../store'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getUserExtras } from '../../fire/refs'
import Paper from 'material-ui/Paper'

const mapState = state => ({
    user: state.user
})

const mapDispatch = dispatch => ({
    getUser() {
        dispatch(getCurrentUser())
    },
    addEvent: event => {
        dispatch(addToUserEvents(event))
    }
})

class SingleYelpPageClass extends React.Component {
    constructor() {
    super()
    
    this.state = {}
    
    this.handleAddEvent = this.handleAddEvent.bind(this)
    }
    
    handleAddEvent() {
        const currentThing = this.props.currentThing
        const userId = this.props.user.uid
        this.props.addEvent(currentThing, userId)
    }

    // handleClick(){
    //     if(this.props.line) {
    //     auth.onAuthStateChanged(user => {
    //       if(user && !user.isAnonymous) {
    //           firebase.database().ref(`Users/${user.uid}`)
    //           .set({line:` ${this.props.line}`})
    //           .then(() => {
    //             firebase.database()
    //             .ref(`Users/${user.uid}/line`)
    //             .once('value')
    //             .then(lineVal => this.props.addUserLine(lineVal.val()))
    //           })
    //       }
    //     })
    //     }
    //     this.props.history.push(`/${this.props.line}`)
    //   }
    render() {
        const { currentThing } =  this.props
        return(
            <div>
                <h1>{currentThing.name}</h1>
                <Paper zDepth={1} circle={true}>
                <img src={currentThing.img}/>
                </Paper>
                <h2>Rating: {currentThing.rating}</h2>
                <h2>Price: {currentThing.price}</h2>
                {currentThing.category.map(type => {
                    console.log("CATEGORY ", type)
                    return <h3>{type}</h3>
                })
                }    
                {this.props.user !== "none" ?
                <button onClick={this.handleAddEvent}> Add to my things! </button>
                :
                null}
                <h3>Address: {currentThing.location}</h3>
                <h3>Phone: {currentThing.phone}</h3>
                <h4><a href={currentThing.url} target="_blank">Site</a></h4>
            </div>
        )
    }
}

const SingleYelpPage = withRouter(connect(mapState, mapDispatch)(SingleYelpPageClass))

export default SingleYelpPage

