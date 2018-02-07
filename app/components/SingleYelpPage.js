import React, { Component } from 'react'
import firebase from '../../fire'
import { getCurrentUser, addToUserEvents } from '../store'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getUserExtras, addUserEvent } from '../../fire/refs'
import Paper from 'material-ui/Paper'

const mapState = state => ({
    user: state.user,
    stop: state.stop, //id
    singleTrainStops: state.singleTrainStops
})

const mapDispatch = dispatch => ({
    getUser() {
        dispatch(getCurrentUser())
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
        const stopName = this.props.singleTrainStops.filter(el => el.properties.STOP_ID === this.props.stop)[0].properties.STOP_NAME
        const savedPlace = {stopName: stopName, ...currentThing}
        addUserEvent(savedPlace, userId)
    }
    
    render() {
            const { currentThing } =  this.props
            return (
                <div>
                    <a target="_blank" href={currentThing.url}><h1>{currentThing.name}</h1></a>
                    {currentThing.rating? <h2>Rating: {currentThing.rating}</h2> : "" }
                    {currentThing.price? <h2>Price: {currentThing.price}</h2> : "" }
                    {this.props.user.uid && <button onClick={this.handleAddEvent}>Add to your events!</button>}
                    {currentThing.category.map(type => {
                        return <p key={type}>#{type}</p>
                    })}
                    {currentThing.img? <img src={currentThing.img}/> : <img src=""/>}
                    <h3>Address: {currentThing.location}</h3>
                    <h3>Phone: {currentThing.phone}</h3>
                </div>
            )
    }
}

const SingleYelpPage = withRouter(connect(mapState, mapDispatch)(SingleYelpPageClass))

export default SingleYelpPage

