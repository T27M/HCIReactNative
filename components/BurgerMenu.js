'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
} from 'react-native';

import Button           from 'react-native-button';
import NavButtons       from './NavButtons';

export default class BurgerMenu extends Component {
  static NAV_NAME = "BurgerMenu";

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <NavButtons
          navigation={this.props.navigation}
          showBack={true}
          showBurger={false}
        />

        <View style={styles.buttonWrapper}>
          <Button onPress={() => { console.log("FAQ Clicked")           }} style={styles.btn}>FAQs</Button>
          <Button onPress={() => { console.log("New Loc Clicked")       }} style={styles.btn}>Add a new location</Button>
          <Button onPress={() => { console.log("Acc Settings Clicked")  }} style={styles.btn}>Account Settings</Button>
          <Button onPress={() => { console.log("T&Cs Clicked")          }} style={styles.btn}>Terms and Conditions</Button>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  buttonWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    margin: 10,
    backgroundColor: "#3B5998",
    color: "white",
    padding: 10
  },
});