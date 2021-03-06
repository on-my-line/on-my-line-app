import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import firebase from '../../fire'
import { getCurrentUser, addToUserEvents } from '../store'
import { getUserExtras, addUserEvent } from '../../fire/refs'
import axios from 'axios'

import FlatButton from 'material-ui/FlatButton/FlatButton'
import TextField from 'material-ui/TextField'
import FontIcon from 'material-ui/FontIcon'
import Modal from 'react-modal'
import Paper from 'material-ui/Paper'
import ReactStars from 'react-stars'

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
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'

    }
}

const mapState = state => ({
    user: state.user,
    stop: state.stop,
    singleTrainStops: state.singleTrainStops
})

const mapDispatch = dispatch => ({ getUser() { dispatch(getCurrentUser()) } })

class SingleYelpPageClass extends Component {
    constructor(props) {
        super(props)

        this.state = {
            modalIsOpen: false,
            toNumber: '',
            url: '',
            message: ''
        }

        this.handleAddEvent = this.handleAddEvent.bind(this)
        this.openModal = this.openModal.bind(this)
        this.afterOpenModal = this.afterOpenModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.shareWithAFriend = this.shareWithAFriend.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }
    
    handleAddEvent() {
        const currentThing = this.props.currentThing
        const userId = this.props.user.uid
        const stopName = this.props.singleTrainStops.filter(el => el.properties.STOP_ID === this.props.stop)[0].properties.STOP_NAME
        const savedPlace = {stopName: stopName, ...currentThing}
        addUserEvent(savedPlace, userId)
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

    render() {
        const { currentThing } = this.props
        return (
            <div>
            <div style={style.div}>
                <img style={style.image} src={currentThing.img ? currentThing.img : "https://yt3.ggpht.com/a-/AK162_53TCkRV0sl6Bx6OpTBE49CVTtyNoJyazMZFg=s900-mo-c-c0xffffffff-rj-k-no"}/>
                <div style={style.words}>
                <h1>{currentThing.name}</h1>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                {currentThing.rating ? <ReactStars count={5} value={currentThing.rating} half={true} edit={false} size={18} color2={'#ffffff'}/> : ""}
                </div>
                {currentThing.price ? <h2>Price: {currentThing.price}</h2> : ""}
                <p>{currentThing.category.map(type => ` ${type} `)}</p>
                <h3>Address: {currentThing.location}</h3>
                <h3>{currentThing.phone}</h3>
                <a target="_blank" href={currentThing.url}><p>see more</p></a>
                </div>
            </div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                {this.props.user.uid && <FlatButton onClick={this.handleAddEvent} label="Add to your favorites"/>}
                <FlatButton
                    label="Share with a Friend"
                    onClick={this.openModal}
                />
            </div>
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

const SingleYelpPage = withRouter(connect(mapState, mapDispatch)(SingleYelpPageClass))

export default SingleYelpPage

