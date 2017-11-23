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

// TODO replace with actual Q/A
// maybe worth extracting to json? not sure as currently all jsons represent API responses
const FAQs = [
  {
    key: "How do I scan a QR code?",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vitae auctor lectus. Curabitur eget tortor at eros convallis feugiat. Vestibulum scelerisque pulvinar turpis a ullamcorper. Praesent cursus elementum fringilla. Aliquam dictum vulputate interdum. Aliquam venenatis, purus quis efficitur euismod, ex arcu faucibus augue, nec maximus risus velit quis ligula. Etiam cursus lacinia justo, nec porttitor nunc. Quisque non volutpat tellus, sit amet accumsan libero. Proin pretium, ipsum vel luctus condimentum, quam risus ultrices dolor, in accumsan quam velit sed lectus. Pellentesque ac velit eu nunc ullamcorper facilisis. Donec sit amet enim efficitur, ornare purus quis, finibus lorem. "
  },
  {
    key: "Where do you source the information?",
    answer: "Sed ac lacinia diam. Duis nibh orci, pharetra id lorem quis, faucibus ultricies lorem. Suspendisse hendrerit neque et risus vehicula vestibulum. Vestibulum tristique ac tellus at rutrum. Integer fringilla massa neque, in pellentesque lectus facilisis lacinia. Mauris eget mi tellus. Integer viverra maximus elit non pellentesque. "
  },
  {
    key: "How can I add a new location?",
    answer: "Maecenas tempus, lorem id maximus lacinia, augue orci ultricies tellus, egestas finibus ligula orci vitae tortor. Duis mi est, vestibulum at risus non, commodo ornare velit. In varius convallis nibh, eu egestas nisl hendrerit et. In sagittis facilisis velit eu lobortis. Proin sem ligula, tempor quis risus nec, semper ornare ligula. Proin auctor sit amet sem id hendrerit. Cras aliquet, lectus at luctus auctor, arcu metus tristique urna, eget pretium ante libero pharetra quam. Curabitur erat mauris, scelerisque et ullamcorper ut, euismod sed libero. Nam vel leo lectus. Quisque accumsan justo eget sollicitudin tristique. Duis enim justo, ornare vitae gravida non, semper et justo. Duis arcu sem, viverra vitae ultricies ut, finibus quis nisi. Vestibulum suscipit accumsan tortor, ac gravida elit varius et. Maecenas vel tincidunt diam. Suspendisse scelerisque eget odio a tincidunt. "
  },
  {
    key: "How do I reset my account?",
    answer: "Phasellus porttitor, ligula id aliquam rutrum, justo diam eleifend erat, convallis rhoncus est est a dui. Etiam vel luctus dui. Donec sit amet lobortis ligula. Quisque feugiat quis nisi at rhoncus. Donec cursus condimentum dui vel consectetur. Aenean quis elit quis massa tincidunt malesuada. Nulla molestie ultrices purus, id egestas neque rhoncus iaculis. Nunc ut magna a odio condimentum rhoncus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Suspendisse egestas non est non bibendum. Morbi sodales sapien ac feugiat tempor. Curabitur et mollis nisi, sed blandit ipsum. Integer in arcu vitae mauris finibus venenatis. "
  },
  {
    key: "How do you use my personal data?",
    answer: "Sed varius tortor lacus, porttitor iaculis augue egestas quis. Ut vulputate, neque non rhoncus dignissim, nunc enim rutrum tellus, a egestas tortor quam ac nibh. Nulla facilisi. Donec tempus mi quis urna tempus vestibulum. Integer sagittis varius ligula, quis sodales eros accumsan ac. Morbi dictum pretium odio, et pharetra dui elementum quis. Cras quis lacus fringilla, dignissim nisl et, placerat enim. Duis gravida quis urna et volutpat. Cras congue elit a velit pharetra porttitor. Vivamus tempor consequat urna a scelerisque. Sed libero sapien, iaculis non lacus et, condimentum ullamcorper enim. Fusce aliquet ante eget nisi consequat luctus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vivamus maximus scelerisque neque in venenatis. Nunc mattis diam ut quam sodales pellentesque. "
  },
];

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
          {(isOpen ? "- " : "+ ") + row.item.key}
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
