'use strict';

import React, { Component } from 'react';

import {
  TouchableOpacity,
  StyleSheet,
  Image,
  View,
  Text
} from 'react-native';

export default class NavButtons extends Component {
  constructor(props) {
    super(props);

    this.onBurgerClicked  = this.onBurgerClicked.bind(this);
    this.onBackClicked    = this.onBackClicked.bind(this);
  }

  onBurgerClicked(e) {
    console.log("Burger Menu Clicked");
  }

  onBackClicked(e) {
    this.props.navigation.goBack(null);
  }

  render() {
    let viewContents = [];

    if (this.props.showBurger || this.props.showBurger === undefined) {
      viewContents.push(
        <TouchableOpacity
          key={"burger"}
          onPress={this.onBurgerClicked}
        >
          <Image
            style={styles.button}
            source={require('../img/burger.png')}
          />
        </TouchableOpacity>
      );
    }

    if (this.props.showBack || this.props.showBack === undefined) {
      viewContents.push(
        <TouchableOpacity
          key={"back"}
          onPress={this.onBackClicked}
        >
          <Image
            style={styles.button}
            source={require('../img/back.png')}
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