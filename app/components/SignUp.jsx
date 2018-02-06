import React from 'react'
import { withRouter } from 'react-router-dom'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import firebase from '../../fire'
const auth = firebase.auth()

const emailProvider = new firebase.auth.EmailAuthProvider()


class SignUpClass extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            disName: '',
            email: '',
            password: '',
            error: ''
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
        })
        .then(() => this.props.history.push(`/`))
        .catch(err => {
            console.log(err)
            this.setState({error:err.message})
        })
    }
    render() {
        return(
            <div className="center-screen fade">
                <h1> Sign Up </h1>
                <form name="sign-up-form" onSubmit={this.handleClick}>
                <TextField
                        name="disName"
                        value={this.state.disName}
                        floatingLabelText="Name"
                        onChange={this.handleChange} /><br />
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
                        <br />
                    </div>
                </form>
                <div>{this.state.error}</div>                
            </div>
        )
    }
}

const SignUp = withRouter(SignUpClass)

export default SignUp