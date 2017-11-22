'use strict';

import React, { Component } from 'react';
import NavButtons from './NavButtons';

import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
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
      <ScrollView contentContainerStyle={styles.wrapper}>
        <NavButtons
          navigation={this.props.navigation}
          showBack={true}
          showBurger={true}
        />

        <View style={styles.content}>
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

          <View style={styles.descriptionView}>
            <Text style={styles.description}>
                {this.locationData.description}
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
  },
  titleView: {
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('window').height * 0.25, // can't use '25%' properly with ScrollView
  },
  title: {
    fontSize: 24,
  },
  icon: {
    width: 50,
    height: 50,
    margin: 10,
  },
  imageView: {
    width: '100%',
    height: 200,
    padding: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  descriptionView: {
    margin: 10,
    flex: 1,
    // marginBottom: 500,
  },
  description: {
    textAlign: 'center',
    fontSize: 16,
  },
});
