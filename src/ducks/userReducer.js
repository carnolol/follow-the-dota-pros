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

// export function makeUser(id, username, profilePic){
//     return {
//         type: MAKE_USER,
//         payload:{
//             id,
//             username,
//             profilePic
//         }
//     }
// }

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
            // return {...state, username: action.payload.username, profile_pic: action.payload.profile_pic, userId: action.payload.dota_users_id,isLoggedIn: true}
        default:
            return initialState
    }
}