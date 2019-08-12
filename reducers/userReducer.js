import {CREATE_USER, LOGIN, LOGIN_ERROR} from '../actions/types'

const initialState = {
    firstName: '',
    lastName: '',
    userID: '',
    username: 'TESTING USER',
    errors: ''
}

const userReducer = (prevState=initialState, action) => {
    switch(action.type) {
        case LOGIN_ERROR:
            return {...prevState, errors: action.payload}
        case LOGIN:
            return {...prevState, firstName: action.payload.firstName, lastName: action.payload.lastName, userID: action.payload.userID}
        case CREATE_USER:
            return {...prevState, username: action.payload}
        default:
            return prevState
    }
}

export default userReducer