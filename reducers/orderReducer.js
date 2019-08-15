import {CHANGE_QUANTITY} from '../actions/types'

const initialState = {
    quantity: 1
}

const orderReducer = (prevState=initialState, action) => {
    switch(action.type) {
        case CHANGE_QUANTITY:
            return {...prevState, quantity: action.payload}
        default:
            return prevState
    }
}

export default orderReducer