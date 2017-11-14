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

const leaderboard = Db.getLeaderboard();
const tableHead = ['User ID', 'Username', 'Score'];

export default class TableView extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
        data: [
          {userName:leaderboard[0].username, highScore:leaderboard[0].score},
          {userName:leaderboard[1].username, highScore:leaderboard[1].score},
          {userName:leaderboard[2].username, highScore:leaderboard[2].score},
          {userName:leaderboard[3].username, highScore:leaderboard[3].score},
          {userName:leaderboard[4].username, highScore:leaderboard[3].score}
        ]
    }
  }

  render() {
    return (
        <Leaderboard
          data={this.state.data}
          sortBy='highScore'
          labelBy='userName'/>
        )
  }
};
