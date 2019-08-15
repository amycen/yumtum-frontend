import {CHANGE_QUANTITY} from './types'
import {API_URL, HEADERS} from './constants'

const changeQuantity = (quantity) => {
    return {
        type: CHANGE_QUANTITY,
        payload: quantity
    }
}



export {
    changeQuantity
}