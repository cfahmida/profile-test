import React, { Component } from 'react';
import firebase from 'firebase';
import { Provider } from 'react-redux';
import { DrawerNavigator } from 'react-navigation';
import store from './store';
import FacebookAuth from './src/FacebookAuth';
import WelcomeScreen from "./screens/WelcomeScreen";
import MapScreen from "./screens/MapScreen";

export default class App extends Component {

    // Intializing firebase before anything loads - hz
    componentWillMount() {
        var config = {
            apiKey: "AIzaSyATey6H0VnQTyXG197INUCDB98JjTYzUOM",
            authDomain: "foobee-auth.firebaseapp.com",
            databaseURL: "https://foobee-auth.firebaseio.com",
            projectId: "foobee-auth",
            storageBucket: "foobee-auth.appspot.com",
            messagingSenderId: "368695401541"
        };
        firebase.initializeApp(config);
    }

    render() {
        const MainTabNavigator = DrawerNavigator({
            facebook: { screen: FacebookAuth },
            welcome: { screen: WelcomeScreen },
            map: {screen: MapScreen}
        });
        return (
            <Provider store={store}>
                <MainTabNavigator/>
            </Provider>
        );
    }
}

