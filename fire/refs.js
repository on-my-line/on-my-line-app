import firebase from '../fire'
const db = firebase.database()

exports.getUserExtras = uid => db.ref(`Users/${uid}/`).once('value').then(snapshot => snapshot.val()).catch(console.error)

exports.getUserEvents = uid => db.ref(`Users/${uid}/Events`).once('value').then(snapshot => snapshot.val()).catch(console.error)

exports.addUserEvent = (currentThing, user) => {
    db.ref(`Users/${user}/Events/`).push({Yelp: currentThing}).then(event => console.log(event)).catch(console.error)}