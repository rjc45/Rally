import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, Button } from 'react-native';
import MapView from 'react-native-maps';
import { Images } from '../Themes';
import { TouchableHighlight } from 'react-native-gesture-handler';
import metrics from '../Themes/Metrics';

export default class Home extends React.Component {

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
          style={styles.mapStyle}
        > 
        </MapView>
        <View style={styles.filters}>

<TouchableHighlight
  onPress={() => this.props.navigation.navigate('FilterEvents')}
>
  <Image source={Images.filterEvents}/>
</TouchableHighlight>

<TouchableHighlight
  onPress={() => this.props.navigation.navigate('FilterRallies')}
>
  <Image source={Images.filterRallies}/>
</TouchableHighlight>

<TouchableHighlight
  onPress={() => this.props.navigation.navigate('FilterFriends')}
>
  <Image source={Images.filterFriends}/>
</TouchableHighlight>

</View>
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
    flex: 1,
    width: metrics.screenWidth,
    height: metrics.screenHeight,
  },
  filters: {
    position: 'absolute',
    top: '85%',
    flexDirection: 'row',
  },
});
