import React from 'react'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import firebase from '../../fire'
const auth = firebase.auth()

//const allUsers = db.ref('users')
const emailProvider = new firebase.auth.EmailAuthProvider()


export default class LogIn extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
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

        auth.signInWithEmailAndPassword(email, password)
        .catch(console.error)
    }
        // .then((user) => {
        //     console.log(user.uid)
        //     db.ref('users/' + user.uid).set({line: event.target.line.value})
        // })

    render() {
        return(
            <div>
                <h1> Log In </h1>
                <form name="sign-up-form" onSubmit={this.handleClick}>
                    <TextField
                        name="email"
                        value={this.state.email}
                        floatingLabelText="Email"
                        onChange={this.handleChange} /><br />
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