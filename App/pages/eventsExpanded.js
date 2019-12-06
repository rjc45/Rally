import React from 'react';
import { Button, StyleSheet, View, Image, Text, Alert, TouchableOpacity } from 'react-native';
import MapView from 'react-native-maps';
import { Marker, Polyline } from 'react-native-maps';
import { Images, Metrics } from '../Themes';
import { RallyLogo, BackButton, SideIcons, CurrentLocationIcon } from '../components';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { FontAwesome, Entypo } from '@expo/vector-icons';
import { material, human, iOSColors } from 'react-native-typography'

const eventIcons = [ Images.event1, Images.event2, Images.event3 ];
const eventImages = [ Images.event3Pic, Images.event2Pic, Images.event1Pic ];

export default class EventsExpanded extends React.Component {

  static navigationOptions = {
    header: null,
  };

  state = { 
    interested: false,
    highlightedRoute: 0,
  };

  interestedButton() {
    let tmp = !this.state.interested;
    this.setState({ interested: tmp });
    if (tmp) {
      Alert.alert('Success', 'You are interested in this event!');
    }
  }

  render() {
    const { navigation } = this.props;
    const { highlightedRoute } = this.state;

    return (
      <ParallaxScrollView
        contentBackgroundColor='white'
        parallaxHeaderHeight={Metrics.screenHeight * .5}
        renderForeground={() => (
          <View style={styles.foreground}>
            <View style={styles.container}>
              <MapView
                initialRegion={{
                  latitude: navigation.getParam('info').latInit,
                  longitude: navigation.getParam('info').longInit,
                  latitudeDelta: navigation.getParam('info').latdelta,
                  longitudeDelta: 0.0001,
                }}
                style={styles.mapStyle}
              >
                <CurrentLocationIcon/>
                <Marker
                  coordinate={{
                    latitude: navigation.getParam('info').latitude,
                    longitude: navigation.getParam('info').longitude,
                  }}
                  title={navigation.getParam('info').name}
                >
                  <Image source={eventIcons[navigation.getParam('image')]} style={styles.mapIcon}/>
                </Marker>

                {Object.keys(navigation.getParam('info').routes).map((key, index) => {
                  let route = navigation.getParam('info').routes[key];
                  
                  return (
                    <Polyline key={index}
                      coordinates={route}
                      strokeWidth={3}
                      strokeColor={highlightedRoute == index ? '#729CEF' : '#BBBDBF'}
                    />
                  );
                })}

                {navigation.getParam('info').routeWalk &&
                  <Polyline
                    coordinates={navigation.getParam('info').routeWalk}
                    strokeWidth={2}
                    strokeColor={'#729CEF'}
                    lineDashPattern={[1, 5]}
                  />
                }
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
            <Text style={styles.title}>{navigation.getParam('info').name}</Text>
            <Image source={eventImages[navigation.getParam('image')]} style={styles.eventImage}/>
          </View>

          <View style={styles.text}>
            <Text style={styles.smallText}>{navigation.getParam('info').host}</Text>
            <Text style={styles.smallText}>{navigation.getParam('info').date}</Text>
            <Text style={styles.smallText}>{navigation.getParam('info').location}</Text>
          </View>
          <View style={styles.text}>
            <Text style={styles.description}>{navigation.getParam('info').bodyOne} </Text>
          </View>
          {navigation.getParam('info').bodyTwo &&
            <View style={styles.text}>
              <Text style={styles.description}>{navigation.getParam('info').bodyTwo}</Text>
            </View>
          }
          {navigation.getParam('info').bodyThree &&
            <View style={styles.text}>
              <Text style={styles.description}>{navigation.getParam('info').bodyThree}</Text>
            </View>
          }

          <View style={styles.bottombuttons}>
            <View style={styles.confirmedInterest}>
              <TouchableOpacity
                style={styles.interested}
                onPress={() => this.interestedButton()}
                >
                <Text style={[human.title3, {color: iOSColors.blue}]}>Interested</Text>
              </TouchableOpacity>
              {this.state.interested ? <FontAwesome name='star' size={30}/> : <Text/>}
            </View>
            <Button
              title="Start a Rally"
              onPress={() => this.props.navigation.navigate('EventsStartRally',
              {info: navigation.getParam('info'), image: navigation.getParam('image')})}
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
  mapIcon: {
    marginBottom: 35,
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
  text: {
    color:'blue',
      textAlign:'center',
      paddingLeft : 10,
      paddingRight : 10,
  },
  interested: {
    backgroundColor: 'white',
    paddingTop:5,
    paddingBottom:5,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 20,
    borderColor: '#c4c4c4',
    borderWidth: 1,
  }
});
