import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';
import firebase from 'firebase';
import {FACEBOOK_LOGIN_SUCCESS, FACEBOOK_LOGIN_FAIL, FACEBOOK_LOGOUT_SCCESS, GET_USER_INFO} from './types';

// How to use AsyncStorage
// AsyncStorage.setItem('fb_token", token);
// AsyncStorage.getItem('fb_token");

export const facebookLogin = () => async dispatch => {
    let token = await AsyncStorage.getItem('fb_token');

    if (token) {
        //Dispatch an action saying FB login is done
        dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
    }else {
        //Start up FB Login process
        doFacebookLogin(dispatch);
    }
};


export const facebookLogout = () => {
    var user = firebase.auth().currentUser;
    if (user !== null) {
        user.delete().then(function () {
            console.log('user has been logged out');
        }).catch(function (error) {
            console.log(error);
        });
    }else {
        console.log('user has not been authenticated');
    }
    return{
        type: FACEBOOK_LOGOUT_SCCESS
    }
};


// export const getUserInfo = async dispatch => {
//     fbUserInfo(dispatch);
// };
//
// const fbUserInfo = async dispatch => {
//     let token = await AsyncStorage.getItem('fb_token');
//     let userInfoResponse = await fetch(
//       `https://graph.facebook.com/me?access_token=${token}&fields=id,name,gender,picture.width(999).height(999),email,verified,birthday,albums{name,photos.limit(6){images}}`
//     );
//     const userInfo = await userInfoResponse.json().catch(error => console.log(error));
//     dispatch({ type: GET_USER_INFO, payload: userInfo });
// };


const doFacebookLogin = async dispatch => {
    let { type, token } = await Facebook.logInWithReadPermissionsAsync('1616836148338714', {
        permissions: ['public_profile', 'email', 'user_photos', 'user_birthday']
    });

    if (type === 'cancel'){
        return dispatch({ type: FACEBOOK_LOGIN_FAIL })
    }

    const credential = firebase.auth.FacebookAuthProvider.credential(token);
    firebase.auth().signInWithCredential(credential).then(result => {
        console.log(result);
    }, error => {
        console.log(error);
    });

    await AsyncStorage.setItem('fb_token', token);
    dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
};




