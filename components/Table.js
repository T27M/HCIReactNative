import React, { Component } from 'react';

import {
  Platform,
  StyleSheet,
  Text,
  View,
  ListView,
} from 'react-native';

import Db           from '../data/Db';
import Logger       from '../data/Logger'
import Leaderboard  from 'react-native-leaderboard';
import NavButtons   from './NavButtons';

export default class TableView extends Component {
  constructor(props) {
    super(props);

    this.onFocus = this.onFocus.bind(this);

    this.state = {
      data: []
    }
  }

  async componentWillMount() {
    await this.onFocus(true);
  }

  async onFocus(hasFocus) {
    if (!hasFocus) {
      return;
    }

    await Logger.logEvent("onFocus", "", { component: "Table" });

    await Db.getUsers().then((users) => {
      leaderboardData = [];

      for (let i = 0; i < users.length; i++) {
        leaderboardData.push({
          userName: users[i].username,
          highScore: users[i].score
        });
      }

      this.setState({ data: leaderboardData });
    }).catch((e) => {
      console.log(e);
    });
  }

  render() {
    return (
      <View>
        <NavButtons
          navigation  = {this.props.navigation}
          showBack    = {false}
          showBurger  = {true}
          showAccept  = {false}
          showDecline = {false}
        />
        <View style={{top: 60}}>
          <Leaderboard
            data={this.state.data}
            sortBy='highScore'
            labelBy='userName'
            enableEmptySections={true}
          />
        </View>
      </View>
    )
  }
};
