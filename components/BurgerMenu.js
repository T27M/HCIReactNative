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

    this.onFAQClicked                 = this.onFAQClicked.bind(this);
    this.onNewLocationsClicked        = this.onNewLocationsClicked.bind(this);
    this.onAccountSettingsClicked     = this.onAccountSettingsClicked.bind(this);
    this.onTermsAndConditionsClicked  = this.onTermsAndConditionsClicked.bind(this);
  }

  onFAQClicked(e) {
    console.log("FAQ clicked");
  }

  onNewLocationsClicked(e) {
    console.log("Add New Location Clicked");
  }

  onAchievementsClicked(e) {
    console.log("Achievements Clicked");
  }

  onAccountSettingsClicked(e) {
    console.log("Acc Settings Clicked");
  }

  onTermsAndConditionsClicked(e) {
    console.log("T&Cs Clicked");
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
          <Button onPress={this.onFAQClicked}               style={styles.btn}>FAQs</Button>
          <Button onPress={this.onNewLocationsClicked}      style={styles.btn}>Add a new location</Button>
          <Button onPress={this.onAchievementsClicked}      style={styles.btn}>Achievements</Button>
          <Button onPress={this.onAccountSettingsClicked}   style={styles.btn}>Account Settings</Button>
          <Button onPress={this.onFAQClicked}               style={styles.btn}>Terms and Conditions</Button>
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