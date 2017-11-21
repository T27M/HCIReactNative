'use strict';

import React, { Component } from 'react';
import NavButtons from './NavButtons';

import {
  StyleSheet,
  View,
  Text
} from 'react-native';

export default class ReadMoreView extends Component {
  static NAV_NAME = "ReadMore";

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <NavButtons
          navigation={this.props.navigation}
          showBack={true}
          showBurger={true}
        />

        <Text>Read More Content</Text>
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