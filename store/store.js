import { createStore, combineReducers, applyMiddleware } from "redux";
//import thunk from 'redux-thunk'
import userReducer from '../reducers/userReducer'
import thunk from "redux-thunk";
import itemReducer from './../reducers/itemReducer';


const rootReducer = combineReducers({
    user: userReducer,
    item: itemReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store