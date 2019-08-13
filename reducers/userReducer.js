import {CREATE_USER, LOGIN, USER_ERROR} from '../actions/types'

const initialState = {
    firstName: '',
    lastName: '',
    userID: '',
    phone: '',
    errors: ''
}

const userReducer = (prevState=initialState, action) => {
    switch(action.type) {
        case USER_ERROR:
            return {...prevState, errors: action.payload}
        case LOGIN:
            return {...prevState, phone: action.payload.phone, firstName: action.payload.firstName, lastName: action.payload.lastName, userID: action.payload.userID}
        default:
            return prevState
    }
}

export default userReducer