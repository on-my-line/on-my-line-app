import React from 'react'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import firebase from '../../fire'
const auth = firebase.auth()

//const allUsers = db.ref('users')
const emailProvider = new firebase.auth.EmailAuthProvider()


export default class SignUp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            disName: '',
            email: '',
            password: ''
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    handleChange(event) {
        event.preventDefault()
        const stateObj = {}
        stateObj[event.target.name] = event.target.value
        this.setState(stateObj)
    }

    handleClick(event) {
        event.preventDefault()
        const email = event.target.email.value
        const password = event.target.password.value
        const disName = event.target.disName.value

        auth.createUserWithEmailAndPassword(email, password)
        .then(user => {
            user.updateProfile({
                displayName: disName
            })
            console.log(user)
        })
        .catch(console.error)
    }
        // .then((user) => {
        //     console.log(user.uid)
        //     db.ref('users/' + user.uid).set({line: event.target.line.value})
        // })

    render() {
        return(
            <div>
                <h1> Sign Up </h1>
                <form name="sign-up-form" onSubmit={this.handleClick}>
                <TextField
                        name="disName"
                        value={this.state.disName}
                        floatingLabelText="Name"
                        onChange={this.handleChange} />
                    <TextField
                        name="email"
                        value={this.state.email}
                        floatingLabelText="Email"
                        onChange={this.handleChange} />
                    <TextField
                        name="password"
                        value={this.state.password}
                        floatingLabelText="Password"
                        type="password"
                        onChange={this.handleChange} />
                    <div>
                        <FlatButton type="submit" label="Submit" />
                    </div>
                </form>
            </div>
        )
    }
}