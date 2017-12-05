import React, { Component } from 'react';
import {
    Text,
    View,
} from 'react-native';

import Db from '../data/Db'

export default class TitleText extends React.Component {
  render() {
    return (
      <Text style={{ fontSize: 48, color: 'red' }}>
        {JSON.stringify(Db.getUsers())}
      </Text>
    )
  }
}
