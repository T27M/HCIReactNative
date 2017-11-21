import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import { FormLabel, FormInput, Button, Divider } from 'react-native-elements';
import Camera from 'react-native-camera';
import NavButtons from './NavButtons';

export default class AddLocation extends React.Component
{
  static NAV_NAME = "AddLocation";

  render() {
    return (
      <View>
        <NavButtons
          navigation={this.props.navigation}
          showBack={true}
          showBurger={false}
        />

        <FormLabel labelStyle={styles.formLabel}>Add Location Name</FormLabel>
        <FormInput labelStyle={styles.formInput} containerStyle={styles.formInput} />

          <Divider style={{ height: 50, backgroundColor: 'white' }} />

        <FormLabel labelStyle={styles.formLabel}>Add Location Information</FormLabel>
        <FormInput labelStyle={styles.formInput} containerStyle={styles.formInput}/>

          <Divider style={{ height: 50, backgroundColor: 'white' }} />

        <Button backgroundColor='#769fe2' title='Submit an Image'
        onButtonPress={() => {}}
        />

          <Divider style={{ height: 250, backgroundColor: 'white' }} />

        <Button backgroundColor='#769fe2' title='Submit for Review' />
       </ View>
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
  }
});
