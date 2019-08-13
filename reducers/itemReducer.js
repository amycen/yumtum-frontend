import {GET_ALL_ITEMS, SELECT_ITEM} from '../actions/types'

const initialState = {
    allItems: [],
    selectedItem: ''
}

const itemReducer = (prevState=initialState, action) => {
    switch(action.type) {
        case GET_ALL_ITEMS:
            return {...prevState, allItems: action.payload}
        case SELECT_ITEM:
            return {...prevState, selectedItem: action.payload}
        default:
            return prevState
    }
}

export default itemReducer