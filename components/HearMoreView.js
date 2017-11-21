'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text
} from 'react-native';

export default class HearMoreView extends Component {
  static NAV_NAME = "HearMore";

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <Text>Hear More Content</Text>
      </View>
    );
  }
}




const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    position: "absolute"
  },
  button: {
    width: 50,
    height: 50,
    margin: 10,
  },
});