import React from 'react'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import firebase from '../../fire'
import { withRouter } from 'react-router-dom'
const auth = firebase.auth()

class LogInClass extends React.Component {
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
        .then(() => this.props.history.push(`/`))
        .catch(console.error)
    }

    render() {
        return(
            <div className="center-screen fade">
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
                        <FlatButton type="submit" label="Log In" />
                    </div>
                </form>
            </div>
        )
    }
}

const Login = withRouter(LogInClass)

export default Login