import React from 'react'
import firebase from '../../fire'
import IconButton from 'material-ui/IconButton'
import ContentClear from 'material-ui/svg-icons/content/clear'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import { getCurrentUser, addToUserEvents } from '../store'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getUserEvents } from '../../fire/refs'
import Avatar from 'material-ui/Avatar'

const mapState = state => ({user: state.user})

class UserHomeClass extends React.Component {
    constructor() {
    super()
    this.state = {
        events: {}
    }
    this.seeValues = this.seeValues.bind(this)
    this.moreFunc = this.moreFunc.bind(this)
    this.handleRemoveEvent = this.handleRemoveEvent.bind(this)
    }

    componentDidMount() {
        getUserEvents(this.props.user.uid)
        .then(events => this.seeValues(events))
        .then(events => this.moreFunc(events))
        .then(events => this.setState({events}))
    }

    handleRemoveEvent(a, b) {
        let events = this.state.events.filter(event => event.key !== a)
        firebase.database().ref(`Users/${this.props.user.uid}/Events/Yelp/${'-' + a}/`).remove().catch(console.error)
        this.setState({events})
    }

    seeValues(vals) {
        let arr = []
        for(let keys in vals) {
            arr.push({[keys.slice(1)]: vals[keys]})
        }
        return arr
    }

    moreFunc(arr) {
        return arr.map(event => {
            let key1
            for(let key in event) {
                event[key].key = key
                key1 = event[key]
            }
            return key1
        })
    }



    render() {
        if(!Object.keys(this.state.events).length) return <div />
        return(
            <div className="fade">
                {this.state.events && <h2> Here are some things you thought were cool </h2>}
                <div className="your-events">
                    {this.state.events.map(event => {
                        return (
                        <Card key={event.key}>
                        <CardHeader
                            title={event.name}
                            subtitle={event.stopName}
                            avatar={<Avatar src={event.img} />}
                        >
                        <IconButton
                            onClick={this.handleRemoveEvent.bind(this, event.key)}
                        >
                            <ContentClear/>
                        </IconButton>
                        <CardText>
                            <div className="card-text">
                                <div>
                                    {event.location} <br />
                                    <a target="_blank" href={event.url}>See more</a>
                                </div>
                            </div>
                        </CardText>
                        </CardHeader>
                        </Card>
                    )
                    })}
                </div>
            </div>
        )
    }
}

const UserHome = connect(mapState)(UserHomeClass)

export default UserHome