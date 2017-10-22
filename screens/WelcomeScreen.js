import React, { Component } from 'react';
import { View, Text, Image, Button } from 'react-native';
import firebase from 'firebase';
import { connect } from 'react-redux';
import * as action from '../actions'
console.ignoredYellowBox = [
    'source.uri should not be an empty string',
    'Setting a timer'
];

class WelcomeScreen extends Component {

    state = {
        userInfo: null,
        email: '',
        name: '',
        fb_picture: '',
        photo: '',
    };

    componentWillMount() {
        this.onWelcome().catch(error => console.log(error));
    }

    navigateToMaps(){
        this.props.navigation.navigate('map')
    }

    onWelcome = async () => {
        let userInfoResponse = await fetch(
          `https://graph.facebook.com/me?access_token=${this.props.token}&fields=id,picture{url}`
        );
        const userInfo = await userInfoResponse.json().catch(error => console.log(error));
        this.setState({ userInfo });
        const rootRef = firebase.database().ref();
        const oneRef = rootRef.child('users/' + this.state.userInfo.id);
        oneRef.on('value', snap => {
            let user = snap.val();
            this.setState({ email: user.email });
            this.setState({ name: user.name });
            this.setState({ fb_picture: user.picture });
            // set predefined photo during profile setup and then let user choose from their profile pics
            // have to iterate ove every pic and give the user the option to select the pic they tap on
            // this.setState({ photo: user.photos[0][0].images[0].source });
        });
        console.log(this.state.photo);
    };

    render() {
        return(
            <View style={{ alignItems: 'center' }}>
                <Image
                    style={{ width: 370, height: 480, borderRadius: 0 }}
                    source={{ uri: this.state.fb_picture }}
                />
                <Text>Email: {this.state.email}</Text>
                <Text>Name: {this.state.name}</Text>
                <Button
                    onPress={this.navigateToMaps.bind(this)}
                    title="Map Screen"
                />
            </View>
        )
    }
}

function mapStateToProps({ auth }){
    // this lets us have access to the user's fb token
    const { token, loggedIn } = auth;

    return { token, loggedIn };
}

export default connect(mapStateToProps, action)(WelcomeScreen);