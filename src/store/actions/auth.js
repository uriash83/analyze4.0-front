import axios from 'axios';
import * as actionTypes from './actionsTypes';

export const authStart = () => {
    return{
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = token => {
    return{
        type: actionTypes.AUTH_SUCCESS,
        token: token
    }
}


export const authFail = error => {
    return{
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}


export const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('token') // localStorage in browser
    localStorage.removeItem('userId')
    return {
        type: actionTypes.AUTH_LOGOUT
    };
}


export const checkAuthTimeout = expirationTime => {
    return dispatch => {
        setTimeout( () => {
            dispatch(logout())
        } , expirationTime * 1000)
    }
}

// logowanie z form Login.js
export const authLogin = (username,password) => {
    return dispatch => {
        //console.log('authLogin')
        dispatch(authStart())
        axios.post('http://127.0.0.1:8000/rest-auth/login/', {
            username: username,
            password: password
        })
        .then( res => {

            // z servera otrzymujemy {'key': token.key,
            //                        'user': username,
            //                        'userId': token.user_id 
            //                       }
            const token = res.data.key
            //console.log('RES DATA',res.data)
            const expirationDate = new Date(new Date().getTime() + 3600 * 1000)
            localStorage.setItem('token',token) // localStorage in browser
            localStorage.setItem('expirationDate',expirationDate)
            localStorage.setItem('user',res.data.user)
            localStorage.setItem('userId',res.data.userId)
            dispatch(authSuccess(res.data))
            dispatch(checkAuthTimeout(3600))

        })
        .catch( error => {
            dispatch(authFail(error))
        })
    }
}

export const authSignup = (username, email , password1 , password2) => {
    return dispatch => {
        console.log('authSignup')
        dispatch(authStart())
        axios.post('http://127.0.0.1:8000/rest-auth/registration/', {
            username: username,
            email: email,
            password1: password1,
            password2: password2
        })
        .then( res => {
            const token = res.data.key
            //console.log('RES DATA',res.data)
            const expirationDate = new Date(new Date().getTime() + 3600 * 1000)
            localStorage.setItem('token',token) // localStorage in browser
            localStorage.setItem('expirationDate',expirationDate)
            localStorage.setItem('user',res.data.user)
            localStorage.setItem('userId',res.data.userId)
            dispatch(authSuccess(res.data))
            dispatch(checkAuthTimeout(3600))

        })
        .catch( error => {
            dispatch(authFail(error))
        })
    }
}
// ktoś jest zalogowany ale np. odświeży stronę 
export const authCheckState = () => {
    
    return dispatch => {
        console.log('authCheckState')
        const tokenTemp = localStorage.getItem('token');
        const userTemp = localStorage.getItem('user');
        const userIdTemp = localStorage.getItem('userId');
        //console.log('tok',tokenc, 'user',userc,'iserID',userIdc)
        if (tokenTemp === undefined) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if ( expirationDate <= new Date() ) {
                dispatch(logout());
            } else {
                var token = {
                    key: tokenTemp,
                    user: userTemp,
                    userId: userIdTemp
                }
                dispatch(authSuccess(token));
                dispatch(checkAuthTimeout( (expirationDate.getTime() - new Date().getTime()) / 1000) );
            }
        }
    }
}