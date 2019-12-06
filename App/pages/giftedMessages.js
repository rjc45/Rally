'use strict'
import React, { Component } from 'react';
import {
  StatusBar,
  View,
  Text
} from 'react-native';
import { GiftedChat, SystemMessage } from 'react-native-gifted-chat';
import firestore from '../../firebase';
import firebase from 'firebase';
import styles from './styles.js';
import { RallyLogo, SideIcons, BackButtonMessages, ScrollView, BackButton } from '../components';

class GiftedMessages extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: navigation.state.params.roomName,
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
      messages: [],
      members: []
    }
  }

  componentDidMount() {
    this.setState({ user: firebase.auth().currentUser });
    this.getMembers();
    this.listenForMessages(this.messagesRef);
  }

  getMembers = async () => {
    try {
      let membersData = [];
      var roomKey = this.props.navigation.state.params.roomKey;
      let user = firebase.auth().currentUser
      let membersCollectionRef = firestore.collection('users/' + user.uid  + '/rooms/' + roomKey + '/members');
      let allMembers = await membersCollectionRef.get();
      allMembers.forEach((member) => {
        membersData.push(member.data());
      })
      this.setState({ members: membersData })
    } catch (error) {
      console.log(error);
    }
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
        <StatusBar barStyle="dark-content"/>
        <View style={styles.friendContainer}>
          {this.state.members.map((member, index) => {
            return (
            <Text key={index} style={styles.roomLiText}>  {member.name}  </Text>
          );
          })}
        </View>
        <GiftedChat
          renderSystemMessage={this.renderSystemMessage}
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
