import React from 'react';
import { Button, StyleSheet, View, Image, Text } from 'react-native';
import MapView from 'react-native-maps';
import { Marker, Callout } from 'react-native-maps';
import { Images, Metrics } from '../Themes';
import { RallyLogo, BackButton, SideIcons } from '../components';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { FontAwesome } from '@expo/vector-icons';

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
      alert('You are interested in this event!');
    }
  }

  render() {
    const { navigation } = this.props;
    return (
      <ParallaxScrollView
        contentBackgroundColor="white"
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
            </MapView>

            <RallyLogo navigation={this.props.navigation} />
            <SideIcons navigation={this.props.navigation} />
            <BackButton navigation={this.props.navigation} />
          </View>
        </View>
      )}>


        <View style={styles.scrollView}>
          <Image source={eventImages[navigation.getParam('image')]} style={styles.eventImage}/>
          <View>
            <Text style={styles.title}>{navigation.getParam('eventInfo').name}</Text>
            <Text style={styles.smallText}>{navigation.getParam('eventInfo').host}</Text>
            <Text style={styles.smallText}>{navigation.getParam('eventInfo').date}</Text>
            <Text style={styles.smallText}>{navigation.getParam('eventInfo').location}</Text>
            <Text></Text>
            <Text style={styles.description}>{navigation.getParam('eventInfo').bodyOne} </Text>
            <Text></Text>
            <Text style={styles.description}>{navigation.getParam('eventInfo').bodyTwo}</Text>
            <Text></Text>
            <Text style={styles.description}>{navigation.getParam('eventInfo').bodyThree}</Text>
          </View>
          <View style={styles.bottombuttons}>
            {this.state.interested ?
              <View style={styles.confirmedInterest}>
                <Button
                  title="Interested"
                  onPress={() => this.interestedButton()}
                />
                <FontAwesome name='star' size={30}/>
              </View>
            :
              <Button
                title="Interested"
                onPress={() => this.interestedButton()}
              />
            }
            <Button
              title="Start a Rally"
              onPress={() => this.props.navigation.navigate('EventThreeStartRally')}
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
    height: Metrics.screenHeight *.4,
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    height: 25,
    width: 25,
  },
});
