import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import MapView from 'react-native-maps';
import { Marker, Polyline, Callout } from 'react-native-maps';
import { Images, Metrics } from '../Themes';
import { RallyLogo, BackButton, SideIcons, CurrentLocationIcon } from '../components';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import { WebView } from 'react-native-webview';

const eventIcons = [ Images.event1, Images.event2, Images.event3 ];
const ralliesIcons = [ Images.rally1, Images.rally2 ];
const transportationIcons = [ 'numeric-1-box-outline', 'numeric-2-box-outline' ];

export default class Transportation extends React.Component {

  static navigationOptions = {
    header: null,
  };

  state = {
    highlightedRoute: this.props.navigation.getParam('highlightedRoute'),
  };

  pressRoute(index) {
    if (this.state.highlightedRoute !== index) {
      this.setState({ highlightedRoute: index});
    }
  };

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
                  <Image source={navigation.getParam('type') == 'events' ? 
                    eventIcons[navigation.getParam('image')] : ralliesIcons[navigation.getParam('image')]} 
                    style={styles.mapIcon}/>
                </Marker>

                {Object.keys(navigation.getParam('info').routes).map((key, index) => {
                  let route = navigation.getParam('info').routes[key];

                  return (
                    <View key={index}>
                      <Polyline
                        coordinates={route}
                        strokeWidth={3}
                        strokeColor={highlightedRoute === index ? '#729CEF' : '#BBBDBF'}
                        tappable={true}
                        onPress={() => this.pressRoute(index)}
                      />
                      <Marker
                        coordinate={{
                          latitude: navigation.getParam('info').transport[index]['_lat'],
                          longitude: navigation.getParam('info').transport[index]['_long'],
                        }}
                      >
                        <TouchableOpacity onPress={() => console.log('nice')}>
                          <MaterialCommunityIcons name={transportationIcons[index]} size={25}/>
                        </TouchableOpacity>
                      </Marker>
                    </View>
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
            {highlightedRoute == 0 && <Text style={styles.title}>Marguerite Shuttle Line X</Text>}
            {highlightedRoute == 1 && <Text style={styles.title}>Marguerite Shuttle Line Y</Text>}
            <Image source={Images.bus} style={styles.busImage}/>
            
            {highlightedRoute == 0 && 
              <WebView style={styles.schedule}
                source={{ uri: 'https://transportation.stanford.edu/marguerite/x#marguerite--schedule-anchor' }}
              />
            }
            {highlightedRoute == 1 && 
              <WebView style={styles.schedule}
                source={{ uri: 'https://transportation.stanford.edu/marguerite/y#marguerite--schedule-anchor' }}
              />
            }
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
  busImage: {
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
  schedule: {
    width: Metrics.screenWidth, 
    height: Metrics.screenHeight * 0.8,
    padding: 0,
    alignItems: 'center',
  }
});
