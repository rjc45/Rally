import React from 'react';
import { StyleSheet, View, Image, Text, Alert, Card, Title} from 'react-native';
import { Images, Metrics} from '../Themes';
import MapView from 'react-native-maps';
import { Marker, Callout } from 'react-native-maps';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { RallyLogo, SideIcons, BackButton } from '../components';
import { TouchableOpacity } from 'react-native-gesture-handler'

export default class FilterEvents extends React.Component {

  static navigationOptions = {
    header: null,
  };

  state = {
    coordinates : [
      {
        name: '1',
        latitude: 37.427799,
        longitude: -122.171198
      },
      {
        name: '2',
        latitude: 37.425682,
        longitude: -122.167445
      },
    ]
  }

  _onPressButton() {
    Alert.alert("You tapped the button!")
  }

  render() {
    return (
      <ParallaxScrollView
        contentBackgroundColor="pink"
        parallaxHeaderHeight={550}
        renderForeground={() => (
          <View style={{ height: 300, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View style={styles.container}>
            <MapView
            initialRegion={{
              latitude: 37.4274,
              longitude: -122.1697,
              latitudeDelta: 0.0222,
              longitudeDelta: 0.0001,
            }}
          style={styles.mapStyle} >

            <Marker
                coordinate={{
                  latitude: 37.427799,
                  longitude: -122.171198,
                }}
                title="Event 2">

                <TouchableOpacity onPress= {this._onPressButton}>
                  <Image source = {Images.event2}/>
                </TouchableOpacity>
            </Marker>

            <Marker
                coordinate={{
                  latitude: 37.4274,
                  longitude: -122.1697,
                }}
                title="Event 1">
                <Image source = {Images.event1}/>
            </Marker>

            <Marker
                coordinate={{
                  latitude: 37.425682,
                  longitude: -122.167445,
                }}
                title="Event 3">
                <Image source = {Images.event3}/>
            </Marker>

          </MapView>
          <RallyLogo navigation={this.props.navigation} />
          <SideIcons navigation={this.props.navigation} />
          <BackButton navigation={this.props.navigation} />
        </View>
        </View>
      )}>

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
  mapStyle: {
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
  },
});
