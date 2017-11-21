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
import TitleText from './components/TitleText'
import ScanScreen from './components/QRCodeScanner'
import WebGL from './components/WebGL'

import { PermissionsAndroid } from 'react-native';

export default class App extends Component {
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

        <Map styles={styles} />

        <View style={styles.container}>
          <ScanScreen />
        </View>
      </Swiper>
    )
  }
}

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
