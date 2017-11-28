'use strict';

import React, { Component } from 'react';
import NavButtons from './NavButtons';
import styles     from '../styles/info_page.js';

import {
  View,
  Text,
  Image,
  ScrollView,
} from 'react-native';

export default class ReadMoreView extends Component {
  static NAV_NAME = "ReadMore";

  constructor(props) {
    super(props);
  }

  get locationData() {
    return this.props.navigation.state.params.locationData
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.scrollWrapper}>
        <NavButtons
          navigation={this.props.navigation}
          showBack={true}
          showBurger={true}
        />

        <View style={styles.wrapper}>
          <View style={styles.titleView}>
            <Text style={styles.title}>{this.locationData.location}</Text>

            <Image
                style={styles.icon}
                source={require('../img/read_more_icon.png')}
            />
          </View>

          <View style={styles.imageView}>
            <Image
                style={styles.image}
                source={{uri: this.locationData.img}}
            />
          </View>

          <View style={styles.contentView}>
            <Text style={styles.content}>
                {this.locationData.description}
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}
