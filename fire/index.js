const firebase = require('firebase')

// -- // -- // -- // Firebase Config // -- // -- // -- //
const config = {
  apiKey: 'AIzaSyCIIAO9N0xWau3Gsv6LFCBmGres-q48u_0',
  authDomain: 'on-my-line.firebaseapp.com',
  databaseURL: 'https://on-my-line.firebaseio.com',
  projectId: 'on-my-line',
  storageBucket: 'on-my-line.appspot.com',
  messagingSenderId: '553434504337'
}
// -- // -- // -- // -- // -- // -- // -- // -- // -- //

// Initialize the app, but make sure to do it only once.
//   (We need this for the tests. The test runner busts the require
//   cache when in watch mode; this will cause us to evaluate this
//   file multiple times. Without this protection, we would try to
//   initialize the app again, which causes Firebase to throw.
//
//   This is why global state makes a sad panda.)
firebase.__bonesApp || (firebase.__bonesApp = firebase.initializeApp(config))

module.exports = firebase
