import React, {Component} from 'react';
import { View, Text, StyleSheet, Dimensions} from 'react-native';
import { FormLabel, FormInput, Button, Divider } from 'react-native-elements';
import Camera from 'react-native-camera';

export default class TakeImage extends React.Component
{
    constructor(props)
    {
      super(props);
      this.state = {
        renderCamera: true
      }
    }

    takePicture()
    {
      this.camera.capture()
      .then((data) => console.log(data))
      .catch(err => console.error(err));
    }

    renderCam()
    {
      this.setState({renderCamera: !this.state.renderCamera})
    }

    render() {
        const renderCamera = this.state.renderCamera;

        let view = null;
        if (renderCamera) {
          view = <Camera ref={(cam) => {
                             this.camera = cam;
                           }}
                           style={styles.preview}
                           aspect={Camera.constants.Aspect.fill}>
                           <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
                </Camera > ;
        }

        return (
          {view}
        )
}

const styles = StyleSheet.create({
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
}
});
