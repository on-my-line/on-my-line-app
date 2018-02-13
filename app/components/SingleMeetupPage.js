import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'
import FlatButton from 'material-ui/FlatButton/FlatButton'
import TextField from 'material-ui/TextField'
import Modal from 'react-modal'
import { getUserExtras, addUserEvent } from '../../fire/refs'

const style = {
    image: {
        width: '350px',
        height: '350px'
    },
    div: {
        display: 'flex',
        justifyContent: 'center'

    },
    words: {
        flexDirection: 'column'
    }
}

const mapState = state => ({
    user: state.user, 
    stop: state.stop,
    singleTrainStops: state.singleTrainStops
})

class SingleMeetupPageClass extends Component {
    constructor(props) {
        super(props)

        this.state = {
            modalIsOpen: false,
            toNumber: '',
            url: '',
            message: ''
        }

        this.openModal = this.openModal.bind(this)
        this.afterOpenModal = this.afterOpenModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.shareWithAFriend = this.shareWithAFriend.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.handleAddEvent = this.handleAddEvent.bind(this)
    }

    componentDidMount() {
        getUserExtras(this.props.user.uid)
    }

    handleClick(event, obj) {
        event.preventDefault()
        this.shareWithAFriend(obj)
        this.closeModal()
    }

    handleChange(event) {
        event.preventDefault()
        const stateObj = {}
        stateObj[event.target.name] = event.target.value
        this.setState(stateObj)
    }

    handleAddEvent() {
        const currentThing = this.props.currentThing
        const userId = this.props.user.uid
        const stopName = this.props.singleTrainStops.filter(el => el.properties.STOP_ID === this.props.stop)[0].properties.STOP_NAME
        const savedPlace = {stopName: stopName, ...currentThing}
        addUserEvent(savedPlace, userId)
    }

    openModal() {
        this.setState({ modalIsOpen: true })
    }

    afterOpenModal() {
        this.subtitle.style={
            color: '#ffffff',
            fontFamily: 'Roboto'
        }
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }

    shareWithAFriend(reqBody) { //toNumber, url, message
        if(reqBody.toNumber!==''){
            axios.post('/sms', reqBody)
        }
    }
    render(){
        const { currentThing } =  this.props
        return (
            <div>
                <div className="title-img">
                    <img className='single-page-img' src={currentThing.img ? currentThing.img : "http://mikeschinkel.com/images/meetup-logo-300x220.jpg"} />
              
                        <h3>{currentThing.name}</h3>
                        {currentThing.group && <h3>{currentThing.group}</h3>}
                        {currentThing.price && <h4>${currentThing.price}</h4>}
                        {<h4>{currentThing.location}</h4>}
                        {<h4>{currentThing.date}</h4>}
                        {<h4>{currentThing.start_time}</h4>}
                        <a target="_blank" href={currentThing.url}>See More!</a>
                    
                </div>
                {currentThing.phone &&  <h4>{currentThing.phone}</h4>}
                {currentThing.description &&
                <div dangerouslySetInnerHTML={{ __html: currentThing.description }} />}
                {this.props.user.uid && <FlatButton onClick={this.handleAddEvent} label="Add to your favorites"/>}
                <FlatButton
                label="Share with a Friend"
                onClick={this.openModal}
            />
            <Modal
                isOpen={this.state.modalIsOpen}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                ariaHideApp={false}
                style={{
                    overlay: {
                      position: 'fixed',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: 'rgba(255, 255, 255, 0.75)'
                    },
                    content: {
                      position: 'absolute',
                      top: '30vh',
                      left: '30vw',
                      right: '30vw',
                      background: '#212121',
                      overflow: 'auto',
                      WebkitOverflowScrolling: 'touch',
                      borderRadius: '4px',
                      outline: 'none',
                      padding: '20px'
                    }
                  }}
            >
                <h2 ref={subtitle => this.subtitle = subtitle}>Share with a friend</h2>
                <form name="share-with-a-friend" onSubmit={(event)=>this.handleClick(event, {toNumber: this.state.toNumber, url: currentThing.url, message: this.state.message})}>
                    <label>
                        <TextField
                            name="toNumber"
                            value={this.state.toNumber}
                            floatingLabelText="Number to text"
                            hintText='+155555555'
                            onChange={this.handleChange}
                        />
                        </label>
                        <br />
                        <label>
                        <TextField
                            name="message"
                            value={this.state.message}
                            floatingLabelText="Optional message"
                            onChange={this.handleChange}
                        />
                        <br />
                        <FlatButton type="submit" label="Submit" />
                    </label>
                </form>
            </Modal>
    
            </div>
        )
    }
}

const SingleMeetupPage = withRouter(connect(mapState)(SingleMeetupPageClass))

export default SingleMeetupPage