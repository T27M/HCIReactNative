'use strict';

import React, { Component } from 'react';
import { Linking }        from 'react-native';

import Db                 from '../data/Db';
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

    this.onScannerRead = this.onScannerRead.bind(this);
    this.onModalClose = this.onModalClose.bind(this);
    this.onReadMoreClicked = this.onReadMoreClicked.bind(this);
    this.onHearMoreClicked = this.onHearMoreClicked.bind(this);
    this.onSeeMoreClicked = this.onSeeMoreClicked.bind(this);

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
    this.refs.QRScanner._setScanning(!focussed); // call _setScanning(false) to reactivate | _setScanning(true) to deactivate. See https://github.com/moaazsidat/react-native-qrcode-scanner/blob/master/index.js
  }

  async onScannerRead(e) {
    console.log(e.data);
    let jsonData = false;

    try {
      jsonData = JSON.parse(e.data);
    } catch (e) {
      // do nothing...
    }

    if (jsonData && jsonData.id !== undefined) {
      let location = Db.getLocation(jsonData.id);

      if (location !== null) {
        this.locationData = location;

        // TODO get user ID
        let userId = 6;

        // update user score
        await Db.addPointsToUser(userId, this.locationData.difficulty).then(() => {
          ToastAndroid.show('Points added...', ToastAndroid.SHORT);
        });

        let achievements = AchievementManager.checkForScanAchievement(userId, this.locationData.id);

        if (achievements.length > 0) {

        }
      }
    }

    this.refs.locationDetails.open()
  }

  onModalClose(e) {
    this.locationData = null;

    this.refs.QRScanner.reactivate();

    return (
      <AchievementPopup />
    )
  }


  onReadMoreClicked(e) {
    this.refs.locationDetails.close();

    this.props.navigation.navigate(ReadMoreView.NAV_NAME, { locationData: this.locationData });
  }

  onHearMoreClicked(e) {
    this.refs.locationDetails.close();

    this.props.navigation.navigate(HearMoreView.NAV_NAME, { locationData: this.locationData });
  }

  onSeeMoreClicked(e) {
    this.refs.locationDetails.close();

    Linking.openURL('https://hcireactar.herokuapp.com/' + this.locationData.id)
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
          navigation={this.props.navigation}
          showBack={false}
          showBurger={true}
          showAccept={false}
          showDecline={false}
        />

        <QRCodeScanner
          ref={"QRScanner"}
          topContent={ScanScreen.getTopContent()}
          onRead={(e) => { this.onScannerRead(e) }}
        />

        <Modal
          ref={"locationDetails"}
          style={[styles.modal]}
          position={"bottom"}
          onClosed={() => { this.onModalClose() }}
        >
          <Text style={styles.text}>{(this.locationData !== null ? "You found " + this.locationData.location + "!" : "Invalid QR code")}</Text>

          <Button onPress={this.onReadMoreClicked} style={styles.btn}>Read More</Button>
          <Button onPress={this.onHearMoreClicked} style={styles.btn}>Hear More</Button>
          <Button onPress={this.onSeeMoreClicked} style={styles.btn}>See More</Button>
        </Modal>
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
