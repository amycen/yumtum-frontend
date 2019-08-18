import {CHANGE_QUANTITY, PLACE_ORDER, SET_PRICE, GET_ALL_ORDERS} from '../actions/types'

const initialState = {
    quantity: 1,
    item_id: '',
    order_id: '',
    lastOrderItem: '',
    subtotal: 0,
    tax: 0,
    tips: 0,
    allOrders: []
}

const orderReducer = (prevState=initialState, action) => {
    switch(action.type) {
        case CHANGE_QUANTITY:
            return {...prevState, quantity: action.payload}
        case SET_PRICE:
            return {...prevState, subtotal: action.payload.subtotal, tax: action.payload.tax, tips: action.payload.tips}
        case PLACE_ORDER:
            return {...initialState, lastOrderItem: action.payload}
        case GET_ALL_ORDERS:
            return {...prevState, allOrders: action.payload}
        default:
            return prevState
    }
}

export default orderReducer