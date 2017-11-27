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

  }

  onImagePress(e) {
    this.props.navigation.navigate(TakeImage.NAV_NAME);
    console.log("BUTTY PRESS")
  }

  onFormSubmit(e) {
    console.log("Submit the form of shit")
  }

  render() {
    return (
      <View>
        <NavButtons
          navigation={this.props.navigation}
          showBack={true}
          showBurger={false}
        />

        <View style={styles.view}>
          <FormLabel labelStyle={styles.formLabel}>Add Location Name</FormLabel>
          <FormInput labelStyle={styles.formInput} containerStyle={styles.formInput} />

          <Divider style={{ height: 30 }} />

          <FormLabel labelStyle={styles.formLabel}>Add Location Information</FormLabel>
          <FormInput labelStyle={styles.formInput} containerStyle={styles.formInput}/>

          <Divider style={{ height: 30 }} />

          <Button backgroundColor='#769fe2' title='Add an Image' onPress={this.onImagePress}/>

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
    backgroundColor: 'white',
  },
  formInput: {
    backgroundColor:'white',
  },
  view: {
    top: 60
  }
});
