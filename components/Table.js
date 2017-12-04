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

const tableHead = ['User ID', 'Username', 'Score'];

export default class TableView extends Component {
  constructor(props) {
    super(props);

    this.onFocus = this.onFocus.bind(this);

    this.state = {
      data: []
    }
  }

  async componentWillMount() {
    await this.onFocus();
  }

  async onFocus(hasFocus) {

    if (!hasFocus) {
      return;
    }

    console.log("Has focus");

    await Db.getUsers().then((value) => {

      users = JSON.parse(value);
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
      <Leaderboard
        data={this.state.data}
        sortBy='highScore'
        labelBy='userName' />
    )
  }
};
