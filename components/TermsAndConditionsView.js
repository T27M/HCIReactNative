'use strict';

import React, { Component } from 'react';
import NavButtons from './NavButtons';
import styles     from '../styles/info_page.js';
import Logger     from '../data/Logger';

import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Linking
} from 'react-native';

export default class TermsAndConditionsView extends Component {
  static NAV_NAME = "T&Cs";

  constructor(props) {
    super(props);
  }

  componentDidMount(){
    Logger.logEvent(Logger.FOCUS_EVENT, { component: "T&Cs" });
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.scrollWrapper}>
        <NavButtons
          navigation  = {this.props.navigation}
          showBack    = {true}
          showBurger  = {false}
          showAccept  = {false}
          showDecline = {false}
        />
        <View style={styles.wrapper}>
          <View style={styles.titleView}>
            <Text style={styles.title}>T&Cs</Text>

            <Image
                style={styles.icon}
                source={require('../img/t_and_c_icon.png')}
            />
          </View>

          <View style={styles.contentView}>
            {this.getTC()}
          </View>
        </View>
      </ScrollView>
    );
  }

  getTC() {
    return (
      <Text style={styles.content}>
        Last updated: 27/11/2017
        {"\n\n"}

        Please read these Terms and Conditions ("Terms", "Terms and Conditions") carefully before using the XPloremobile application (the "Service")
        operated by SCC.402: Advanced HCI Group 2 ("us", "we", or "our").
        {"\n\n"}

        Your access to and use of the Service is conditioned on your acceptance of and compliance with
        these Terms. These Terms apply to all visitors, users and others who access or use the Service.
        {"\n\n"}

        <Text style={localStyles.bold}>
          By accessing or using the Service you agree to be bound by these Terms. If you disagree
          with any part of the terms then you may not access the Service.
        </Text>
        {"\n\n"}

        <Text style={styles.title}>Content</Text>
        {"\n\n"}

        Our mobile application allows you to view existing content (images, videos and audio) about certain
        locations within your local area. It also allows you to post your own locations to moderators for
        verification, before these are added into the application. You are responsible for the correct viewing
        of this content and any content you submit to us.
        {"\n\n"}

        <Text style={styles.title}>Data</Text>
        {"\n\n"}

        We collect your personal data (username, email and password) as well as location data. Both of
        these are fundamental to the apps core functionality, and you can be sure that it is stored
        effectively and securely.
        {"\n\n"}

        <Text style={styles.title}>Changes</Text>
        {"\n\n"}

        We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a
        revision is material we will try to provide at least 30 (change this) days{"'"} notice prior to any new terms
        taking effect. What constitutes a material change will be determined at our sole discretion.
        {"\n\n"}

        <Text style={styles.title}>Contact Us</Text>
        {"\n\n"}

        If you have any questions about these Terms, please contact us on contact@example.com.
        {"\n\n"}
        Terms and Conditions created using

        <Text
          style={localStyles.link}
          onPress={() => {Linking.openURL('https://termsfeed.com/blog/sample-terms-and-conditions-template/#Download_Terms_and_Conditions_Template')}}
        >
        {" https://termsfeed.com/blog/sample-terms-and-conditions-template/#Download_Terms_and_Conditions_Template "}
        </Text>

        and is designed to be a placeholder for the purposes of this demo.
        {"\n\n"}
      </Text>
    );
  }
}

const localStyles = StyleSheet.create({
  bold: {
    fontWeight: 'bold'
  },
  link: {
    color: 'blue'
  }
});
