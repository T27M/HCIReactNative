'use strict';

import React, { Component } from 'react';
import NavButtons       from './NavButtons';
import infoStyles       from '../styles/info_page';
import accordionStyles  from '../styles/accordion';

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
      <View style={accordionStyles.AccordionHeader}>
        <Text style={accordionStyles.AccordionHeaderText}>
          {(isOpen ? "- " : "+ ") + row.item.question}
        </Text>
      </View>
    );

    let content = (
      <View style={accordionStyles.AccordionContent}>
        <Text style={accordionStyles.AccordionContentText}>
          {row.item.answer}
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
          navigation={this.props.navigation}
          showBack={true}
          showBurger={false}
        />

        <View style={infoStyles.wrapper}>
          <View style={infoStyles.titleView}>
            <Text style={infoStyles.title}>FAQs</Text>

            <Image
                style={infoStyles.icon}
                source={require('../img/faq_icon.png')}
            />
          </View>

          <View style={infoStyles.contentView}>
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
