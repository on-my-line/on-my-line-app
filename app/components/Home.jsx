import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router'
import WhatIsYourLine from './WhatIsYourLine'
import WhoAmI from './WhoAmI'
import firebase from '../../firebase'
// Get the auth API from Firebase.
// Ensure that we have (almost) always have a user ID, by creating
// an anonymous user if nobody is signed in.
//auth.onAuthStateChanged(user => user || auth.signInAnonymously())

const Home = props => (
  <div className="center-screen">
    <WhatIsYourLine />
    {/* <WhoAmI auth={auth} /> */}
  </div>
)

export default Home