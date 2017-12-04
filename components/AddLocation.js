import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, ToastAndroid } from 'react-native';
import { FormLabel, FormInput, Button, Divider } from 'react-native-elements';

import Camera from 'react-native-camera';
import NavButtons from './NavButtons';
import TakeImage from './TakeImage';

import Db from '../data/Db';

export default class AddLocation extends Component {
  static NAV_NAME = "AddLocation";

  constructor(props) {
    super(props);

    this.onImagePress = this.onImagePress.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.updateName = this.updateName.bind(this);
    this.updateInfo = this.updateInfo.bind(this);
    this.getPosition = this.getPosition.bind(this);
    this.cameraCallback = this.cameraCallback.bind(this);

    this.state = {
      locationName: '',
      locationData: '',
      cameraData: null,
      region: null,
      error: "No location data"
    }
  }

  async getPosition() {
    if (this.state.error != null) {
      ToastAndroid.show("Location must be enabled to submit locaton. Turn GPS on and try again.", ToastAndroid.LONG);
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          },
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { timeout: 20000, maximumAge: 1000 },
    );
  }

  componentWillMount() {
    this.getPosition();
  }

  onImagePress(e) {
    this.getPosition();
    this.props.navigation.navigate(TakeImage.NAV_NAME, { callback: this.cameraCallback });
  }

  cameraCallback = (camData) => {
    this.getPosition();
    console.log("THIS IS BEING CALLED " + JSON.stringify(camData.path));
    this.setState({ cameraData: camData });
  }

  async onFormSubmit(e) {
    if (this.state.error != null) {
      ToastAndroid.show("Location must be enabled to submit locaton. Turn GPS on and try again.", ToastAndroid.LONG);
      this.getPosition();
      return;
    }

    await Db.addLocation(this.state).then(() => {
      ToastAndroid.show("Location added", ToastAndroid.SHORT);
    }).catch((e) => {
      console.log(e);
    });
  }

  updateName(e) {
    this.setState({locationName : e });
  }

  updateInfo(e) {
    this.setState({locationData: e});
  }

  render() {
    return (
      <View>
        <NavButtons
          navigation={this.props.navigation}
          showBack={true}
          showBurger={false}
          showAccept={false}
          showDecline={false}
        />

        <View style={styles.view}>
          <FormLabel labelStyle={styles.formLabel}>Add Location Name</FormLabel>
          <FormInput onChangeText={this.updateName} labelStyle={styles.formInput} containerStyle={styles.formInput} />

          <Divider style={{ height: 30 }} />

          <FormLabel labelStyle={styles.formLabel}>Add Location Information</FormLabel>
          <FormInput onChangeText={this.updateInfo} labelStyle={styles.formInput} containerStyle={styles.formInput} />
          <Divider style={{ height: 30 }} />

          {!this.state.error ? <Text>Location: {this.state.region.longitude} {this.state.region.latitude}</Text> : null}
          {this.state.error ? <Text>Error: {this.state.error}</Text> : null}

          <Divider style={{ height: 30 }} />

          <Button backgroundColor='#769fe2' title='Add an Image' cameraCallback={this.cameraCallback} onPress={this.onImagePress} />

          <Divider style={{ height: 30 }} />

          {this.state.error && <Button backgroundColor='#769fe2' title='Get location' onPress={this.getPosition} />}

          {!this.state.error && this.state.cameraData != null && this.state.locationName != '' && this.state.locationData != '' &&
            <Button backgroundColor='#769fe2' title='Submit for Review' onPress={this.onFormSubmit} />}
        </View>
      </View>
    )
  } 
}


const styles = StyleSheet.create({
  formLabel: {
    color: 'black',
    fontSize: 15,
  },
  formInput: {
  },
  view: {
    top: 60
  }
});
