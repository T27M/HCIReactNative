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

export default class AccountSettingsView extends Component {
  static NAV_NAME = "AccountSettings";

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.scrollWrapper}>
        <NavButtons
          navigation={this.props.navigation}
          showBack={true}
          showBurger={false}
        />

        <View style={styles.wrapper}>
          <View style={styles.titleView}>
            <Text style={styles.title}>Account Settings</Text>

            <Image
                style={styles.icon}
                source={require('../img/settings_icon.png')}
            />
          </View>

          <View style={styles.contentView}>
            <Text style={styles.content}>
                Account Settings live here
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}
