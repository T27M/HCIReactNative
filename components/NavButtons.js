'use strict';

import React, { Component } from 'react';

import {
  TouchableOpacity,
  StyleSheet,
  Image,
  View
} from 'react-native';

export default class NavButtons extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    let viewContents = [];

    if (this.props.showBurger || this.props.showBurger === undefined) {
      viewContents["burgerMenu"] = (
        <TouchableOpacity onPress={() => {}}>
          <Image
            style={styles.button}
            source={require('../img/gps_locate.png')}
          />
        </TouchableOpacity>
      );
    }

    if (this.props.showBack || this.props.showBack === undefined) {
      viewContents["backButton"] = (
        <TouchableOpacity onPress={() => {}}>
          <Image
            style={styles.button}
            source={require('../img/gps_locate.png')}
          />
        </TouchableOpacity>
      );
    }

    return (
      <View style={styles.wrapper}>
        {viewContents}
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