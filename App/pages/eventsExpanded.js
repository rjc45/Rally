import React from 'react';
import { Button, StyleSheet, View, Image, Text, Alert } from 'react-native';
import MapView from 'react-native-maps';
import { Marker, Callout } from 'react-native-maps';
import { Images, Metrics } from '../Themes';
import { RallyLogo, BackButton, SideIcons, CurrentLocationIcon } from '../components';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { FontAwesome, Entypo } from '@expo/vector-icons';

const eventIcons = [ Images.event1, Images.event2, Images.event3 ];
const eventImages = [ Images.event3Pic, Images.event2Pic, Images.event1Pic ];

export default class EventsExpanded extends React.Component {

  static navigationOptions = {
    header: null,
  };

  state = { interested: false };

  interestedButton() {
    let tmp = !this.state.interested;
    this.setState({ interested: tmp });
    if (tmp) {
      Alert.alert('Success', 'You are interested in this event!');
    }
  }

  render() {
    const { navigation } = this.props;

    return (
      <ParallaxScrollView
        contentBackgroundColor='white'
        parallaxHeaderHeight={Metrics.screenHeight * .5}
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
                <CurrentLocationIcon/>
                <Marker 
                  coordinate={{
                    latitude: navigation.getParam('eventInfo').latitude,
                    longitude: navigation.getParam('eventInfo').longitude,
                  }}
                  title={navigation.getParam('eventInfo').name}
                >
                  <Image source={eventIcons[navigation.getParam('image')]}/>
                </Marker>
              
            </MapView>

            <RallyLogo navigation={this.props.navigation} />
            <SideIcons navigation={this.props.navigation} />
            <BackButton navigation={this.props.navigation} />
          </View>
        </View>
      )}>


        <View style={styles.scrollView}>
          <View style={styles.alignCenter}>
            <Entypo name='chevron-small-up' size={30}/>
            <Text style={styles.title}>{navigation.getParam('eventInfo').name}</Text>
            <Image source={eventImages[navigation.getParam('image')]} style={styles.eventImage}/>
          </View>

          <View style={styles.text}>
            <Text style={styles.smallText}>{navigation.getParam('eventInfo').host}</Text>
            <Text style={styles.smallText}>{navigation.getParam('eventInfo').date}</Text>
            <Text style={styles.smallText}>{navigation.getParam('eventInfo').location}</Text>
          </View>
          <View style={styles.text}>
            <Text style={styles.description}>{navigation.getParam('eventInfo').bodyOne} </Text>
          </View>
          {navigation.getParam('eventInfo').bodyTwo &&
            <View style={styles.text}>
              <Text style={styles.description}>{navigation.getParam('eventInfo').bodyTwo}</Text>
            </View>
          }
          {navigation.getParam('eventInfo').bodyThree &&
            <View style={styles.text}>
              <Text style={styles.description}>{navigation.getParam('eventInfo').bodyThree}</Text>
            </View>
          }

          <View style={styles.bottombuttons}>
            <View style={styles.confirmedInterest}>
              <Button
                title="Interested"
                onPress={() => this.interestedButton()}
              />
              {this.state.interested ? <FontAwesome name='star' size={30}/> : <Text/>}
            </View>
            <Button
              title="Start a Rally"
              onPress={() => this.props.navigation.navigate('EventsStartRally',
              {eventInfo: navigation.getParam('eventInfo'), image: navigation.getParam('image')})}
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
  mapStyle: {
    flex: 1,
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
  },
  scrollView: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  alignCenter: {
    alignItems: 'center',
  },
  eventImage: {
    width: Metrics.screenWidth * 0.90,
    height: Metrics.screenHeight * 0.3,
    margin: 10,
    borderRadius: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  smallText: {
    fontSize: 16,
    textAlign: 'center',
  },
  text: {
    padding: 10,
  },
  description: {
    textAlign: 'center',
  },
  bottombuttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 10,
  },
  confirmedInterest: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
