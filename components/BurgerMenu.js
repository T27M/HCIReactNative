'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
} from 'react-native';

import Button                   from 'react-native-button';

import NavButtons               from './NavButtons';
import FAQsView                 from './FAQsView';
import AccountSettingsView      from './AccountSettingsView';
import AchievementsView         from './AchievementsView';
import TermsAndConditionsView   from './TermsAndConditionsView';
import Db                       from '../data/Db'

export default class BurgerMenu extends Component {
  static NAV_NAME = "BurgerMenu";

  constructor(props) {
    super(props);

    this.onFAQClicked                 = this.onFAQClicked.bind(this);
    this.onNewLocationsClicked        = this.onNewLocationsClicked.bind(this);
    this.onAchievementsClicked        = this.onAchievementsClicked.bind(this);
    this.onAccountSettingsClicked     = this.onAccountSettingsClicked.bind(this);
    this.onTermsAndConditionsClicked  = this.onTermsAndConditionsClicked.bind(this);
  }

  onFAQClicked(e) {
    this.props.navigation.navigate(FAQsView.NAV_NAME);
  }

  onNewLocationsClicked(e) {
    console.log("Add New Location Clicked");
  }

  onAchievementsClicked(e) {
    this.props.navigation.navigate(AchievementsView.NAV_NAME);
  }

  onAccountSettingsClicked(e) {
    this.props.navigation.navigate(AccountSettingsView.NAV_NAME);
  }

  onTermsAndConditionsClicked(e) {
    this.props.navigation.navigate(TermsAndConditionsView.NAV_NAME);
  }

  async onInitDbClicked(e) {
    await Db.initDb();
  }

  async onResetDbClicked(e) {
    await Db.resetDb();
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
          <Button onPress={this.onFAQClicked}                 style={styles.btn}>FAQs</Button>
          <Button onPress={this.onNewLocationsClicked}        style={styles.btn}>Add a new location</Button>
          <Button onPress={this.onAchievementsClicked}        style={styles.btn}>Achievements</Button>
          <Button onPress={this.onAccountSettingsClicked}     style={styles.btn}>Account Settings</Button>
          <Button onPress={this.onTermsAndConditionsClicked}  style={styles.btn}>Terms and Conditions</Button>
          <Button onPress={this.onInitDbClicked}  style={styles.btn}>Init Db</Button>          
          <Button onPress={this.onResetDbClicked}  style={styles.btn}>Reset Db</Button>
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
