import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Images } from '../Themes';
import metrics from '../Themes/Metrics';
import MapView from 'react-native-maps';

export default class FilterRallies extends React.Component {

  static navigationOptions = {
    headerTitle: (<Image source={Images.logo}/>),
   };

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
          style={styles.mapStyle} />
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
