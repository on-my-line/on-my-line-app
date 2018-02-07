import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import FlatButton from 'material-ui/FlatButton/FlatButton'
import TextField from 'material-ui/TextField'
import Modal from 'react-modal'


class SingleGooglePageClass extends Component{
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

    shareWithAFriend(reqBody) {
        if(reqBody.toNumber!==''){
            axios.post('/sms', reqBody)
        }
    }
    render(){
        const { currentThing } =  this.props
        return (
        <div>
            <h1>{currentThing.name}</h1>
            {(currentThing.Time)?
                <h2>Opening Times: {currentThing.time}</h2>: ""
            }
            <img src={currentThing.img}/>
            <h3>Address: {currentThing.location}</h3>
            <h3>Phone: {currentThing.phone}</h3>
            <h4><a href={currentThing.url} target="_blank">Site</a></h4>
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

const SingleGooglePage = withRouter(SingleGooglePageClass)

export default SingleGooglePage