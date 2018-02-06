import React, { Component } from 'react'
import firebase from '../../fire'
import { getCurrentUser } from '../store'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getUserExtras } from '../../fire/refs'
import axios from 'axios'
import FlatButton from 'material-ui/FlatButton/FlatButton'
import TextField from 'material-ui/TextField'
import Modal from 'react-modal'

const mapState = state => ({
    user: state.user
})

const mapDispatch = dispatch => ({
    getUser() {
        dispatch(getCurrentUser())
    }
})

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

    componentDidMount() {
        getUserExtras(this.props.user.uid)
            .then(userExtras => console.log(userExtras))
    }

    handleAddEvent() {
        const currentThing = this.props.currentThing
        firebase.database().ref(`Users/${this.props.user.uid}/Events/`)
            .push({ Yelp: currentThing })
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
                <h1><a target="_blank" href={currentThing.url}>{currentThing.name}</a></h1>
                {currentThing.rating ? <h2>Rating: {currentThing.rating}</h2> : ""}
                {currentThing.price ? <h2>Price: {currentThing.price}</h2> : ""}
                {currentThing.category.map(type => {
                    return <p key={type}>#{type}</p>
                })}
                {currentThing.img ? <img src={currentThing.img} /> : <img src="" />}
                <h3>Address: {currentThing.location}</h3>
                <h3>Phone: {currentThing.phone}</h3>
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

const SingleYelpPage = withRouter(connect(mapState, mapDispatch)(SingleYelpPageClass))

export default SingleYelpPage

