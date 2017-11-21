import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Swiper from 'react-native-swiper'
import randomcolor from 'randomcolor'

import TableView from './components/Table'
import Map from './components/Map'
import ScanScreen from './components/QRCodeScanner'

import { StackNavigator, } from 'react-navigation';

import ReadMoreView from './components/ReadMoreView';
import HearMoreView from './components/HearMoreView';

class App extends Component {
  static NAV_NAME = "Index";

  constructor(props, context) {
    super(props, context);
  }

  viewStyle() {
    return {
      flex: 1,
      backgroundColor: randomcolor(),
      justifyContent: 'center',
      alignItems: 'center',
    }
  }

  render() {
    return (
      <Swiper
        loop={false}
        showsPagination={true}
        index={1}
        showsButtons={true}>

        <View>
          <TableView />
        </View>

        <Map styles={styles} />

        <View style={styles.container}>
          <ScanScreen
            navigation={this.props.navigation}
          />
        </View>
      </Swiper>
    )
  }
}

const Navigator = StackNavigator(
  {
    [App.NAV_NAME]: {
      screen: App,
    },
    [ReadMoreView.NAV_NAME]: {
      screen: ReadMoreView,
    },
    [HearMoreView.NAV_NAME]: {
      screen: HearMoreView,
    },
  },
  {
    headerMode: 'none'
  }
);

export default () => <Navigator />;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 5,
    right: 5,
    bottom: 0,
  },
  button: {
    width: 50,
    height: 50,
    margin: 10,
  },
  view: {
    flex: 1,
  }
});
