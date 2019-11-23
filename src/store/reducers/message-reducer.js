import * as actionTypes from '../action/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    isAlertMessage: false
};
const showAlertMessage = ( state, action ) => {
    return updateObject( state, 
        { isAlertMessage: !state.isAlertMessage, 
        } );
};
const messageReducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.SHOW_ALERTMESSAGE: return showAlertMessage(state, action);
        default:
            return state;
    }
};

export default messageReducer;