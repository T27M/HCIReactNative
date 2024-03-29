import React, {Component} from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity} from 'react-native';
import { FormLabel, FormInput, Button, Divider } from 'react-native-elements';
import Camera       from 'react-native-camera';
import NavButtons   from './NavButtons';
import Logger       from '../data/Logger';

export default class TakeImage extends Component
{
  static NAV_NAME = "TakeImage";
  constructor(props)
  {
    super(props);

    this.sendData = this.sendData.bind(this);
    this.setData = this.setData.bind(this);

    this.state = {
      renderCamera: true,
      data: null
    }
  }

  componentDidMount(){
    Logger.logEvent(Logger.FOCUS_EVENT, { component: "TakeImage" });
  }

  sendData = (camData) => {
    this.props.navigation.state.params.callback(camData);
  }

  setData = (camData) => {
    console.log(camData);
    this.setState({data: camData.path});
    this.setState({renderCamera: false});
    this.sendData(camData);
  }

  takePicture()
  {
    Logger.logEvent(Logger.BUTTON_PRESS_EVENT, { component: "TakeImage", button_name: "Take Picture" });

    this.camera.capture()
    .then((data) => this.setData(data))
    .catch(err => console.error(err));
  }

  renderCam()
  {
    this.setState({renderCamera: !this.state.renderCamera})
  }

  render() {
    let renderCamera = this.state.renderCamera;

    let view = null;

      return (
      (renderCamera &&
        <View style={styles.container}>
          <Camera
            ref={(cam) => {this.camera = cam;}}
            style={styles.preview}
            aspect={Camera.constants.Aspect.fill}>

            <Text style={styles.capture} onPress={this.takePicture.bind(this)}>
            [Take Picture!]
            </Text>
          </Camera>
          <NavButtons
            navigation={this.props.navigation}
            showBack={true}
            showBurger={false}
            showAccept={false}
            showDecline={false}
          />
        </View>
      ) ||
      (!renderCamera &&
        <View style={styles.container}>
          <Image style={styles.camPreview} source={{uri: this.state.data}} />
          <NavButtons
            navigation={this.props.navigation}
            showBack={false}
            showBurger={false}
            showAccept={true}
            showDecline={true}
          />
        </View>
      )
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  },
  camPreview: {
    flex: 1
  },
  button: {
    width: 50,
    height: 50,
    margin: 10,
  }
});
