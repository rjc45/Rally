import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import { Images, Metrics } from '../Themes';
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
            latitudeDelta: 0.0222,
            longitudeDelta: 0.0001,
          }}
          style={styles.mapStyle}
        />

        <View style={styles.rallyLogo}>
          <Image source={Images.rally} />
        </View>

        <SideIcons navigation={this.props.navigation}/>

        <View style={styles.filters}>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('FilterEvents')}
          >
            <Image source={Images.filterEvents}/>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('FilterRallies')}
          >
            <Image source={Images.filterRallies}/>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('FilterFriends')}
          >
            <Image source={Images.filterFriends}/>
          </TouchableOpacity>

        </View>
      </View>
    );
  }
}

const { height, width } = Dimensions.get('window')

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
    top: '5.5%',
  },
  filters: {
    position: 'absolute',
    top: '90%',
    flexDirection: 'row',
    height: height * .3,
    width: width,
    justifyContent: 'space-around',
    alignItems: 'flex-start',
  },
});
