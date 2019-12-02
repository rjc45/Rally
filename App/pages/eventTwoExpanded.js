import React from 'react';
import { Button, StyleSheet, View, Image, Text, Alert, FlatList, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import { Marker, Callout } from 'react-native-maps';
import { Images, Metrics } from '../Themes';
import { RallyLogo, BackButton, SideIcons } from '../components';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { AntDesign } from '@expo/vector-icons';
import Constants from 'expo-constants';

const { height, width } = Dimensions.get('window')

export default class EventTwoExpanded extends React.Component {

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
        parallaxHeaderHeight={height * .5}
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
                  latitude: 37.425682,
                  longitude: -122.167445,
                }}
                title="Social Justice Activities Fair">
                <Image source = {Images.event2}/>
              </Marker>
            </MapView>

            <RallyLogo navigation={this.props.navigation} />
            <SideIcons navigation={this.props.navigation} />
            <BackButton navigation={this.props.navigation} />
          </View>
        </View>
      )}>


        <View style={styles.scrollView}>
          <Image source={Images.event2Pic} style={styles.eventImage}/>
          <View>
            <Text style={styles.title}>Social Justice Activities Fair</Text>
            <Text style={styles.smallText}>Hosted by: Columbae</Text>
            <Text style={styles.smallText}>Nov. 1 | 4PM - 6PM</Text>
            <Text style={styles.smallText}>Columbae Lawn</Text>
            <Text></Text>
            <Text style={styles.description}>Interested in social justice on campus, but don't know where
            to start? Want to get involved with organizing around causes you care about? Trying to build
            coalitions between different activist groups on campus?</Text>
            <Text></Text>
            <Text style={styles.description}>Come to Columbae’s First Social Justice Activities Fair on
            Friday, November 1 from 4-6! Meet with leaders from 15+ activist groups on campus, organizing
            on everything from workers’ rights and affordable housing to racial justice and sustainability.</Text>
            <Text></Text>
            <Text style={styles.description}>Whether you’re an experienced activist looking for a new cause,
            or someone who’s just trying to figure out where they stand in Stanford’s activist ecosystem,
            come through!! Light refreshments will be provided.</Text>
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
              onPress={() => this.props.navigation.navigate('EventTwoStartRally')}
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
    height: height*.4,

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
