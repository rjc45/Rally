import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import { Marker, Callout } from 'react-native-maps';
import { Images, Metrics } from '../Themes';
import { RallyLogo, BackButton, SideIcons } from '../components';
import CardView from 'react-native-cardview'

const { height, width } = Dimensions.get('window')

export default class EventTwo extends React.Component {

  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.container}>

        <MapView
          initialRegion={{
            latitude: 37.4200,
            longitude: -122.1697,
            latitudeDelta: 0.0300,
            longitudeDelta: 0.0001,
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
              latitude: 37.425682,
              longitude: -122.167445,
            }}
            title="Social Justice Activities Fair">
            <Image source = {Images.event2}/>
          </Marker>
        </MapView>

        <RallyLogo navigation={this.props.navigation} />
        <SideIcons navigation={this.props.navigation} />
        <BackButton navigation={this.props.navigation} />

        <View style={styles.card}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('EventTwoExpanded')}>
            <CardView
              cardElevation={2}
              cardMaxElevation={2}
              cornerRadius={5}
              >
                <Image 
                  source={Images.event2Card}
                  style={styles.imagePic}/>
                
                <View style={styles.description}>
                  <Image source={Images.event2}/>
                  <View>
                    <Text style={styles.title}>Social Justice Activities Fair</Text>
                    <Text style={styles.smallText}>Nov. 1 | 4PM - 6PM</Text>
                    <Text style={styles.smallText}>Columbae Lawn</Text>
                  </View>
                </View>
            </CardView>
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
  card: {
    position: 'absolute',
    top: '60%',
    backgroundColor: 'white',
    width: '90%',
    height: 300,
    borderRadius: 30,
  },
  imagePic: {
    width: '100%',
    height: 200,
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
});
