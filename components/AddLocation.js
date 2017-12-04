import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import { FormLabel, FormInput, Button, Divider } from 'react-native-elements';

import Camera from 'react-native-camera';
import NavButtons from './NavButtons';
import TakeImage from './TakeImage';

export default class AddLocation extends Component {
  static NAV_NAME = "AddLocation";

  constructor(props) {
    super(props);
  
    this.onImagePress = this.onImagePress.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.updateName   = this.updateName.bind(this);
    this.updateInfo   = this.updateInfo.bind(this);
    this.getPosition  = this.getPosition.bind(this);
    this.cameraCallback  = this.cameraCallback.bind(this);

    this.state = {
      locationName: 'example',
      locationData: 'blah',
      cameraData: null,
      region: null
    }
  }

  async getPosition() {
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

  componentDidMount() {
        this.getPosition();
    }

  onImagePress(e) {
    this.props.navigation.navigate(TakeImage.NAV_NAME, {callback: this.cameraCallback});
  }

  cameraCallback = (camData) => {
    console.log("THIS IS BEING CALLED " + JSON.stringify(camData.path));
    this.setState({cameraData: camData});
  }

  onFormSubmit(e) {
    console.log(this.state);
  }

  updateName(e) {
    this.state.locationName = e
  }

  updateInfo(e) {
    this.state.locationData = e
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
          <FormInput onChangeText={this.updateInfo} labelStyle={styles.formInput} containerStyle={styles.formInput}/>

          <Divider style={{ height: 30 }} />

          <Button backgroundColor='#769fe2' title='Add an Image' cameraCallback={this.cameraCallback} onPress={this.onImagePress}/>

          <Divider style={{ height: 30 }} />

          <Button backgroundColor='#769fe2' title='Submit for Review' onPress={this.onFormSubmit} />
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
