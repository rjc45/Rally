import React from 'react';
import { Button, StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import { Images, Metrics } from '../Themes';
import { BackButton } from '../components';
import { Entypo } from '@expo/vector-icons';
import firestore from '../../firebase';
import firebase from 'firebase';
import { material, human, iOSColors, systemWeights } from 'react-native-typography'

const eventImages = [ Images.event2Pic, Images.event3Pic, Images.event1Pic ];
const friendProfiles = [ 'FriendOne', 'FriendTwo' ];
const friendsIcons = [ Images.friend1, Images.friend2 ];

export default class EventsStartRally extends React.Component {

  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    var user = firebase.auth().currentUser;
    this.roomsRef = firestore.collection('users/' + user.uid  + '/rooms');
    this.state = {
      rooms: [],
      arr: [
        { clicked: false },
        { clicked: false },
      ],
      friends: [],
      members: [],
      users: [],
    }
  }

  rallyButton(index) {
    let tmp = this.state.arr;
    tmp[index].clicked = !tmp[index].clicked;
    this.setState({ arr: tmp });
    return tmp[index].clicked;
  }

  componentDidMount() {
    this.getFriends();
  }

  getFriends = async () => {
    try {
      let friendsData = [];
      let friendCollectionRef = firestore.collection('friends').orderBy('id', 'asc');
      let allFriends = await friendCollectionRef.get();
      allFriends.forEach((friend) => {
        friendsData.push(friend.data());
      })
      this.setState({ friends: friendsData })

    } catch (error) {
      console.log(error);
    }
  }

  openMessages(room) {
    var user = firebase.auth().currentUser;
    var memberRef = firestore.collection('users/' + user.uid  + '/rooms/' + room.key + '/members');
    if (this.state.arr[0].clicked == true) {
      memberRef.add({name: 'Sophie'});
      console.log('added sophie');
    }
    if (this.state.arr[1].clicked == true) {
      memberRef.add({name: 'Patrick'});
      console.log('added patrick');
    }
    this.props.navigation.navigate('GiftedMessages', {roomKey: room.key, roomName: room.name});
  }

  startRally(roomsRef, navigation) {
    roomsRef.add({ name: navigation.getParam('info').name });
    roomsRef.where("name", "==", navigation.getParam('info').name).get().then((querySnapshot)=> {
      var roomsFB = [];
      querySnapshot.forEach((doc) => {
        roomsFB.push({
          name: doc.data().name,
          key: doc.id,
        });
      });
      this.setState({ rooms: roomsFB });
      this.openMessages(this.state.rooms[0]);
      })
  }

  render() {
    const { navigation } = this.props;

    return (
      <View>
        <Text style={styles.title}>{navigation.getParam('info').name}</Text>
        <Image source={eventImages[navigation.getParam('image')]} style={styles.eventImage}/>

        <Text style={styles.smallText}>{navigation.getParam('info').host}</Text>
        <Text style={styles.smallText}>{navigation.getParam('info').date}</Text>
        <Text style={styles.smallText}>{navigation.getParam('info').location}</Text>

        <Text style={styles.rally}>Rally with Interested Friends</Text>

        {this.state.friends.map((friend) => {
          return (
            <View style={styles.friendRow} key={friend.id}>
              <TouchableOpacity onPress={() => navigation.navigate(friendProfiles[Number(friend.id) - 1])}>
                <View style={styles.friend}>
                  <Image source={friendsIcons[Number(friend.id) - 1]} style={styles.icon}/>
                  <Text style={styles.largeText}>{friend.name}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.rallyButton(Number(friend.id) - 1)}>
                <View style={styles.checkBoxWrapper}>
                  {this.state.arr[Number(friend.id) - 1].clicked ? <Entypo name='check' size={30} color='#449AFF'/> : <Text/>}
                </View>
              </TouchableOpacity>
            </View>
          );
        })}

        <View style={styles.bottomButton}>
          <TouchableOpacity
            style={styles.interested}
            onPress={() => this.startRally(this.roomsRef, navigation)}
            >
            <Text style={[human.title3, systemWeights.semibold, {color: iOSColors.blue, textAlign: 'center'}]}>Let's Rally!</Text>
          </TouchableOpacity>
        </View>

        <BackButton navigation={this.props.navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  eventImage: {
    width: Metrics.screenWidth * 0.90,
    height: Metrics.screenHeight * 0.25,
    margin: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 58,
    paddingLeft: 7,
  },
  rally: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 15,
    paddingTop: 40,
  },
  smallText: {
    fontSize: 16,
    textAlign: 'center',
  },
  largeText: {
    fontSize: 20,
    paddingLeft: 10,
  },
  checkBoxWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    backgroundColor: '#F0F0F0',
    borderRadius: 20
  },
  friendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 10,
  },
  friend: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  bottomButton: {
    padding: 20,
    marginLeft: 105,
    marginRight: 105
  },
  interested: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: 'white',
    paddingTop: 5,
    paddingBottom:5,
    borderRadius: 20,
    borderColor: '#c4c4c4',
    borderWidth: 1,
  },
});
