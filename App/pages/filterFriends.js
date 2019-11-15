import React from 'react';
import { StyleSheet, View, Image} from 'react-native';
import { Images } from '../Themes';
import metrics from '../Themes/Metrics';
import MapView from 'react-native-maps';

export default class FilterFriends extends React.Component {

  static navigationOptions = {
    headerTitle: (<Image source={Images.logo}/>),
  };

  render() {
    return (
      <View style={styles.container}>
          <MapView style={styles.mapStyle} />
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
