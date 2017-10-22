import React, { Component } from 'react';
import { View, Button, Dimensions, Text } from 'react-native';
import { MapView } from 'expo';
import Geocoder from 'react-native-geocoding';
console.ignoredYellowBox = [
    'source.uri should not be an empty string',
    'Setting a timer'
];

const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width;
const SCREEN_HEIGHT = height;
const ASPECT_RATIO = SCREEN_WIDTH / SCREEN_HEIGHT;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


class MapScreen extends Component {

    state = {
        userInfo: null,
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0,
        error: null,
        markerPosition: {
            latitude: 0,
            longitude: 0
        }
    };

    componentWillMount() {
        Geocoder.setApiKey('AIzaSyDHP2hqbr3OivZHlpre-c8PuftMPxr-Vn4');
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                  latitude: parseFloat(position.coords.latitude),
                  longitude: parseFloat(position.coords.longitude),
                  latitudeDelta: LATITUDE_DELTA,
                  longitudeDelta: LONGITUDE_DELTA,
                  error: null,
                  markerPosition: {
                      latitude: this.state.latitude,
                      longitude: this.state.longitude
                  }
                });
            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );
    }


    getCurrentLocation = () => {
        Geocoder.getFromLatLng(this.state.latitude, this.state.longitude).then(
              json => {
                alert(json.results[0].formatted_address);
                console.log(json.results[0].address_components[6].long_name);
              },
              error => {
                console.log(error);
              }
        );
    };

    render() {
        const { latitude, longitude, latitudeDelta, longitudeDelta } = this.state;
        return(
            <View>
                <Text>{latitude + ', ' +longitude + ', ' + latitudeDelta + ', ' + longitudeDelta}</Text>
                <Button
                    onPress={this.getCurrentLocation.bind(this)}
                    title="Get Current Location"
                />
                <MapView
                    style={{ width: 370, height: 520 }}
                    initialRegion={{
                      latitude : latitude,
                      longitude: longitude,
                      latitudeDelta: latitudeDelta,
                      longitudeDelta: longitudeDelta,
                    }}>
                </MapView>
            </View>
        )
    }
}

export default MapScreen;