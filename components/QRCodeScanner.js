'use strict';

import React, { Component } from 'react';
import { Linking }        from 'react-native';

import Db                 from '../data/Db';
import Logger             from '../data/Logger';
import NavButtons         from './NavButtons';
import ReadMoreView       from './ReadMoreView';
import HearMoreView       from './HearMoreView';
import AchievementManager from '../data/AchievementManager';
import AchievementPopup   from './AchievementPopup';

import {
  View,
  Text,
  StyleSheet,
  ToastAndroid
} from 'react-native';

import Modal from 'react-native-modalbox';
import QRCodeScanner from 'react-native-qrcode-scanner';
import Button from 'react-native-button';

export default class ScanScreen extends Component {

  constructor(props) {
    super(props);

    this.onScannerRead     = this.onScannerRead.bind(this);
    this.onModalClose      = this.onModalClose.bind(this);
    this.onReadMoreClicked = this.onReadMoreClicked.bind(this);
    this.onHearMoreClicked = this.onHearMoreClicked.bind(this);
    this.onSeeMoreClicked  = this.onSeeMoreClicked.bind(this);

    this.state = {
      locationData: null
    };
  }

  get locationData() {
    return this.state.locationData
  }

  set locationData(location) {
    this.setState((state) => {
      state.locationData = location;
      return state;
    });
  }

  componentDidMount() {
    this.onFocus(false);  // start deactivated as swiper defaults on map
  }

  onFocus(focussed) {
    //  this.refs.QRScanner._setScanning(!focussed); // call _setScanning(false) to reactivate | _setScanning(true) to deactivate. See https://github.com/moaazsidat/react-native-qrcode-scanner/blob/master/index.js
    this.setState({ focussed: focussed });   // using this instead of _setScanning as it allows for the camera in AddLocation to load

    if (focussed)
      Logger.logEvent(Logger.FOCUS_EVENT, { component: "QRCodeScanner" });
  }

  async onScannerRead(e) {
    let jsonData = false;

    try {
      jsonData = JSON.parse(e.data);
    } catch (e) {
      // do nothing...
    }

    if (!jsonData || jsonData.id === undefined) {
      return;
    }

    let location = await Db.getLocation(jsonData.id);
    let userId   = Db.getCurrentUserId();

    if (location === null) {
      return;
    }

    Logger.logEvent(Logger.SCAN_EVENT, { locationId: location.id });

    this.setState({ locationData: location });

    let achievements = await AchievementManager.checkForScanAchievement(userId, this.locationData.id);

    let log        = await Db.getUserAchievementEventLog();
    log            = log.filter(event => event.event_type === AchievementManager.SCAN_EVENT);
    let newLocScan = true;
    log.forEach((event) => {
      if (event.locationId === this.locationData.id && event.userId === userId) {
        newLocScan = true;
      }
    });

    if (newLocScan) {
      // update user score
      await Db.addPointsToUser(userId, location.difficulty).then(() => {
        ToastAndroid.show('Points added...', ToastAndroid.SHORT);
      });
    }

    this.refs.locationDetails.open();

    // open this modal after other one to allow for sensible use of back button
    if (achievements.length > 0) {
      this.setState({achievementTitle: achievements[0].title})
      this.refs.popup.open();
    }
  }

  onModalClose(e) {
    this.setState({ locationData: null });

    this.refs.QRScanner.reactivate();
  }

  onReadMoreClicked(e) {
    Logger.logEvent(Logger.BUTTON_PRESS_EVENT, { component: "QRCodeScanner", button_name: "Read More" });

    this.refs.locationDetails.close();

    this.props.navigation.navigate(ReadMoreView.NAV_NAME, { locationData: this.state.locationData });
  }

  onHearMoreClicked(e) {
    Logger.logEvent(Logger.BUTTON_PRESS_EVENT, { component: "QRCodeScanner", button_name: "Hear More" });

    this.refs.locationDetails.close();

    this.props.navigation.navigate(HearMoreView.NAV_NAME, { locationData: this.state.locationData });
  }

  onSeeMoreClicked(e) {
    Logger.logEvent(Logger.BUTTON_PRESS_EVENT, { component: "QRCodeScanner", button_name: "See More" });

    this.refs.locationDetails.close();

    Linking.openURL('https://hcireactar.herokuapp.com/' + this.state.locationData.id)
  }

  static getTopContent() {
    return (
      <Text style={styles.centerText}>Please scan a QR code</Text>
    );
  }

  render() {
    return (
      <View style={styles.wrapper}>

        <NavButtons
          navigation  = {this.props.navigation}
          showBack    = {false}
          showBurger  = {true}
          showAccept  = {false}
          showDecline = {false}
        />
        {this.state.focussed &&
                <QRCodeScanner
                  ref={"QRScanner"}
                  topContent={ScanScreen.getTopContent()}
                  onRead={(e) => { this.onScannerRead(e) }}
                />}

        <Modal
          ref={"locationDetails"}
          style={[styles.modal]}
          position={"bottom"}
          onClosed={() => { this.onModalClose() }}
          backButtonClose={true}
        >
          <Text style={styles.text}>{(this.state.locationData !== null ? "You found " + this.state.locationData.location + "!" : "Invalid QR code")}</Text>

          <Button onPress={this.onReadMoreClicked} style={styles.btn}>Read More</Button>
          <Button onPress={this.onHearMoreClicked} style={styles.btn}>Hear More</Button>
          <Button onPress={this.onSeeMoreClicked} style={styles.btn}>See More</Button>
        </Modal>

        <AchievementPopup
          ref="popup"
          onClose={() => { this.onModalClose() }}
          achievementTitle={this.state.achievementTitle}
         />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 300
  },
  btn: {
    margin: 10,
    backgroundColor: "#3B5998",
    color: "white",
    padding: 10
  },
  btnModal: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 50,
    height: 50,
    backgroundColor: "transparent"
  },
  text: {
    color: "black",
    fontSize: 22
  }
});
