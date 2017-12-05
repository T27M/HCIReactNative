'use strict';

import React, { Component } from 'react';

import {
  TouchableOpacity,
  StyleSheet,
  Image,
  View,
  Text
} from 'react-native';

import BurgerMenu   from './BurgerMenu';
import TakeImage    from './TakeImage'
import Logger       from '../data/Logger';

export default class NavButtons extends Component {
  constructor(props) {
    super(props);

    this.onBurgerClicked  = this.onBurgerClicked.bind(this);
    this.onBackClicked    = this.onBackClicked.bind(this);
    this.onDeclineClicked = this.onDeclineClicked.bind(this);
    this.onAcceptClicked  = this.onAcceptClicked.bind(this);
  }

  onDeclineClicked(e) {
    Logger.logEvent(Logger.BUTTON_PRESS_EVENT, { component: "NavButtons", button_name: "Decline" });

    this.props.navigation.goBack(null);
    this.props.navigation.navigate(TakeImage.NAV_NAME);
  }

  onBurgerClicked(e) {
    Logger.logEvent(Logger.BUTTON_PRESS_EVENT, { component: "NavButtons", button_name: "Burger Menu" });

    this.props.navigation.navigate(BurgerMenu.NAV_NAME);
  }

  onBackClicked(e) {
    Logger.logEvent(Logger.BUTTON_PRESS_EVENT, { component: "NavButtons", button_name: "Back" });

    this.props.navigation.goBack(null);
  }

  onAcceptClicked(e) {
    Logger.logEvent(Logger.BUTTON_PRESS_EVENT, { component: "NavButtons", button_name: "Accept" });

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

    if (this.props.showAccept || this.props.showAccept === undefined) {
      viewContents.push(
        <TouchableOpacity
          key={"accpet"}
          onPress={this.onAcceptClicked}
        >
          <Image
            style={styles.accept}
            source={require('../img/tick.png')}
          />
        </TouchableOpacity>
      );
    }

    if (this.props.showDecline || this.props.showDecline === undefined) {
      viewContents.push(
        <TouchableOpacity
          key={"decline"}
          onPress={this.onDeclineClicked}
        >
          <Image
            style={styles.decline}
            source={require('../img/cross.png')}
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
  accept: {
    width: 50,
    height: 50,
  },
  decline: {
    width: 50,
    height: 50,
  }
});
