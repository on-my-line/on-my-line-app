import firebase from '../../fire'
const auth = firebase.auth()
import { getUserExtras, addUserEvent } from '../../fire/refs'

const GET_CURRENT_USER = 'GET_CURRENT_USER'

const ADD_USER_EVENT = 'ADD_USER_EVENT'

const getUser = user => ({ type: GET_CURRENT_USER, user })
const addNewEvent = event => ({type: ADD_USER_EVENT, user})

export const getCurrentUser = () => {
    return dispatch => {
        return auth.onAuthStateChanged(cU => {
            if(!cU) dispatch(getUser("none"))
            else { 
                getUserExtras(cU.uid)
                .then(userExtras => cU.Extras=userExtras)
                .then(() => dispatch(getUser(cU)))
            }
        })
    }
}

export const addToUserEvents = event => {
    return dispatch => {
        return addUserEvent(event)
        .then(() => getCurrentUser())
    }
}

export default function (user = "none", action) {
    switch(action.type) {
        case GET_CURRENT_USER:
            return action.user
        default:
            return user
    }
}