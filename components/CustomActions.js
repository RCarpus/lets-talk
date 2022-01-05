import react from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';

import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';

//FIREBASE
import firebase from 'firebase';
import 'firebase/firestore';



export default class CustomActions extends react.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: undefined,
    }
  }

  pickImage = async () => {
    /**
     * Ask the user for permission to access the photo gallery.
     * If permission is granted AND they do not cancel the selection, 
     * A message is sent with the image URL
     */
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === 'granted') {
      let result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: 'Images' })
        .catch(error => console.log(error));

      if (!result.cancelled) {
        console.log('not cancelled');
        const imgUrl = await this.uploadImageFetch(result.uri);
        console.log(imgUrl);
        this.props.onSend({image: imgUrl});
      } else console.log('cancelled');
    }
  }

  takePhoto = async () => {
    /**
     * Ask the user for permission to access the photo gallery and the camera.
     * If permission is granted, the user is able to take a picture.
     * If they do not cancel, a message is sent with the new image url
     */
    const statusCameraRoll = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    const statusCamera = await Permissions.askAsync(Permissions.CAMERA);
    console.log(statusCameraRoll.status, statusCamera.status);
    if (statusCameraRoll.status === 'granted' && statusCamera.status === 'granted') {
      console.log('granted');
      let result = await ImagePicker.launchCameraAsync({ mediaTypes: 'Images' })
        .catch(error => console.log(error));

      if (!result.cancelled) {
        console.log('not cancelled');
        this.props.onSend({image: result.uri});
      }
    }
  }

  getLocation = async () => {
    /**
     * Ask the user for permission to access the location data.
     * If permission is granted, get the location and send in a message
     */
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === 'granted') {
      let result = await Location.getCurrentPositionAsync({})
        .catch(error => console.log(error));
      if (result) {
        const location = {
          longitude: result.coords.longitude,
          latitude: result.coords.latitude,
        }
        this.props.onSend({location});
      }
    }
  }

  onActionPress = () => {
    /**
     * This defines the expanding menu that appears when a user clicks the "+" in the message bar.
     * The options array is a list of options the user can choose.
     * The cancelButtonIndex is needed because the components uses that selection to collapse the menu.
     * The options are handled with a switch that calls the appropriate functions for
     * sending a photo or sharing location.
     */
    const options = ['Choose From Library', 'Take Picture', 'Send Location', 'Cancel'];
    const cancelButtonIndex = options.length - 1;
    this.context.actionSheet().showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      async (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            this.pickImage();
            return;
          case 1:
            this.takePhoto();
            return;
          case 2:
            this.getLocation();
            return;
          default:
            return;
        }
      }
    )
  }

  uploadImageFetch = async (uri) => {
    /**
     * Uploads an image to my firestore cloud and returns the url
     */
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });

    const imageNameBefore = uri.split('/');
    const imageName = imageNameBefore[imageNameBefore.length - 1];

    const ref = firebase.storage().ref().child(`images/${imageName}`);

    const snapshot = await ref.put(blob);

    blob.close();

    return await snapshot.ref.getDownloadURL();
  };

  render() {
    // console.log(Object.keys( this.props));
    // console.log(this.props.handleImagePicked);
    return (
      <TouchableOpacity style={s.customActionsButton} onPress={this.onActionPress}
      accessibilityRole='button'
      accessibilityHint='expands a menu to let you take a picture, share a picture, or share your location'
      accessibilityLabel='additional options'
      >

        <View style={[s.customActionsButtonIconWrapper, this.props.wrapperStyle]}>
          <Text style={[s.customActionsButtonIcon, this.props.iconTextStyle]}>+</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const s = StyleSheet.create({
  customActionsButton: {
    height: 26,
    width: 26,
    marginLeft: 10,
    marginBottom: 10,
  },
  customActionsButtonIconWrapper: {
    borderRadius: 13,
    borderColor: '#b2b2b2',
    borderWidth: 2,
    flex: 1
  },
  customActionsButtonIcon: {
    color: '#b2b2b2',
    fontWeight: 'bold',
    fontSize: 16,
    backgroundColor: 'transparent',
    textAlign: 'center',
  }
})

CustomActions.contextTypes = {
  actionSheet: PropTypes.func,
};