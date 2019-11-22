import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text } from 'react-native';
import MapView from 'react-native-maps';
import { Marker, Callout } from 'react-native-maps';
import { Images, Metrics } from '../Themes';
import { RallyLogo, BackButton, SideIcons } from '../components';

export default class EventOneExpanded extends React.Component {

  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.map}>
          <MapView
            initialRegion={{
              latitude: 37.4240,
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
              title="Event 1">
              <Image source = {Images.event1}/>
            </Marker>
          </MapView>
        </View>

        <View style={styles.info}>
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
          </View>

        </View>

        <RallyLogo navigation={this.props.navigation} />
        <SideIcons navigation={this.props.navigation} />
        <BackButton navigation={this.props.navigation} />
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
  },
  smallText: {
    fontSize: 16,
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
  }
});
