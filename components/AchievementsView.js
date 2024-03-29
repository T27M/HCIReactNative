'use strict';

import React, { Component }   from 'react';
import NavButtons             from './NavButtons';
import infoStyles             from '../styles/info_page';
import accordionStyles        from '../styles/accordion';
import Db                     from '../data/Db';
import AchievementManager     from '../data/AchievementManager';
import Logger                 from '../data/Logger';

import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  StyleSheet,
} from 'react-native';
import Accordion from '@ercpereda/react-native-accordion';

const completeImg = require('../img/achievement_done.png');
const incompleteImg = require('../img/achievement.png');

export default class AchievementsView extends Component {
  static NAV_NAME = "Achievements";

  constructor(props) {
    super(props);

    this.renderAchievement = this.renderAchievement.bind(this);

    this.state = {
      data: []
    }
  }

  async componentWillMount() {
    let achievements = await Db.getAchievements();

    let userId = Db.getCurrentUserId();

    for (let key in achievements) {
      let el = achievements[key];
      el.key = el.id;     // FlatList requires each item to have a key
      el.achieved = await AchievementManager.hasUserAchievedAchievement(userId, el.id);
      achievements[key] = el;
    }

    this.setState({ data: achievements });
  }

  componentDidMount(){
    Logger.logEvent(Logger.FOCUS_EVENT, { component: "Achievements" });
  }

  // renders individual Q and A
  renderAchievement(row) {
    let header = ({ isOpen }) => (
      <View style={accordionStyles.AccordionHeader}>
        <Text style={accordionStyles.AccordionHeaderText}>
          {(isOpen ? "- " : "+ ") + row.item.title}
        </Text>

        <Image
          style={localStyles.tick}
          source={row.item.achieved ? completeImg : incompleteImg}
        />
      </View>
    );

    let content = (
      <View style={accordionStyles.AccordionContent}>
        <Text style={accordionStyles.AccordionContentText}>
          {row.item.description}
        </Text>
      </View>
    );

    return (
      <View style={infoStyles.wrapper}>
        <Accordion
          header={header}
          content={content}
        />
      </View>
    );
  }

  render() {
    return (
      <ScrollView contentContainerStyle={infoStyles.scrollWrapper}>
        <NavButtons
          navigation  = {this.props.navigation}
          showBack    = {true}
          showBurger  = {false}
          showAccept  = {false}
          showDecline = {false}
        />

        <View style={infoStyles.wrapper}>
          <View style={infoStyles.titleView}>
            <Text style={infoStyles.title}>Achievements</Text>

            <Image
              style={infoStyles.icon}
              source={require('../img/achievements_icon.png')}
            />
          </View>

          <View style={infoStyles.contentView}>
            <FlatList
              data={this.state.data}
              renderItem={this.renderAchievement}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const localStyles = StyleSheet.create({
  tick: {
    width: 15,
    height: 15,
    margin: 10,
  },
});
