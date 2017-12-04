'use strict';

import React, { Component } from 'react';
import Modal                from 'react-native-modalbox';
import infoStyles           from '../styles/info_page.js';

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

  }

  onModalClose(e) {

  }

  render() {
    return (
      <Modal
        ref={"locationDetails"}
        style={[styles.wrapper]}
        position={"bottom"}
        onClosed={() => {this.onModalClose()}}
      >
        <View style={infoStyles.imageView}>
          <Image
            style={infoStyles.image}
            source={{uri: "../img/Congratulations.png"}}
          />
        </View>

        <Text>
          Congratulations you just got an achievement!
          {"\n\n"}
          <Text>Find the Library Tree</Text>
        </Text>
      </Modal>
    );
  }
}


const localStyles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 300
  }
});
