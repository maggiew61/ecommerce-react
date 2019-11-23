import * as actionTypes from '../action/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    expiresIn: null,
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/',
};
/**
 * for loading
 * @param {} state 
 * @param {} action 
 */
const authStart = ( state, action ) => {
    return updateObject( state, { error: null, loading: true } );
};
/**
 * storing the token to access protected data in server in the future
 * set loading to false
 * @param {} state 
 * @param {*} action 
 */
const authSuccess = (state, action) => {
    return updateObject( state, { 
        token: action.idToken,
        userId: action.userId,
        error: null,
        loading: false
     } );
};
const authFail = (state, action) => {
    console.log(state,'-',action)
    return updateObject( state, {
        error: action.error,
        loading: false
    });
};
const authLogout = (state, action) => {
    return updateObject( state, {
        token:null,
        userId: null
    });
};
const clearErrorMessage = (state, action) => {
    return updateObject( state, {
        error: null,
    });
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        // test
        case actionTypes.AUTH_CLEARERROR: return clearErrorMessage(state, action);
        // test
        default:
            return state;
    }
};

export default reducer;