'use strict';

import React, { Component } from 'react';

import NavButtons from './NavButtons';
import ReadMoreView from './ReadMoreView';
import HearMoreView from './HearMoreView';

import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import Modal            from 'react-native-modalbox';
import QRCodeScanner    from 'react-native-qrcode-scanner';
import Button           from 'react-native-button'

export default class ScanScreen extends Component {

  constructor(props) {
    super(props);

    this.onScannerRead      = this.onScannerRead.bind(this);
    this.onModalClose       = this.onModalClose.bind(this);
    this.onReadMoreClicked  = this.onReadMoreClicked.bind(this);
    this.onHearMoreClicked  = this.onHearMoreClicked.bind(this);
    this.onSeeMoreClicked   = this.onSeeMoreClicked.bind(this);

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

  onScannerRead(e) {
    let jsonData = false;

    try {
      jsonData = JSON.parse(e.data);
    } catch (e) {

    }

    if (jsonData.id !== undefined) {
      this.locationData = jsonData.id;
    }

    console.log(this.locationData);

    this.refs.locationDetails.open()
  }

  onModalClose(e) {
    this.locationData = null;

    this.refs.QRScanner.reactivate()
  }


  onReadMoreClicked(e) {
    this.refs.locationDetails.close();

    this.props.navigation.navigate(ReadMoreView.NAV_NAME);
  }

  onHearMoreClicked(e) {
    this.refs.locationDetails.close();

    this.props.navigation.navigate(HearMoreView.NAV_NAME);
  }

  onSeeMoreClicked(e) {
    console.log("See more clicked");

    // this.refs.locationDetails.close();
    //
    // this.props.navigation.navigate("SeeMore");
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
        />

        <QRCodeScanner
          ref={"QRScanner"}
          topContent={ScanScreen.getTopContent()}
          onRead={(e) => {this.onScannerRead(e)}}
        />

        <Modal
            ref={"locationDetails"}
            style={[styles.modal]}
            position={"bottom"}
            onClosed={() => {this.onModalClose()}}
        >
          <Text style={styles.text}>{(this.locationData !== null ? "You found a location" : "Invalid QR code")}</Text>

          <Button onPress={this.onReadMoreClicked} style={styles.btn}>Read More</Button>
          <Button onPress={this.onHearMoreClicked} style={styles.btn}>Hear More</Button>
          <Button onPress={this.onSeeMoreClicked } style={styles.btn}>See More</Button>
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