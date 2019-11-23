import axios from 'axios';
import * as actionTypes from './actionTypes'

/**
 * showing loading state + spinner
 */
export const authStart = () => {
    console.log('authstart')
    return{
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};
export const authFail = (error) => {
    console.log('err os',error)
    return{
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}
/**
 *  when logging out, remove local storage items
 */
export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};
/**
 * actively log user out after token has expired while user is still on the app
 * @param {Number} expirationTime 
 */
export const checkAuthTimeout = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const clearErrorMessage = () => {
    return{
        type: actionTypes.AUTH_CLEARERROR
    }
}

// holding the async code doing the authentication,
// so a function which gets dispatch as an argument
// thanks to redux-thunk and in there, I now want to authenticate the user.
export const auth = (email, password, isSignup) => {
    return dispatch => {
       dispatch(authStart()) //authenticate the user
       const authData = {
           email: email,
           password: password,
           returnSecureToken: true
       }
       let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB0ghzUV4KJM2ITx-IHuL0mrqj4SufXYPo';
       if (!isSignup) {
           url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB0ghzUV4KJM2ITx-IHuL0mrqj4SufXYPo';
       }
       axios.post(url, authData)
        .then(response => {
            // store login info & expiration time in localstorage
            localStorage.setItem('token', response.data.idToken)
            const moment = require('moment');
            // outputs a Unix timestamp (the number of seconds since the Unix Epoch). ref: https://stackoverflow.com/questions/35184003/moment-js-convert-milliseconds-into-date-and-time
            const timeToSeconds = moment().unix() 
            const sum = timeToSeconds + parseInt(response.data.expiresIn)
            localStorage.setItem('expirationDate', moment.unix(sum).format("DD MMM YYYY hh:mm a"))
            localStorage.setItem('userId', response.data.localId);
            dispatch(authSuccess(response.data.idToken, response.data.localId));
            dispatch(checkAuthTimeout(response.data.expiresIn));
        })
        .catch(err => {
            console.log('err is',err)
            dispatch(authFail(err.response.data.error));
        });
     }
}

/**
 * check login status upon app 
 * @param {*} expirationTime 
 */
export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        //never logged in
        if(!token){ 
            dispatch(logout())
        //has token
        }else{
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            //token expired
            if (expirationDate <= new Date()){
                dispatch(logout())
            //token is still valid, so login and dispatch checkAuthTimeout()
            }else{
                const userId = new Date(localStorage.getItem('userId'));                
                dispatch(authSuccess(token,userId))
                //first get the difference in milliseconds then divide by 1000 to get seconds
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000 ));                
            }
        }
}
};
