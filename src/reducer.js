import { combineReducers } from 'redux'
import  user  from './redux/User.redux'
import  goodsList  from './redux/GoodsList.redux'

export default combineReducers({user,goodsList})