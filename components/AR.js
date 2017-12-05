import { Scene, WebGLRenderer }                   from 'three';
import { ARUtils, ARPerspectiveCamera, ARView }   from 'three.ar.js';
import {WebView }                                 from "react-native-webgl"
import React, { Component }                       from 'react';
import Logger                                     from '../data/Logger';
import {
    Text,
    View,
    WebView
} from 'react-native';

const Test = require('../html/test.html');

export default class AR extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    Logger.logEvent(Logger.FOCUS_EVENT, { component: "AR" });
  }

  async init() {
    const display = await ARUtils.getARDisplay();

    const renderer = new WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const arView = new ARView(display, renderer);

    const scene = new Scene();
    const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    var geometry = new BoxGeometry(1, 1, 1);
    var material = new MeshBasicMaterial({ color: 0x00ff00 });
    var cube = new Mesh(geometry, material);
    scene.add(cube);

    return renderer.render(scene, camera);
  }

  render() {
    return (
      <View></View>
    )
  }
}
