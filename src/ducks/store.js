import reducer from './userReducer'
import {createStore} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
// import PromiseMiddleware from 'redux-promise-middleware'

export default createStore(reducer, composeWithDevTools())