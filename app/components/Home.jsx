import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router'
import WhatIsYourLine from './WhatIsYourLine'
import firebase from '../../fire'
import Hello from './Hello'
import UserLineContainer from './UserLine'
import LogInOut from './LogInOut'


const Home = props => (
  <div className="center-screen fade">
    <Hello />
    <UserLineContainer />
    <WhatIsYourLine />
  </div>
)

export default Home