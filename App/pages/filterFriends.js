import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Images, Metrics } from '../Themes';
import MapView from 'react-native-maps';
import { Marker, Callout } from 'react-native-maps';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { RallyLogo, SideIcons, BackButton, ScrollView, CurrentLocationIcon } from '../components';
import { TouchableOpacity } from 'react-native-gesture-handler'
import firestore from '../../firebase';

const friendsIcons = [ Images.friend1, Images.friend2 ];

export default class FilterEvents extends React.Component {

  static navigationOptions = {
    header: null,
  };

  state = {
    friends: [],
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
    return (
      <ParallaxScrollView
        contentBackgroundColor="white"
        parallaxHeaderHeight={Metrics.screenHeight * .8}
        renderForeground={() => (
          <View style={styles.foreground}>
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

                {this.state.friends.map((friend) => {
                  return (
                    <Marker key={friend.id}
                      coordinate={{
                        latitude: friend.latitude,
                        longitude: friend.longitude,
                      }}
                      title={friend.name}>
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

            <RallyLogo navigation={this.props.navigation} />
            <SideIcons navigation={this.props.navigation} />
            <BackButton navigation={this.props.navigation} />
          </View>
        </View>
      )}>

        <ScrollView
          filter={'Filtering By Friends'}
          icon={Images.filterFriends}
          navigation={this.props.navigation}
          data={this.state.friends} 
        />

      </ParallaxScrollView>
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
  foreground: {
    height: 700,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  mapStyle: {
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
  },
});