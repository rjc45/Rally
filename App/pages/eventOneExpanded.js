import React from 'react';
import { Button, StyleSheet, View, Image, Text, Alert, FlatList, TextInput, TouchableOpacity } from 'react-native';
import MapView from 'react-native-maps';
import { Marker, Callout } from 'react-native-maps';
import { Images, Metrics } from '../Themes';
import { RallyLogo, BackButton, SideIcons } from '../components';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { AntDesign } from '@expo/vector-icons';

export default class EventOneExpanded extends React.Component {

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
      <ParallaxScrollView
        contentBackgroundColor="white"
        parallaxHeaderHeight={335}
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

              <Marker
                coordinate={{
                  latitude: 37.4274,
                  longitude: -122.1697,
                }}
                title="2020 Election Trivia Night">
                <TouchableOpacity onPress={() => this.props.navigation.navigate('EventOne')}>
                  <Image source = {Images.event1}/>
                </TouchableOpacity>
              </Marker>
            </MapView>
          
            <RallyLogo navigation={this.props.navigation} />
            <SideIcons navigation={this.props.navigation} />
            <BackButton navigation={this.props.navigation} />
          </View>
        </View>
      )}>


        <View style={styles.scrollView}>
          <Image source={Images.event1Pic} style={styles.eventImage}/>
          <View>
            <Text style={styles.title}>2020 Election Trivia Night</Text>
            <Text style={styles.smallText}>Hosted by: Cardinal for Warren</Text>
            <Text style={styles.smallText}>Oct. 30 | 9PM - 10:30PM</Text>
            <Text style={styles.smallText}>La Maison Francaise</Text>
            <Text></Text>
            <Text style={styles.description}>Join Cardinal for Warren for a 2020 election trivia about 
            all the candidates at French House! We'll split up into teams (or bring your own team),
            and the winning team will get a prize!</Text>
            <Text></Text>
            <Text style={styles.description}>The trivia begins at 9:00pm! All are welcome!</Text>
            <Text></Text>
            <Text style={styles.description}>BYOB: bring your own Big, Structural Change beverage (coffee
            or whatever)!</Text>
            <View style={styles.bottombuttons}>
              <Button
                title="Interested"
                onPress={() => Alert.alert('You are interested in this event!')}
              />
              <Button
                title="Start a Rally"
                onPress={() => Alert.alert('Start a Rally!')}
              />
            </View>
          </View>
          <View style={styles.bottombuttons}>
            {this.state.interested ?
              <View style={styles.confirmedInterest}>
                <Text style={styles.smallText}>Interested  </Text>
                <Image source={Images.star}
                  style={styles.star}/>
              </View>
            :
              <Button
                title="Interested"
                onPress={() => this.interestedButton()}
              />
            }
            <Button
              title="Start a Rally"
              onPress={() => Alert.alert('Start a Rally!')}
            />
          </View>
        </View>
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
