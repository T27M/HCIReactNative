import React, { Component } from 'react';

import {
  Platform,
  StyleSheet,
  Text,
  View,
  ListView,
} from 'react-native';

import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell
} from 'react-native-table-component';

import Db from '../data/Db';


const leaderboard = Db.getLeaderboard();
const tableHead = ['User ID', 'Username', 'Score'];
const tableData = [

  [leaderboard[0].userID, leaderboard[0].username, leaderboard[0].score],
  [leaderboard[1].userID, leaderboard[1].username, leaderboard[1].score],
  [leaderboard[2].userID, leaderboard[2].username, leaderboard[2].score],
  [leaderboard[3].userID, leaderboard[3].username, leaderboard[3].score],
  [leaderboard[4].userID, leaderboard[4].username, leaderboard[3].score],

];

export default class TableView extends Component {
  render() {
    return (
      <View>
        <Text style={styles.title}> XPlore Lancaster Leaderboard </Text>

        <Table>
          <Row data = {tableHead} style={styles.head} textStyle={styles.text}/>
          <Rows data = {tableData} style={styles.row} textStyle={styles.text}/>
        </Table>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  head: {
      height: 30,
      backgroundColor: 'pink',
      marginTop: 100,
  },

  text: {
    marginLeft: 5,
    textAlign: 'center',
  },

  row: {
    height: 35,

   },
   title: {
     color: 'black',
     textAlign: 'center',
     fontSize: 35,
     marginTop: 20,
     fontFamily: 'calibri',
   }
});
