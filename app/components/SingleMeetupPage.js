import React, { Component } from 'react'
import firebase from '../../fire'
import { getCurrentUser, addToUserEvents } from '../store'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getUserExtras, addUserEvent } from '../../fire/refs'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Paper from 'material-ui/Paper'
import Avatar from 'material-ui/Avatar'

const mapState = state => ({
    user: state.user,
    stop: state.stop,
    singleTrainStops: state.singleTrainStops
})

class SingleMeetupPageClass extends React.Component {
    constructor() {
    super()
    this.state = {}
    }

    render() {
        //{currentThing.img ? currentThing.img : "https://thumb7.shutterstock.com/display_pic_with_logo/2117717/504799285/stock-photo-meeting-meetup-organization-text-concept-504799285.jpg"}
        const { currentThing } = this.props
        return (
            <div className="flex-col">
                <Card className="card-padding flex-col">
                    <div className="flex-col">
                    <Avatar
                        src={currentThing.img ? currentThing.img : "https://thumb7.shutterstock.com/display_pic_with_logo/2117717/504799285/stock-photo-meeting-meetup-organization-text-concept-504799285.jpg"}
                        size={150}
                    />
                    <CardTitle title={currentThing.name} subtitle={currentThing.group} />
                    </div>
                    <h1><a target="_blank" href={currentThing.url}></a></h1>
                    {currentThing.price && <h3>$: {currentThing.price}</h3>}
                    {<h2>Where: {currentThing.location}</h2>}
                    {<h2>When: {currentThing.date}</h2>}
                    {<h2>Start Time: {currentThing.start_time}</h2>}
                    {currentThing.phone && <h2>phone: {currentThing.phone}</h2>}
                    <CardText>
                    {currentThing.description &&
                        <div dangerouslySetInnerHTML={{ __html: currentThing.description }} />}
                    </CardText>
                </Card>
            </div>
        )
    }
}

const SingleMeetupPage = connect(mapState)(SingleMeetupPageClass)

export default SingleMeetupPage