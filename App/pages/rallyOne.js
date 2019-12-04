import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import { Marker, Callout } from 'react-native-maps';
import { Images, Metrics } from '../Themes';
import { RallyLogo, BackButton, SideIcons } from '../components';
import CardView from 'react-native-cardview'

const { height, width } = Dimensions.get('window')

export default class EventThree extends React.Component {

  static navigationOptions = {
    header: null,
  };

  state = { joinRally: false };

  joinRallyButton() {
    this.setState({ joinRally: true});
    alert('You joined this Rally!');
  }

  render() {
    return (
      <View style={styles.container}>

        <MapView
          initialRegion={{
            latitude: 37.4250,
            longitude: -122.1697,
            latitudeDelta: 0.0200,
            longitudeDelta: 0.00005,
          }}
          style={styles.mapStyle}
        >
          <Marker
            coordinate={{
              latitude: 37.4274,
              longitude: -122.1697,
            }}>
            <Image source={Images.currentLocation}/>
          </Marker>

          <Marker
            coordinate={{
              latitude: 37.4274,
              longitude: -122.1697,
            }}>
            <Image source={Images.currentLocation2}/>
          </Marker>

          <Marker
            coordinate={{
              latitude: 37.427799,
              longitude: -122.171198,
            }}
            title="Mano `O Maunakea">
            <Image source = {Images.rally1}/>
          </Marker>

        </MapView>

        <RallyLogo navigation={this.props.navigation} />
        <SideIcons navigation={this.props.navigation} />
        <BackButton navigation={this.props.navigation} />

        <View style={styles.cardContainer}>
          <View style={styles.cardObject}>
            <Image
              source={Images.event3Card}
              style={styles.imagePic}/>
              <View style={styles.description}>
                <Image source={Images.event1}/>
                <View>
                  <Text style={styles.title}>Mana `O Maunakea</Text>
                  <Text style={styles.smallText}>Oct. 30 | 6:30PM - 8:30PM</Text>
                  <Text style={styles.smallText}>Native American Culture Center</Text>
                </View>
              </View>
          </View>
        </View>

        <View style={styles.lowerContainer}>
        <TouchableOpacity onPress={() => this.joinRallyButton()}>
          <View style={styles.joinRallyButton}>
              <Text style={styles.title}>Join Sophie's Rally</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile')}>
          <View style={styles.profileButton}>
            <Text style={styles.title}>See Sophie's Profile</Text>
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
  cardContainer: {
    height: height * .3,
    width: width,
    alignItems: 'center'
  },
  lowerContainer: {
    height: height * .15,
    width: width,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  cardObject: {
    borderRadius: 18,
    width: width * .9,
    height: height * .3,
    borderColor: 'gray',
    borderWidth: 2,
  },
  mapStyle: {
    flex: 1,
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
  },
  card: {
    width: '90%',
    height: 300,
    borderRadius: 30,
    flexDirection: 'row'
  },
  imagePic: {
    width: '100%',
    height: height * .2,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  profilePic: {
    width: 30,
    height: 30,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 15,

  },
  description:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
  },
  smallText: {
    fontSize: 13,
    paddingLeft: 10,
  },
  joinRallyButton: {
    borderRadius: 18,
    width: 150,
    height: 75,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'gray'
  },
  profileButton: {
    borderRadius: 18,
    width: 150,
    height: 75,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'gray'
  },

});
