import {authApi} from "../api/requestApi";
import {stopSubmit} from "redux-form";


// action types
const SET_USER_DATA = 'SET_USER_DATA';

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    errorMessages: []
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}


// action creators
export const setAuthUserData = (userId, email, login, isAuth) => ({type: SET_USER_DATA, payload: {userId, email, login, isAuth}});

// thunk
export const getAuthUserData = () => {
    return (dispatch) => {
        authApi.me().then(response => {
            if (response.data.resultCode === 0) {
                let {id, email, login} = response.data.data;
                dispatch(setAuthUserData(id, email, login, true));
            }
        });
    }
}

export const login = (email, password, rememberMe) => {
    return (dispatch) => {
        authApi.login(email, password, rememberMe).then(response => {
            if (response.data.resultCode === 0) {
                dispatch(getAuthUserData());
            } else if (response.data.resultCode === 1 || 10) {
                let message = response.data.messages.length ? response.data.messages[0] : 'Some error';
                dispatch(stopSubmit('login', {_error: message}));
            }
        });
    }
}

export const logout = () => {
    return (dispatch) => {
        authApi.logout().then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setAuthUserData(null, null, null, false));
            }
        });
    }
}

export default authReducer;