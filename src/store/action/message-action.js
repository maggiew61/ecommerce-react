import * as actionTypes from './actionTypes'

export const alert = () => {
    return dispatch => {
        dispatch(showAlertMessage())
        dispatch(checkAlertTimeout())
    }
}

/**
 * 到store讓isAlertMessage變為true來開啟alert 
 */
export const showAlertMessage = () => {
    return{
        type: actionTypes.SHOW_ALERTMESSAGE,
    }
}

/**
 * 1.5秒後關閉alert
 * @param {}  
 */
export const checkAlertTimeout = () => {
    return dispatch => {
        setTimeout(() => {
            dispatch(showAlertMessage());
        }, 1500);
    };
};



