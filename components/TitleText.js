import React, { Component } from 'react';
import {
    Text,
    View,
  } from 'react-native';

  export default class TitleText extends React.Component {
    render() {
      return (
        <Text style={{ fontSize: 48, color: 'red' }}>
          {this.props.label}
        </Text>
      )
    }
}