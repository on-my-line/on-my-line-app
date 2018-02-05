import firebase from '../fire'
const db = firebase.database()

exports.getUserExtras = uid => db.ref(`Users/${uid}/`).once('value').then(snapshot => snapshot.val()).catch(console.error)

exports.getUserEvents = uid => db.ref(`Users/${uid}/Events`).once('value').then(snapshot => snapshot.val()).catch(console.error)