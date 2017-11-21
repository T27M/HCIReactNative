import React, { Component } from "react";
import { WebGLView } from "react-native-webgl";
import { WebView } from 'react-native';

export default class RedSquareWebGL extends Component {

  // onContextCreate = (gl: WebGLRenderingContext) => {
  //   const rngl = gl.getExtension("RN");
  //   gl.clearColor(1, 0, 0, 1);
  //   gl.clear(gl.COLOR_BUFFER_BIT);
  //   rngl.endFrame();
  // };

  render() {
    return (
      // <WebGLView
      //   style={{ width: 100, height: 100 }}
      //   onContextCreate={this.onContextCreate}
      // />
      <WebView
        source={{ uri: 'https://sketch-by-phone.now.sh/' }}
        style={{ marginTop: 20 }}
      />
    );
  }
}