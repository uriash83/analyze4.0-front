import * as actionTypes from '../actions/actionsTypes';
import { updateObject } from '../utility';

const initialState = {
    token: null,
    userName: null,
    userId: null,
    error: {
        error: null,
        message: null
    }, 
    loading: false
}

const authStart = (state, action) => {
    return updateObject(state, {
        error: {
            error: null,
            message: null
        },
        userName: null,
        loading: true
    });
}

const authSuccess = (state, action) => {
    console.log(action)
    return updateObject(state, {
        token: action.token.key,
        userName: action.token.user,
        userId: action.token.userId,
        error: {
            error: null,
            message: null
        },
        loading: false
    });
}

const authFail = (state, action) => {
    console.log('ACTIONS')
    console.log(action)
    console.log('ACTION')
    console.log(action.error)
    return updateObject(state, {
        error: {
            message: action.error.message,
            error: action.error.response.data.error
        },
        userName:null,
        loading: false
    });
}

const authLogout = (state, action) => {
    return updateObject(state, {
        token: null,
        userName:null
    });
}


export default function (state = initialState,action) {
    //console.log(action)
    //console.log(FETCH_USER)
    switch (action.type) {
        case actionTypes.AUTH_START: 
            return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: 
            return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: 
            return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: 
            return authLogout(state, action);
        default:
            return state;
    }
}

// const reducer = (state=initialState, action) => {
//     switch (action.type) {
//         case actionTypes.AUTH_START: return authStart(state, action);
//         case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
//         case actionTypes.AUTH_FAIL: return authFail(state, action);
//         case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
//         default:
//             return state;
//     }
// }

