import { combineReducers } from 'redux';
import auth from './auth_reducer';

export default combineReducers({
    auth
});


// Download expo XDE from expo.io
// create a project through expo
// Add host.exp.Exponent as an iOS Bundle ID. Add rRW++LUjmZZ+58EbN5DVhGAnkX4= as an Android key hash
// Add this function to your react native code with the 'user_photos' as permission
// Put this in the App.js:
// logIn = async () => {
//   const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('<APP_ID>', {
//       permissions: ['public_profile'],
//     });
//   if (type === 'success') {
//     // Get the user's name using Facebook's Graph API
//     const response = await fetch(
//       `https://graph.facebook.com/v2.10/me?access_token=${token}&fields=photos{images}`);
//     Alert.alert(
//       'Logged in!',
//       `${(await response.json()).photos}`,
//     );
//   }
// }
// render() {
//    return(
//       <Button
//          style={styles.box}
//          onPress={this.fbButton.bind(this)}>
//          Facebook
//       </Button>
//     )
// }
// log in using that function and user_photos permission and the user photos object should pop up