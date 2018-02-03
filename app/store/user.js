import firebase from '../../fire'
const auth = firebase.auth()

const GET_CURRENT_USER = 'GET_CURRENT_USER'

const getUser = user => ({ type: GET_CURRENT_USER, user })

export const getCurrentUser = () => {
    return dispatch => {
        return auth.onAuthStateChanged(cU => {
            if(!cU) dispatch(getUser({}))
            else dispatch(getUser(cU))
        })
    }
}

export default function (user = {}, action) {
    switch(action.type) {
        case GET_CURRENT_USER:
            return action.user
        default:
            return user
    }
}