import React from 'react';
import { StyleSheet, View, Image} from 'react-native';
import { Images } from '../Themes';
import metrics from '../Themes/Metrics';
import MapView from 'react-native-maps';
import { Marker, Callout } from 'react-native-maps';

export default class FilterEvents extends React.Component {

  static navigationOptions = {
    headerTitle: (<Image source={Images.logo}/>),
  };

  state = {
    coordinates : [
      { name: '1', latitude: 37.427799, longitude: -122.171198},
      { name: '2', latitude: 37.425682, longitude: -122.167445},
    ]
  }

  render() {
    return (
      <View style={styles.container}>
          <MapView
          initialRegion={{
            latitude: 37.4274,
            longitude: -122.1697,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        style={styles.mapStyle} >

        <Marker
            coordinate={{
              latitude: 37.4274,
              longitude: -122.1697,
            }}
            title="HELP ME">
        </Marker>

        {this.state.coordinates.map(marker => (
          <Marker
          key={marker.name}
          coordinate={
            {latitude: marker.latitude,
            longitude: marker.longitude}}
          title={marker.name}
          >
          </Marker>
        ))
      }
        </MapView>
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
  mapStyle: {
    width: metrics.screenWidth,
    height: metrics.screenHeight,
  },
});
