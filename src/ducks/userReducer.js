import { act } from "react-dom/test-utils"

const initialState = {
    username: '',
    profile_pic:'',
    dota_users_id: 0,
    isLoggedIn: false
}

// const initialState = {
//     user: {},
//     isLoggedIn: false
// }

const MAKE_USER = 'MAKE_USER'
const LOGOUT_USER = 'LOGOUT_USER'

export function logoutUser(){
    return{
        type: LOGOUT_USER,
        payload: initialState
    }
}

export function makeUser(values){
    console.log('redux:', values)
    return{
        type: MAKE_USER,
        payload: values
    }
}

export default function reducer(state = initialState, action){
    switch(action.type){
        case MAKE_USER:
            return {...state, ...action.payload, isLoggedIn: true}
        case LOGOUT_USER:
            return{...state, ...action.payload}
            // return {...state, username: action.payload.username, profile_pic: action.payload.profile_pic, userId: action.payload.dota_users_id,isLoggedIn: true}
        default:
            return initialState
    }
}