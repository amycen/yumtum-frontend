import {GET_ALL_ITEMS, SELECT_ITEM, INCREMENT_CURR_ITEM_IDX} from '../actions/types'

const initialState = {
    allItems: [],
    selectedItem: '',
    currItemIdx: 0
}

const itemReducer = (prevState=initialState, action) => {
    switch(action.type) {
        case GET_ALL_ITEMS:
            return {...prevState, allItems: action.payload}
        /* case SELECT_ITEM:
            return {...prevState, selectedItem: action.payload}
        case INCREMENT_CURR_ITEM_IDX:
            if (prevState.currItemIdx === prevState.allItems.length - 1)
            {
                return {...prevState, currItemIdx: 0}
            }
            else {
                return {...prevState, currItemIdx: prevState.currItemIdx + 1}
            } */
            case SELECT_ITEM:
                if (prevState.currItemIdx === prevState.allItems.length - 1)
                {
                    return {...prevState, currItemIdx: 0, selectedItem: action.payload}
                }
                else {
                    return {...prevState, currItemIdx: prevState.currItemIdx + 1, selectedItem: action.payload}
                } 
        default:
            return prevState
    }
}

export default itemReducer