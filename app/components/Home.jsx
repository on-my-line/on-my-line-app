import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router'
import WhatIsYourLine from './WhatIsYourLine'
import firebase from '../../fire'
import Hello from './Hello'
import UserLineContainer from './UserLine'
import LogInOut from './LogInOut'
const auth = firebase.auth()


const Home = props => (
  <div className="center-screen">
    <Hello auth={auth} />
    <UserLineContainer />
    <WhatIsYourLine />
    <LogInOut />
  </div>
)

export default Home