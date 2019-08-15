import {GET_ALL_ITEMS, SELECT_ITEM, INCREMENT_CURR_ITEM_IDX} from './types'
import {API_URL, HEADERS} from './constants'

const getAllItems = () => {
    return function (dispatch) {
        fetch(`${API_URL}/items`)
        .then(resp => resp.json())
        .then(items => {
            dispatch({type: GET_ALL_ITEMS, payload: items})
        }) 
    }
}

const selectItem = (item) => {
    return {
        type: SELECT_ITEM,
        payload: item
    }
}

const incrementCurrItemIdx = () => {
    return {
        type: INCREMENT_CURR_ITEM_IDX
    }
}


export {
    getAllItems,
    selectItem,
    incrementCurrItemIdx
}