'use strict'
import React, { Component } from 'react';
import {
  StatusBar,
  View
} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import firestore from '../../firebase';
import firebase from 'firebase';
import styles from './styles.js';
import { RallyLogo, SideIcons, BackButton, ScrollView } from '../components';

class GiftedMessages extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.roomName,
    headerStyle: styles.messagesHeader,
    headerTitleStyle: styles.messagesTitle,
    headerBackTitleStyle: styles.messagesBackTitle
  });

  constructor(props) {
    super(props);
    var FirebaseDB = firebase.database();
    var roomKey = this.props.navigation.state.params.roomKey;
    this.messagesRef = FirebaseDB.ref(`messages/${roomKey}`);
    this.state = {
      user: '',
      messages: []
    }
  }

  componentDidMount() {
    this.setState({ user: firebase.auth().currentUser });
    this.listenForMessages(this.messagesRef);
  }

  listenForMessages(messagesRef) {
    messagesRef.on('value', (dataSnapshot) => {
      var messagesFB = [];
      dataSnapshot.forEach((child) => {
        messagesFB = [({
          _id: child.key,
          text: child.val().text,
          createdAt: child.val().createdAt,
          user: {
            _id: child.val().user._id,
            name: child.val().user.name
          }
        }), ...messagesFB];
      });
      this.setState({ messages: messagesFB });
    });
  }

  addMessage(message_item = {}) {
    var message = message_item[0]
    this.messagesRef.push({
      text: message.text,
      createdAt: Date.now(),
      user: {
        _id: message.user._id,
        name: message.user.name
      }
    })
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar barStyle="light-content"/>
        <GiftedChat
          messages={this.state.messages}
          onSend={this.addMessage.bind(this)}
          user={{
            _id: this.state.user.uid,
            name: this.state.user.email,
          }}
        />
      </View>
    );
  }
}

export default GiftedMessages;
