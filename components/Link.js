import React, { Component } from 'react';
import { View, StyleSheet, Button, Linking } from 'react-native';

export default class Link extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Button title="Click me" onPress={() => { Linking.openURL('https://T27M.github.io') }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
});