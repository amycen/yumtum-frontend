import {CREATE_USER, LOGIN, USER_ERROR} from './types'
import {API_URL, HEADERS} from './constants'

const createUser = ({firstName, lastName, phone, email, password}) => {
    return function (dispatch) {
        fetch(`${API_URL}/signup`, {
            method: "POST",
            headers: HEADERS,
            body: JSON.stringify({
                first_name: firstName,
                last_name: lastName,
                phone: phone,
                email: email,
                password: password
            })
        })
        .then(resp => resp.json())
        .then(user => {
            if (user.errors) {
                dispatch({type: USER_ERROR, payload: user.errors})
            }
            else {
                dispatch({type: LOGIN, payload: {
                    firstName: user.first_name,
                    lastName: user.last_name,
                    phone: user.phone,
                    userID: user.id
                }})
            }
        }) 
    }
    
}

const login = ({email, password}) => {
    return function (dispatch) {
        fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({email: email.toLowerCase(), password: password})
        })
        .then(resp => resp.json())
        .then(user => {
            if (user.errors) {
                dispatch({type: USER_ERROR, payload: user.errors})
            }
            else {
                dispatch({type: LOGIN, payload: {
                    firstName: user.first_name,
                    lastName: user.last_name,
                    phone: user.phone,
                    userID: user.id
                }})
            }
        }) 
    }
}



export {
    createUser,
    login
}