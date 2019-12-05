'use strict'
import React, { Component } from 'react';
import {
  Text,
  TextInput,
  TouchableHighlight,
  StatusBar,
  ListView,
  FlatList,
  View
} from 'react-native';
import { RallyLogo, SideIcons, BackButtonMessages, ScrollView, BackButton } from '../components';
import firestore from '../../firebase';
import firebase from 'firebase';
import styles from './styles.js';

class Rooms extends Component {
  static navigationOptions = {
    title: 'Rooms',
    header: null
  };

  constructor(props) {
    super(props);
    var user = firebase.auth().currentUser;
    this.roomsRef = firestore.collection('users/' + user.uid  + '/rooms');
    this.state = {
      rooms: [],
      newRoom: ''
    }
  }

  componentDidMount() {
    this.listenForRooms(this.roomsRef);
  }

  listenForRooms(roomsRef) {
    roomsRef.get().then((querySnapshot)=> {
      var roomsFB = [];
      querySnapshot.forEach((doc) => {
        roomsFB.push({
          name: doc.data().name,
          key: doc.data().key
        });
      });
      this.setState({ rooms: roomsFB });
      })
      .catch((error) => {
      console.log("Error getting documents: ", error);
      });
  }

 

  addRoom() {
    if (this.state.newRoom === '') {
      return;
    }
    this.roomsRef.add({ name: this.state.newRoom });
    this.setState({ newRoom: '' });
    this.listenForRooms(this.roomsRef);
  }

  openMessages(room) {
    this.props.navigation.navigate('GiftedMessages', {roomKey: room.key, roomName: room.name});
  }

  renderRow(item) {
    return (
      <TouchableHighlight style={styles.roomLi}
      underlayColor="#fff"
      onPress={() => this.openMessages(item)}
      >
        <Text style={styles.roomLiText}>{item.name}</Text>
      </TouchableHighlight>
    )
  }

  render() {
    return (
      <View style={styles.roomsContainer}>
        <BackButtonMessages navigation={this.props.navigation} />
        <StatusBar barStyle="light-content"/>
        <Text style={styles.roomsHeader}>Messages</Text>
        <View style={styles.roomsListContainer}>
          <FlatList
            data={this.state.rooms}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (this.renderRow(item)
            )}
          />
        </View>
      </View>
    );
  }
}

export default Rooms;
