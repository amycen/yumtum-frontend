import {CREATE_USER, LOGIN, LOGIN_ERROR} from './types'

const createUser = (username) => {
    return {
        type: CREATE_USER,
        payload: username
    }
}

const login = ({username, password}) => {
    return function (dispatch) {
        fetch('https://red-chipmunk-49.localtunnel.me/login', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({username: username, password: password})
        })
        .then(resp => resp.json())
        .then(user => {
            if (user.errors) {
                dispatch({type: LOGIN_ERROR, payload: user.errors})
            }
            else {
                dispatch({type: LOGIN, payload: {
                    firstName: user.first_name,
                    lastName: user.last_name,
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