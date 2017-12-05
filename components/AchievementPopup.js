'use strict';

import React, { Component } from 'react';
import Modal                from 'react-native-modalbox';
import infoStyles           from '../styles/info_page.js';
import Logger               from '../data/Logger';

import {
  TouchableOpacity,
  StyleSheet,
  Image,
  View,
  Text
} from 'react-native';


export default class AchievementPopup extends Component {
  constructor(props) {
    super(props);

    if (this.props.onClose === undefined) {
      this.props.onClose = () => {/* do nothing */};
    }
  }

  open() {
    this.refs.modal.open();

    Logger.logEvent(Logger.FOCUS_EVENT, { component: "AchievementPopup" });
  }

  close() {
    this.refs.modal.close();
  }

  render() {
    return (
      <Modal
        ref={"modal"}
        style={[localStyles.wrapper]}
        position={"center"}
        onClose={this.props.onClose}
      >
        <View style={localStyles.imageView}>
          <Image
            style={infoStyles.image}
            source={require('../img/congratulations.png')}
          />
        </View>

        <Text style={infoStyles.content}>
          Congratulations you just got an achievement!
          {"\n\n"}
          <Text style={localStyles.bold}>Find the Library Tree</Text>
        </Text>
      </Modal>
    );
  }
}


const localStyles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 350,
    width: 300
  },
  imageView: {
    top: 0,
    width: 150,
    height: 150,
    margin: 0,
    marginBottom: 20
  },
  bold: {
    fontWeight: 'bold'
  }
});
