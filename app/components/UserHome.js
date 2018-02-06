import React from 'react'
import firebase from '../../fire'
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
    }

    componentDidMount() {
        getUserEvents(this.props.user.uid)
        .then(events => this.setState({events}))
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
        let yourEvents = this.seeValues(this.state.events)
        // console.log('YOUR EVENTS', yourEvents[0])
        //let more = yourEvents.map(event => this.seeValues(event))
        // console.log('MORE NESTED EVENTS', more)

        //this.moreFunc(yourEvents[0])

        if(!Object.keys(this.state.events).length) return <div />
        console.log('THIS STATE', this.state.events)
        console.log(yourEvents[0].L4cD1ufGn3nwhNGmLyW)
        console.log('more', this.moreFunc(yourEvents))
        const yourSavedEvents = this.moreFunc(yourEvents)
        return(
            <div>
                <div className="your-events">
                    {yourSavedEvents.map(event => {
                        return (
                        <Card key={event.key}>
                        <CardHeader
                            title={event.name}
                            subtitle={event.location}
                            avatar={<Avatar src={event.img} />}
                        >
                        <CardText>
                            Link to event
                            Text to a friend
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