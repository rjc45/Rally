import React from 'react';
import { Button, StyleSheet, View, Image, Text, Alert, FlatList, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import { Marker, Callout } from 'react-native-maps';
import { Images, Metrics } from '../Themes';
import { RallyLogo, BackButton, SideIcons } from '../components';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { AntDesign } from '@expo/vector-icons';

const { height, width } = Dimensions.get('window')


export default class EventOneStartRally extends React.Component {

  static navigationOptions = {
    header: null,
  };

  state = { interested: false };

  interestedButton() {
    this.setState({ interested: true});
    alert('You are interested in this event!');
  }

  render() {
    return (
        <View style={styles.scrollView}>
          <Image source={Images.event1Pic} style={styles.eventImage}/>
          <View>
            <Text style={styles.title}>2020 Election Trivia Night</Text>
            <Text style={styles.smallText}>Hosted by: Cardinal for Warren</Text>
            <Text style={styles.smallText}>Oct. 30 | 9PM - 10:30PM</Text>
            <Text style={styles.smallText}>La Maison Francaise</Text>
            <Text></Text>
            
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
  foreground: {
    height: 700,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
  },
  map: {
    flex: 1,
  },
  mapStyle: {
    flex: 1,
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
  },
  info: {
    flex: 2.5,
  },
  eventImage: {
    width: Metrics.screenWidth,
    height: 300,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 10,
  },
  smallText: {
    fontSize: 16,
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
  },
  bottombuttons: {
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 25,
  },
  confirmedInterest: {
    paddingLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    height: 25,
    width: 25,
  },
});
