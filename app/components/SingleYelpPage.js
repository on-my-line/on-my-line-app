import React, { Component } from 'react'
import firebase from '../../fire'
import { getCurrentUser } from '../store'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getUserExtras } from '../../fire/refs'
import axios from 'axios'
import FlatButton from 'material-ui/FlatButton/FlatButton';

const mapState = state => ({
    user: state.user
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
    this.shareWithAFriend = this.shareWithAFriend.bind(this)
    }

    componentDidMount() {
        getUserExtras(this.props.user.uid)
        .then(userExtras => console.log(userExtras))
    }

    handleAddEvent() {
        const currentThing = this.props.currentThing
        firebase.database().ref(`Users/${this.props.user.uid}/Events/`)
        .push({Yelp: currentThing})
    }

    shareWithAFriend(reqBody){
        console.log("Sending SMS")
        axios.post('/sms', reqBody)
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
        console.log("CurrentThingL ", this.props.currentThing)
        const { currentThing } =  this.props
        return(

        <div>
            <h1><a target="_blank" href={currentThing.url}>{currentThing.name}</a></h1>
            {currentThing.rating? <h2>Rating: {currentThing.rating}</h2> : "" }
            {currentThing.price? <h2>Price: {currentThing.price}</h2> : "" }
            {currentThing.category.map(type => {
                return <p key={type}>#{type}</p>
            })}
            {currentThing.img? <img src={currentThing.img}/> : <img src=""/>}
            <h3>Address: {currentThing.location}</h3>
            <h3>Phone: {currentThing.phone}</h3>
            <FlatButton
            label="Share with a Friend"
            onClick={this.shareWithAFriend({toNumber: 'PUT IN A PHONE NUMBER', url: currentThing.url, message: "Hey Sierra check this out!"})}
            />
        </div>
    )

    }
}

const SingleYelpPage = withRouter(connect(mapState, mapDispatch)(SingleYelpPageClass))

export default SingleYelpPage

