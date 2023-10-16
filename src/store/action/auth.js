import * as actionTypes from './actionTypes';
import axios from 'axios';

export const clearError = () => {
    return{
        type: actionTypes.ERROR_NULL,
    };
};


export const authStart = () => {
    return{
        type: actionTypes.AUTH_START,
    };
};

export const authSuccess = (token, userId) => {
    return{ 
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId,
    };
};

export const authFail = (error) => {
    return{
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationDate');
    return{
        type: actionTypes.AUTH_LOGOUT
    };
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const getAuth = (email, password, displayName, isSignup) => {
    return dispatch => {
        dispatch(authStart());

        let authData = {
            email: email,
            password: password,
            displayName: displayName,
            returnSecureToken: true
        }

        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD9l_12owJ9l6DhkOEn9RKiqYKLASKGx0A';

        // In case of signIn
        if(!isSignup){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD9l_12owJ9l6DhkOEn9RKiqYKLASKGx0A';

        }

        axios.post(url, authData)
             .then(response => {

                // preventing tokens from refreshing - convert time from sec to millisec
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('userId', response.data.localId);
                localStorage.setItem('expirationDate', expirationDate);

                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn));
             })
             .catch(err => {
                dispatch(authFail(err.response.data.error))
             });
    };
};


export const authCheckState = () => {

    return dispatch => {

        const token = localStorage.getItem('token');
        const expirationDate = new Date(localStorage.getItem('expirationDate'));
        const userId = localStorage.getItem('userId');

        if(!token || expirationDate <= new Date()){
            dispatch(logout());
        }        

        else{
                dispatch(authSuccess(token, userId));
                // time left
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/1000))
        }
    }
}


// Before Sign in - If ingredients not changed - move to home page after authentication
// Before Sign in - If ingredients are changed - move to checkout page after authentication
export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}
