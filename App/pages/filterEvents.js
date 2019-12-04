import React from 'react';
import { StyleSheet, View, Image, Text, FlatList, TextInput } from 'react-native';
import { Images, Metrics} from '../Themes';
import MapView from 'react-native-maps';
import { Marker, Callout } from 'react-native-maps';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { RallyLogo, SideIcons, BackButton, ScrollView } from '../components';
import { TouchableOpacity } from 'react-native-gesture-handler'
import { AntDesign, Entypo } from '@expo/vector-icons';
import firestore from '../../firebase';
import firebase from 'firebase';

const eventIcons = [ Images.event1, Images.event2, Images.event3 ];

export default class FilterEvents extends React.Component {

  static navigationOptions = {
    header: null,
  };

  state = {
    events: [],
  }

  componentDidMount() {
    this.getEvents();
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
                  latitudeDelta: 0.0222,
                  longitudeDelta: 0.0001,
                }}
                style={styles.mapStyle}
              >
                <View>
                  <Marker
                    coordinate={{
                      latitude: 37.4274,
                      longitude: -122.1697,
                    }}>
                    <Image source={Images.currentLocation}/>
                  </Marker>

                  <Marker
                    coordinate={{
                      latitude: 37.4274,
                      longitude: -122.1697,
                    }}>
                    <Image source={Images.currentLocation2}/>
                  </Marker>
                </View>

                {this.state.events.map((event) => {
                  return (
                    <Marker key={event.id}
                      coordinate={{
                        latitude: event.latitude,
                        longitude: event.longitude,
                      }}
                      title={event.name}>
                      <TouchableOpacity onPress={() => this.props.navigation.navigate(event.navigation)}>
                        <Image source={eventIcons[Number(event.id) - 1]}/>
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
          filter={'Filtering By Events'}
          icon={Images.filterEvents}
          navigation={this.props.navigation}
          data={this.state.events} 
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
  mapStyle: {
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
  },
});
