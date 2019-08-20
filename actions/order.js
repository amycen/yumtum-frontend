import {CHANGE_QUANTITY, PLACE_ORDER, SET_PRICE, GET_ALL_ORDERS} from './types'
import {API_URL, HEADERS} from './constants'

const changeQuantity = (quantity) => {
    return {
        type: CHANGE_QUANTITY,
        payload: quantity
    }
}

const setPrice = (subtotal, tax, tips) => {
    return {
        type: SET_PRICE,
        payload: {
            subtotal,
            tax, 
            tips
        }
    }
}

const placeOrder = (userID, restaurantID, quantity, itemID, subtotal, tax, tips) => {
    return function (dispatch) {
        fetch(`${API_URL}/orders`, {
            method: 'POST',
            headers: HEADERS,
            body: JSON.stringify({
                user_id: userID,
                restaurant_id: restaurantID,
                status: 'PENDING',
                subtotal: subtotal,
                tips: tips,
                tax: tax
            })
        })
        .then(resp => resp.json())
        .then(order => {
            fetch(`${API_URL}/order_items`, {
                method: 'POST',
                headers: HEADERS,
                body: JSON.stringify({
                    order_id: order.id,
                    item_id: itemID,
                    quantity: quantity
                })
            })
            .then( resp => resp.json())
            .then(orderItem =>  dispatch({
                type: PLACE_ORDER,
                payload: orderItem//need to refactor to return order with order Items
            }))  
        })
    }
}

const getAllOrders = (userID) => {
    return function (dispatch) {
        fetch(`${API_URL}/get_orders/${userID}`)
        .then(resp => resp.json())
        .then(orders => dispatch({
            type: GET_ALL_ORDERS,
            payload: orders
        }))
    }
}

export {
    changeQuantity,
    placeOrder,
    setPrice,
    getAllOrders
}