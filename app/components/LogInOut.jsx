import React from 'react'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import firebase from '../../fire'
import LoginFireBones from './LoginFireBones';
import SignUp from './SignUp'
import WhoAmI from './WhoAmI'
import UserLineContainer from './UserLine'
const auth = firebase.auth()


export default class LogInOut extends React.Component {
    constructor(props) {
    super(props)
    this.state= {
        user: ''
    }
    }
    componentDidMount() {
        this.unsubscribe = auth.onAuthStateChanged(user => this.setState({user}))
      }

    render() {
        console.log("this state user in LOGINOUT", this.state)
        return(
            <div>
            {this.state.user.isAnonymous ? 
            <SignUp />
            :
            <FlatButton className='logout' onClick={() => auth.signOut()} label="Log Out" />
        }
            </div>
        )
    }
}