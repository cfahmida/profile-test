import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';
import { Button } from './common';
import firebase from 'firebase';
import { connect } from 'react-redux';
import * as actions from '../actions';
console.ignoredYellowBox = [
    'Setting a timer'
];

// this is the facebook login component, it handles login thorugh the auth_actions action creator - hz
class FacebookAuth extends Component {

    state = {
        userInfo: null,
    };

    componentWillMount(){
        alert('Please enable location services');
    }

    fbButton = () => {
        console.log('fb clicked!!');
        this.props.facebookLogin();
    };


    onAuthComplete = async () => {
        let userInfoResponse = await fetch(
          `https://graph.facebook.com/me?access_token=${this.props.token}&fields=id,name,gender,picture.width(999).height(999),email,verified,birthday,albums{name,photos.limit(6){images}}`
        );
        const userInfo = await userInfoResponse.json().catch(error => console.log(error));
        this.setState({ userInfo });
        console.log(this.state.userInfo);
        if(this.props.token){
            console.log('database hit');
            var database = firebase.database();
            var ref = database.ref('/');
            var userId = this.state.userInfo.id;
            const usersRef = ref.child("users/" + userId);
            // this.state.userInfo.albums.data.forEach((data) => {
            //     if (data.name === 'Profile Pictures') {});
            usersRef.set({
                id: this.state.userInfo.id,
                picture: this.state.userInfo.picture.data.url,
                name: this.state.userInfo.name,
                email: this.state.userInfo.email,
                gender: this.state.userInfo.gender,
                verified: this.state.userInfo.verified,
                // birthday: this.state.userInfo.birthday
            });
            this.props.navigation.navigate('welcome');
        }
    };


    fblogout = () => {
        AsyncStorage.removeItem('fb_token');
        this.props.facebookLogout();
    };

    renderButton() {
        if(this.props.loggedIn){
            return(
                <Button
                    style={styles.box}
                    onPress={this.onAuthComplete.bind(this)}>
                    Welcome
                </Button>
            )
        }
        return(
           <Button
                style={styles.box}
                onPress={this.fbButton.bind(this)}>
                Facebook
            </Button>
        )
    }

    render () {
        return (
            <View style={styles.layoutStyle}>
                {this.renderButton()}
                <Button
                    style={styles.box}
                    onPress={this.fblogout.bind(this)}>
                    Logout
                </Button>
            </View>
        );
    }
}

const styles = {
    box: {
        padding: 25,
        backgroundColor: 'black',
        margin: 5,
    },
    layoutStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        flex:1,
        marginBottom:50
    }
};

function mapStateToProps({ auth }){
    // this lets us have access to the user's fb token
    const { token, loggedIn } = auth;

    return { token, loggedIn };
}

export default connect(mapStateToProps, actions)(FacebookAuth);