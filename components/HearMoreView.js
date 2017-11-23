'use strict';

import React, { Component } from 'react';
import NavButtons from './NavButtons';
import styles     from '../styles/info_page.js';

import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Image,
  ScrollView,
} from 'react-native';

import Sound from 'react-native-sound';
import * as Progress from 'react-native-progress';
import RNFetchBlob from 'react-native-fetch-blob';

export default class HearMoreView extends Component {
  static NAV_NAME = "HearMore";

  constructor(props) {
    super(props);

    this.rewindSound        = this.rewindSound.bind(this);
    this.playSound          = this.playSound.bind(this);
    this.fastforwardSound   = this.fastforwardSound.bind(this);

    this.rewindSpeed        = 10;
    this.fastforwardSpeed   = 10;

    // Enable playback in silence mode
    Sound.setCategory('Playback');

    console.log("Loading MP3 - " + this.locationData.audio);
    RNFetchBlob.config({
      fileCache: true,
    })
    .fetch('GET', this.locationData.audio, {})
    .then((res) => {
      this.sound = new Sound(res.path(), '', (error) => {
        if (error) {
          console.error("Failed to load MP3");
        } else {
          console.log("Loaded MP3");

          this.showAudio = true;
        }
      });
    });

    this.state = {
      progress: 0,
      showAudio: false
    };
  }

  get progress() {
    return this.state.progress;
  }

  set progress(progress) {
    this.setState((state) => {
      state.progress = progress;
      return state;
    });
  }

  get showAudio() {
    return this.state.showAudio;
  }

  set showAudio(showAudio) {
    this.setState((state) => {
      state.showAudio = showAudio;
      return state;
    });
  }

  get locationData() {
    return this.props.navigation.state.params.locationData
  }

  // reset progress whenever component loaded
  componentDidMount(){
    this.progress = 0;
  }

  // handle unmounting of component properly
  componentWillUnmount() {
    clearInterval(this.intervalId);
    this.sound.release();
  }

  // rewind by this.rewindSpeed seconds
  rewindSound() {
    if (this.sound.isLoaded()) {
      this.sound.getCurrentTime((seconds) => {
        console.log(seconds);
        if (seconds > this.rewindSpeed) {
          this.sound.setCurrentTime(seconds - this.rewindSpeed);
        } else {
          this.sound.stop(() => {
            this.playSound();
          });
        }
      });
    }
  }

  // play / pause
  playSound() {
    if (this.sound.isLoaded()) {
      if (this.playing) {
        this.sound.pause();
        this.playing = false;
      } else {
        this.playing = true;

        // Play the sound with an onEnd callback
        this.sound.play((success) => {
          if (!success) {
            this.sound.reset();
          }
          this.sound.release();

          // this.progress = 0;
        });

        let lastTime = 0;

        this.intervalId = setInterval(() => {
          this.sound.getCurrentTime((seconds) => {
            if (seconds == lastTime) {
              clearInterval(this.intervalId);
              return;
            }

            this.progress = seconds / this.sound.getDuration();
            lastTime = seconds;
          });
        }, 200);
      }
    }
  }

  // fast forward by this.fastforwardSpeed seconds
  fastforwardSound() {
    if (this.sound.isLoaded()) {
      this.sound.getCurrentTime((seconds) => {
        if (seconds < this.sound.getDuration() - this.fastforwardSpeed) {
          this.sound.setCurrentTime(seconds + this.fastforwardSpeed);
        } else {
          this.sound.stop();
        }
      });
    }
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <NavButtons
          navigation={this.props.navigation}
          showBack={true}
          showBurger={true}
        />

        <View style={styles.wrapper}>
          <View style={styles.titleView}>
            <Text style={styles.title}>{this.locationData.location}</Text>

            <Image
                style={styles.icon}
                source={require('../img/hear_more_icon.png')}
            />
          </View>

          <View style={styles.imageView}>
            <Image
                style={styles.image}
                source={{uri: this.locationData.img}}
            />
          </View>

          <View style={this.showAudio ? localStyles.audioPlayerView : localStyles.hidden}>
            <View
              style={localStyles.audioPlayerBtns}
            >
              <TouchableOpacity
                onPress={this.rewindSound}
              >
                <Image
                  style={localStyles.smallerButton}
                  source={require('../img/rewind_btn.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this.playSound}
              >
                <Image
                  style={localStyles.button}
                  source={require('../img/play_btn.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this.fastforwardSound}
              >
                <Image
                  style={localStyles.smallerButton}
                  source={require('../img/fastforward_btn.png')}
                />
              </TouchableOpacity>
            </View>

            <Progress.Bar progress={this.progress} width={200} />
          </View>

          <View
            style={this.showAudio ? localStyles.hidden : localStyles.loadingView}
          >
            <Text>Please wait...</Text>
          </View>
        </View>
      </View>
    );
  }
}

const localStyles = StyleSheet.create({
  audioPlayerView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  audioPlayerBtns: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  audioPlayer: {
    textAlign: 'center',
    fontSize: 16,
  },
  button: {
    width: 50,
    height: 50,
    margin: 10,
  },
  smallerButton: {
    width: 40,
    height: 40,
    margin: 10,
  },
  hidden: {
    display: 'none'
  },
  loadingView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  loadingText: {
    textAlign: 'center',
  }
});
