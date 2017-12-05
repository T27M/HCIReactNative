'use strict';

import React, { Component } from 'react';
import { FormLabel, FormInput, Divider } from 'react-native-elements';

import {
  StyleSheet,
  View,
  ScrollView,
  ToastAndroid,
  Image,
  Clipboard
} from 'react-native';

import AddLocation              from './AddLocation';
import Button                   from 'react-native-button';
import NavButtons               from './NavButtons';
import FAQsView                 from './FAQsView';
import AccountSettingsView      from './AccountSettingsView';
import AchievementsView         from './AchievementsView';
import TermsAndConditionsView   from './TermsAndConditionsView';
import Db                       from '../data/Db'
import Logger                   from '../data/Logger';

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
      devCode: false
    }
  }

  componentDidMount(){
    Logger.logEvent(Logger.FOCUS_EVENT, { component: "BurgerMenu" });
  }

  onFAQClicked(e) {
    Logger.logEvent(Logger.BUTTON_PRESS_EVENT, { component: "BurgerMenu", button_name: "FAQs" });

    this.props.navigation.navigate(FAQsView.NAV_NAME);
  }

  onNewLocationsClicked(e) {
    Logger.logEvent(Logger.BUTTON_PRESS_EVENT, { component: "BurgerMenu", button_name: "Add Location" });

    this.props.navigation.navigate(AddLocation.NAV_NAME);
  }

  onAchievementsClicked(e) {
    Logger.logEvent(Logger.BUTTON_PRESS_EVENT, { component: "BurgerMenu", button_name: "Achievements" });

    this.props.navigation.navigate(AchievementsView.NAV_NAME);
  }

  onAccountSettingsClicked(e) {
    Logger.logEvent(Logger.BUTTON_PRESS_EVENT, { component: "BurgerMenu", button_name: "Account Settings" });

    this.props.navigation.navigate(AccountSettingsView.NAV_NAME);
  }

  onTermsAndConditionsClicked(e) {
    Logger.logEvent(Logger.BUTTON_PRESS_EVENT, { component: "BurgerMenu", button_name: "T&Cs" });

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

  async copyAndClearLogs(clear) {
    let log = JSON.stringify(await Logger.getlog());

    await Clipboard.setString(log);
    console.log("Log copied to clipboard");

    if (clear) {
      await Logger.clear();
      ToastAndroid.show("Logs Copied and Cleared", ToastAndroid.SHORT);
    } else {
      ToastAndroid.show("Logs Copied", ToastAndroid.SHORT);
    }
  }

  onInputChange(e) {
    if(e.toLowerCase() == "hcidevcode" || e.toLowerCase() == "hci-dev-code") { // hypens are hard
      this.setState({devCode: true});
    } else {
      this.setState({devCode: false});
    }
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.wrapper}>
        <NavButtons
          navigation={this.props.navigation}
          showBack={true}
          showBurger={false}
          showAccept={false}
          showDecline={false}
        />

        <View style={styles.buttonWrapper}>
          <Image
            style={styles.logo}
            source={require('../img/logo.png')}
          />

          <Button onPress={this.onFAQClicked}                 style={styles.btn}>FAQs</Button>
          <Button onPress={this.onNewLocationsClicked}        style={styles.btn}>Add a new location</Button>
          <Button onPress={this.onAchievementsClicked}        style={styles.btn}>Achievements</Button>
          <Button onPress={this.onTermsAndConditionsClicked}  style={styles.btn}>Terms and Conditions</Button>

          {this.state.devCode && <Button onPress={this.onAccountSettingsClicked}        style={styles.btn}>Account Settings</Button>}
          {this.state.devCode && <Button onPress={this.onInitDbClicked}                 style={styles.btn}>Init Db</Button>}
          {this.state.devCode && <Button onPress={this.onResetDbClicked}                style={styles.btn}>Reset Db</Button>}
          {this.state.devCode && <Button onPress={() => this.copyAndClearLogs(false)}   style={styles.btn}>Copy Logs</Button>}
          {this.state.devCode && <Button onPress={() => this.copyAndClearLogs(true)}    style={styles.btn}>Copy & Clear Logs</Button>}
        </View>

        <FormInput
          onChangeText={this.onInputChange}
          defaultValue=""
          secureTextEntry={true}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flexGrow: 1,
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
  logo: {
    width: 200,
    height: 100
  }
});
