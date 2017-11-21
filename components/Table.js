import React, { Component } from 'react';

import {
  Platform,
  StyleSheet,
  Text,
  View,
  ListView,
} from 'react-native';

import Db from '../data/Db';

import Leaderboard from 'react-native-leaderboard';

const leaderboard = Db.getLeaderboard();
const tableHead = ['User ID', 'Username', 'Score'];

export default class TableView extends Component {
  var score;
  constructor(props)
  {
    super(props);
    this.state = {
		score = 0;
		
		getScore(loc_id);
		setScore(userId);
		
        data: [
          {userName:leaderboard[0].username, highScore:leaderboard[0].score},
          {userName:leaderboard[1].username, highScore:leaderboard[1].score},
          {userName:leaderboard[2].username, highScore:leaderboard[2].score},
          {userName:leaderboard[3].username, highScore:leaderboard[3].score},
          {userName:leaderboard[4].username, highScore:leaderboard[4].score}
        ]
    }
  }

      getScore(id) {
        //mapIDToScore
        switch (id) {
            case 1: this.score = this.score + 1;
                    break;
            case 2: this.score = this.score + 2;
                    break;
            case 3: this.score = this.score + 3;
                    break;
            case 4: this.score = this.score + 4;
                    break;
			case 5: this.score = this.score + 5;
                    break;
			case 6: this.score = this.score + 6;
                    break;
			case 7: this.score = this.score + 7;
                    break;
			case 8: this.score = this.score + 8;
                    break;
			case 9: this.score = this.score + 9;
                    break;
			case 10: this.score = this.score + 10;
                    break;
			case 11: this.score = this.score + 11;
                    break;
			case 12: this.score = this.score + 12;
                    break;
			case 13: this.score = this.score + 13;
                    break;
			case 14: this.score = this.score + 14;
                    break;
			case 15: this.score = this.score + 15;
                    break;
			case 16: this.score = this.score + 16;
                    break;
			case 17: this.score = this.score + 17;
                    break;
			case 18: this.score = this.score + 18;
                    break;
			case 19: this.score = this.score + 19;
                    break;
			case 20: this.score = this.score + 20;
                    break;
            default: break;
        }
    //    this.setState({ score })
    }
	
	setScore(userId){
		Db.updateLeaderBoard(userId,score);	
	
	}


  render() {
    return (
        <Leaderboard
          data={this.state.data}
          sortBy='highScore'
          labelBy='userName'/>
        )
  }
};