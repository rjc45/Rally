import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import MapView from 'react-native-maps';
import { Images, Metrics } from '../Themes';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { SideIcons } from '../components';

export default class Home extends React.Component {

  static navigationOptions = {
    header: null,
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
        />

        <View style={styles.rallyLogo}>
          <Image source={Images.logo} />
        </View>

        <SideIcons navigation={this.props.navigation}/>

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
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
  },
  rallyLogo: {
    position: 'absolute',
    top: '5%',
  },
  filters: {
    position: 'absolute',
    top: '85%',
    flexDirection: 'row',
  },
});
