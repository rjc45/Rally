import React from 'react';
import { Button, StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import { Images, Metrics } from '../Themes';
import { BackButton } from '../components';
import { Entypo } from '@expo/vector-icons';
import firestore from '../../firebase';

const eventImages = [ Images.event3Pic, Images.event2Pic, Images.event1Pic ];
const friendProfiles = [ 'FriendOne', 'FriendTwo' ];
const friendsIcons = [ Images.friend1, Images.friend2 ];

export default class EventsStartRally extends React.Component {

  static navigationOptions = {
    header: null,
  };

  state = {
    arr: [
      { clicked: false },
      { clicked: false},
      { clicked: false},
    ],
    friends: [],
  };

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

  render() {
    const { navigation } = this.props;

    return (
      <View>
        <Text style={styles.title}>{navigation.getParam('eventInfo').name}</Text>
        <Image source={eventImages[navigation.getParam('image')]} style={styles.eventImage}/>

        <Text style={styles.smallText}>{navigation.getParam('eventInfo').host}</Text>
        <Text style={styles.smallText}>{navigation.getParam('eventInfo').date}</Text>
        <Text style={styles.smallText}>{navigation.getParam('eventInfo').location}</Text>

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
          <Button
            title="Let's Rally!"
            onPress={() => this.props.navigation.navigate('Messages')}
          />
        </View>

        <BackButton navigation={this.props.navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  eventImage: {
    width: Metrics.screenWidth * 0.90,
    height: Metrics.screenHeight * 0.3,
    margin: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 50,
  },
  rally: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 20,
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
  },
});
