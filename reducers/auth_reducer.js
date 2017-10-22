    import {FACEBOOK_LOGIN_FAIL, FACEBOOK_LOGIN_SUCCESS, FACEBOOK_LOGOUT_SCCESS, GET_USER_INFO} from "../actions/types";

export default function(state = {}, action) {
    switch (action.type){
        case FACEBOOK_LOGIN_SUCCESS:
            // on successful login the token is now available to all the files through state.auth.tokens
            return { token: action.payload, loggedIn: true };
        case FACEBOOK_LOGOUT_SCCESS:
            return { loggedIn: false, userInfo: null };
        case GET_USER_INFO:
            return { userInfo: action.payload, loggedIn: true };
        case FACEBOOK_LOGIN_FAIL:
            return { token : null, loggedIn: false, userInfo: null };
        default:
            return state;
    }
}