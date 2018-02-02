import React from 'react'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import firebase from '../../fire'
import LoginFireBones from './LoginFireBones';
import SignUp from './SignUp'
import WhoAmI from './WhoAmI'
import UserLineContainer from './UserLine'
import Login from './Login'
const auth = firebase.auth()


export default class LogInOut extends React.Component {
    constructor(props) {
    super(props)
        this.state= {}
    }

    componentDidMount() {
        this.unsubscribe = auth.onAuthStateChanged(user => {
            if(user) {
                if(user.isAnonymous) {
                    this.setState(user)
                }
                if(!user.isAnonymous) {
                    this.setState(user)
                }
            }
        })
    }

    render() {
        return(
            <div>
            {this.state.isAnonymous ? 
            <div>
                <SignUp />
                <Login />
            </div>
            :
            <FlatButton className='logout' onClick={() => auth.signOut()} label="Log Out" />
        }
            </div>
        )
    }
}