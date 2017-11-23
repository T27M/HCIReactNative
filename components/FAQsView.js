'use strict';

import React, { Component } from 'react';
import NavButtons from './NavButtons';
import styles     from '../styles/info_page';

import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  StyleSheet,
} from 'react-native';
import Accordion from '@ercpereda/react-native-accordion';

const FAQs = require('../content/faqs.json');

// FlatList requires each item to have a key
FAQs.forEach((el, i) => {
  el.key = i;
});

export default class FAQsView extends Component {
  static NAV_NAME = "FAQs";

  constructor(props) {
    super(props);

    this.renderFAQ = this.renderFAQ.bind(this);
  }

  // renders individual Q and A
  renderFAQ(row) {
    let header = ({isOpen}) => (
      <View style={localStyles.AccordionHeader}>
        <Text>
          {(isOpen ? "- " : "+ ") + row.item.question}
        </Text>
      </View>
    );

    let content = (
      <View style={localStyles.AccordionContent}>
        <Text style={localStyles.AccordionContentText}>
          {row.item.answer}
        </Text>
      </View>
    );

    return (
      <View style={styles.wrapper}>
        <Accordion
          header={header}
          content={content}
        />
      </View>
    );
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.scrollWrapper}>
        <NavButtons
          navigation={this.props.navigation}
          showBack={true}
          showBurger={false}
        />

        <View style={styles.wrapper}>
          <View style={styles.titleView}>
            <Text style={styles.title}>FAQs</Text>

            <Image
                style={styles.icon}
                source={require('../img/faq_icon.png')}
            />
          </View>

          <View style={styles.contentView}>
            <FlatList
              data={FAQs}
              renderItem={this.renderFAQ}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const localStyles = StyleSheet.create({
  AccordionHeader: {
    paddingTop: 15,
    paddingRight: 15,
    paddingLeft: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#a9a9a9',
    backgroundColor: '#f9f9f9',
  },
  AccordionContent: {
    flex: 1,
    backgroundColor: '#31364D'
  },
  AccordionContentText: {
    paddingTop: 15,
    paddingRight: 15,
    paddingBottom: 15,
    paddingLeft: 15,
    color: '#fff',
  }
});
