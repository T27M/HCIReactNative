'use strict';

import React, { Component } from 'react';
import { FormLabel, FormInput, Divider } from 'react-native-elements';

import {
  StyleSheet,
  View,
  ScrollView,
  ToastAndroid
} from 'react-native';


import AddLocation              from './AddLocation';
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
    this.onInputChange                = this.onInputChange.bind(this);

    this.state = {
      devCode: true
    }
  }

  onFAQClicked(e) {
    this.props.navigation.navigate(FAQsView.NAV_NAME);
  }

  onNewLocationsClicked(e) {
    this.props.navigation.navigate(AddLocation.NAV_NAME);
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
    await Db.initDb().then(() => {
      ToastAndroid.show("Database populated", ToastAndroid.SHORT);
    });
  }

  async onResetDbClicked(e) {
    await Db.resetDb().then(() => {
      ToastAndroid.show("Database reset", ToastAndroid.SHORT);
    });
  }

  onInputChange(e) {
    if(e == "hci-dev-code") {
      this.setState({devCode: true});
    } else {
      this.setState({devCode: false});
    }
  }

  render() {
    return (
      <ScrollView style={styles.wrapper}>
        <NavButtons
          navigation={this.props.navigation}
          showBack={true}
          showBurger={false}
          showAccept={false}
          showDecline={false}
        />

        <View style={styles.buttonWrapper}>
          <Button onPress={this.onFAQClicked}                 style={styles.btn}>FAQs</Button>
          <Button onPress={this.onNewLocationsClicked}        style={styles.btn}>Add a new location</Button>
          <Button onPress={this.onAchievementsClicked}        style={styles.btn}>Achievements</Button>
          <Button onPress={this.onTermsAndConditionsClicked}  style={styles.btn}>Terms and Conditions</Button>

          {this.state.devCode && <Button onPress={this.onAccountSettingsClicked} style={styles.btn}>Account Settings</Button>}
          {this.state.devCode && <Button onPress={this.onInitDbClicked}  style={styles.btn}>Init Db</Button>}     
          {this.state.devCode && <Button onPress={this.onResetDbClicked}  style={styles.btn}>Reset Db</Button>}

          <FormInput
              onChangeText={this.onInputChange}
              defaultValue=""
              secureTextEntry={true}
          />
        </View>
      </ScrollView>
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
