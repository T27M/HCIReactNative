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

import { StackNavigator } from 'react-navigation';


import AddLocation              from './components/AddLocation';
import TakeImage                from './components/TakeImage';
import ReadMoreView             from './components/ReadMoreView';
import HearMoreView             from './components/HearMoreView';
import BurgerMenu               from "./components/BurgerMenu";
import FAQsView                 from './components/FAQsView';
import AccountSettingsView      from './components/AccountSettingsView';
import AchievementsView         from './components/AchievementsView';
import TermsAndConditionsView   from './components/TermsAndConditionsView';
import Db from './data/Db';


class App extends Component {
  static NAV_NAME = "Index";

  constructor(props, context) {
    super(props, context);
    this.test = 6;
    this.onIndexChanged = this.onIndexChanged.bind(this);
  }

  async componentWillMount() {
    await Db.initDb();
    await this.requestCameraPermission();
  }

  async requestCameraPermission() {
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

  onIndexChanged(index) {
    this.TableView.onFocus(index == 0);
    this.ScanScreen.onFocus(index == 2); // notify ScanScreen so that it can enable scanning
  }

  render() {
    return (
      <Swiper
        loop={false}
        showsPagination={true}
        index={1}
        showsButtons={true}
        onIndexChanged={this.onIndexChanged}>

        <View>
          <TableView
            ref={(n) => { this.TableView = n }}
          />
        </View>

        <Map
          navigation={this.props.navigation}
          styles={styles}
        />

        <View style={styles.container}>

          <ScanScreen
            ref={(n) => { this.ScanScreen = n }}
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
    },
    [AddLocation.NAV_NAME]: {
      screen: AddLocation,
    },
    [TakeImage.NAV_NAME]: {
      screen: TakeImage,
    },
    [FAQsView.NAV_NAME]: {
      screen: FAQsView,
    },
    [AccountSettingsView.NAV_NAME]: {
      screen: AccountSettingsView,
    },
    [AchievementsView.NAV_NAME]: {
      screen: AchievementsView,
    },
    [TermsAndConditionsView.NAV_NAME]: {
      screen: TermsAndConditionsView,
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
  LatLongView: {
    top: 50,
  },
  view: {
    flex: 1,
  }
});
