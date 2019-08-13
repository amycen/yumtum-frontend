import {GET_ALL_ITEMS, SELECT_ITEM} from './types'
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
    return function (dispatch) {
        dispatch({
            type: SELECT_ITEM,
            payload: item
        })
    }
}


export {
    getAllItems,
    selectItem
}