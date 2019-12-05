import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { Images, Metrics } from '../Themes';
import { SideIcons, CurrentLocationIcon } from '../components';
import firestore from '../../firebase';

const eventIcons = [ Images.event1, Images.event2, Images.event3 ];
const rallyIcons = [ Images.rally1, Images.rally2 ];
const friendsIcons = [ Images.friend1, Images.friend2 ];

export default class Home extends React.Component {

  static navigationOptions = {
    header: null,
  };

  state = {
    events: [],
    rallies: [],
    friends: [],
  }

  componentDidMount() {
    this.getEvents();
    this.getRallies();
    this.getFriends();
  }

  getEvents = async () => {
    try {
      let eventsData = [];
      let eventCollectionRef = firestore.collection('events').orderBy('id', 'asc');
      let allEvents = await eventCollectionRef.get();
      allEvents.forEach((event) => {
        eventsData.push(event.data());
      })
      this.setState({ events: eventsData })
      
    } catch (error) {
      console.log(error);
    }
  }

  getRallies = async () => {
    try {
      let ralliesData = [];
      let rallyCollectionRef = firestore.collection('rallies').orderBy('id', 'asc');
      let allRallies = await rallyCollectionRef.get();
      allRallies.forEach((rally) => {
        ralliesData.push(rally.data());
      })
      this.setState({ rallies: ralliesData })
      
    } catch (error) {
      console.log(error);
    }
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
    return (
      <View style={styles.container}>

        <MapView
          initialRegion={{
            latitude: 37.4274,
            longitude: -122.1697,
            latitudeDelta: 0.0250,
            longitudeDelta: 0.0001,
          }}
          style={styles.mapStyle}
        >
          <CurrentLocationIcon/>

          {this.state.events.map((event) => {
            return (
              <Marker key={event.id}
                coordinate={{
                  latitude: event.latitude,
                  longitude: event.longitude,
                }}
                title={event.name}
              >
                <TouchableOpacity onPress={() => this.props.navigation.navigate(event.navigation)}>
                  <Image source={eventIcons[Number(event.id) - 1]}/>
                </TouchableOpacity>
              </Marker>
            );
          })}

          {this.state.rallies.map((rally) => {
            return (
              <Marker key={rally.id}
                coordinate={{
                  latitude: rally.latitude,
                  longitude: rally.longitude,
                }}
                title={rally.name}
              >
                <TouchableOpacity onPress={() => this.props.navigation.navigate(rally.navigation)}>
                  <Image source={rallyIcons[Number(rally.id) - 1]}/>
                </TouchableOpacity>
              </Marker>
            );
          })}

          {this.state.friends.map((friend) => {
            return (
              <Marker key={friend.id}
                coordinate={{
                  latitude: friend.latitude,
                  longitude: friend.longitude,
                }}
                title={friend.name}
              >
                <TouchableOpacity onPress={() => this.props.navigation.navigate(friend.navigation)}>
                  <Image 
                    source={friendsIcons[Number(friend.id) - 1]}
                    style={styles.icon}
                  />
                </TouchableOpacity>
              </Marker>
            );
          })}
        </MapView>

        <Image source={Images.rally} style={styles.rallyLogo}/>
        <SideIcons navigation={this.props.navigation}/>

        <View style={styles.filters}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('FilterEvents')}
          >
            <View style={styles.checkBoxWrapper}>
              <Image source={Images.filterEvents}/>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('FilterRallies')}
          >
            <View style={styles.checkBoxWrapper}>
              <Image source={Images.filterRallies}/>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('FilterFriends')}
          >
            <View style={styles.checkBoxWrapper}>
              <Image source={Images.filterFriends}/>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    flex: 1,
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
  },
  rallyLogo: {
    position: 'absolute',
    top: '6%',
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  filters: {
    position: 'absolute',
    top: '85%',
    width: Metrics.screenWidth,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
  },
  checkBoxWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 80,
    backgroundColor: '#FFFFFF',
    borderColor: 'gray',
    borderWidth: 0.2,
    borderRadius: 40,
  },
});
