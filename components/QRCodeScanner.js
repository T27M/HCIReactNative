'use strict';

import React, { Component } from 'react';

import {
  Linking,
  View
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';

export default class ScanScreen extends Component {
  constructor(props){
    super(props);
  }

  onSuccess(e) {
    Console.log(e);
    Linking
      .openURL(e.data)
      .catch(err => console.error('An error occured', err));
  }

  render() {
    return (
        <QRCodeScanner
          onRead={this.onSuccess.bind(this)}
        />
    );
  }
}