import React, { Component } from 'react';

import {
  Platform,
  StyleSheet,
  Text,
  View,
  ListView,
} from 'react-native';

import Db from '../data/Db';

import Leaderboard from 'react-native-leaderboard';

const users = Db.getUsers();
const tableHead = ['User ID', 'Username', 'Score'];

export default class TableView extends Component {
  constructor(props)
  {
    super(props);

    leaderboardData = [];

    for (let i = 0; i < users.length; i++) {
      leaderboardData.push({
        userName: users[i].username,
        highScore: users[i].score
      });
    }
  }

  async componentWillMount() {
    await this.onFocus(true);
  }

  async onFocus(hasFocus) {
    if (!hasFocus) {
      return;
    }
  }

  render() {
    return (
      <Leaderboard
        data={this.state.data}
        sortBy='highScore'
        labelBy='userName'
        enableEmptySections={true} />
    )
  }
};
