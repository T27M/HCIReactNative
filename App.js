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
import { PermissionsAndroid } from 'react-native';

import { StackNavigator, } from 'react-navigation';

import ReadMoreView from './components/ReadMoreView';
import HearMoreView from './components/HearMoreView';
import BurgerMenu from "./components/BurgerMenu";


class App extends Component {
  static NAV_NAME = "Index";

  constructor(props, context) {
    super(props, context); 
  }

  async componentWillMount()
  {
    await this.requestCameraPermission();
  }

  async requestCameraPermission() {
    console.log("Called")
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          'title': 'Cool Photo App Camera Permission',
          'message': 'Cool Photo App needs access to your camera ' +
                     'so you can take awesome pictures.'
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the camera")
      } else {
        console.log("Camera permission denied")
      }
    } catch (err) {
      console.warn(err)
    }
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

        <Map
          navigation={this.props.navigation}
          styles={styles}
        />

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
    [BurgerMenu.NAV_NAME]: {
      screen: BurgerMenu
    }
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
  LatLongView: {
    top: 50,
  },
  view: {
    flex: 1,
  }
});
