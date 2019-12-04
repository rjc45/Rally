import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { Images, Metrics } from '../Themes';
import { SideIcons, CurrentLocationIcon } from '../components';

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
        >
          <CurrentLocationIcon/>

          <Marker
            coordinate={{
              latitude: 37.427799,
              longitude: -122.171198,
            }}
            title="Mano `O Maunakea">
            <TouchableOpacity onPress={() => this.props.navigation.navigate('EventThreeExpanded')}>
              <Image source = {Images.event1}/>
            </TouchableOpacity>
          </Marker>

          <Marker
            coordinate={{
              latitude: 37.425682,
              longitude: -122.167445,
            }}
            title="Social Justice Activities Fair">
            <TouchableOpacity onPress={() => this.props.navigation.navigate('EventTwoExpanded')}>
              <Image source = {Images.event2}/>
            </TouchableOpacity>
          </Marker>

          <Marker
            coordinate={{
              latitude: 37.420561,
              longitude: -122.166688,
            }}
            title="2020 Election Trivia Night">
            <TouchableOpacity onPress={() => this.props.navigation.navigate('EventOneExpanded')}>
              <Image source = {Images.event3}/>
            </TouchableOpacity>
          </Marker>
        </MapView>

        <Image source={Images.rally} style={styles.rallyLogo}/>
        <SideIcons navigation={this.props.navigation}/>

        <View style={styles.filters}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('FilterEvents')}
          >
            <View style={styles.checkBoxWrapper}>
              <Image source={Images.filterEvents}/>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('FilterRallies')}
          >
            <View style={styles.checkBoxWrapper}>
              <Image source={Images.filterRallies}/>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('FilterFriends')}
          >
            <View style={styles.checkBoxWrapper}>
              <Image source={Images.filterFriends}/>
            </View>
          </TouchableOpacity>
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
    top: '6%',
  },
  filters: {
    position: 'absolute',
    top: '85%',
    width: Metrics.screenWidth,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
  },
  checkBoxWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 80,
    backgroundColor: '#FFFFFF',
    borderColor: 'gray',
    borderWidth: 0.2,
    borderRadius: 40,
  },
});
