'use strict';

import React, { Component } from 'react';
import { FormLabel, FormInput, Button, Divider } from 'react-native-elements';
import NavButtons     from './NavButtons';
import infoStyles     from '../styles/info_page';
import formStyles     from '../styles/form';
import Db             from '../data/Db';

import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet
} from 'react-native';

export default class AccountSettingsView extends Component {
  static NAV_NAME = "AccountSettings";

  constructor(props) {
    super(props);

    this.changeUsername = this.changeUsername.bind(this);
    this.resetAccount   = this.resetAccount.bind(this);

    // TODO get current user
    let userId = 6;

    this.user = Db.getUser(userId);

    this.state = {
      username: this.user.username
    };
  }

  changeUsername(username) {
    Db.setUser(this.user.id, {
      username: username
    });
  }

  resetAccount() {
    // reset score
    Db.setUser(this.user.id, {
      score: 0
    });

    // reset achievements
    let achievements = Db.getAchievements();
    achievements.forEach((el) => {
      Db.setAchievement(el.id, {
        achieved: false
      });
    });
  }

  render() {
    return (
      <ScrollView contentContainerStyle={infoStyles.scrollWrapper}>
        <NavButtons
          navigation={this.props.navigation}
          showBack={true}
          showBurger={false}
        />

        <View style={infoStyles.wrapper}>
          <View style={infoStyles.titleView}>
            <Text style={infoStyles.title}>Account Settings</Text>

            <Image
                style={infoStyles.icon}
                source={require('../img/settings_icon.png')}
            />
          </View>

          <View style={infoStyles.contentView}>
            <FormLabel labelStyle={formStyles.formLabel}>Name</FormLabel>
            <FormInput labelStyle={formStyles.formInput} containerStyle={formStyles.formInput}
              onChangeText={this.changeUsername}
              defaultValue={this.state.username}
            />

            <Divider style={formStyles.divider} />

            <Button
              raised
              style={localStyles.reset}
              title={"Reset Account"}
              onPress={this.resetAccount}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const localStyles = StyleSheet.create({
  reset: {
    width: 100
  }
});
