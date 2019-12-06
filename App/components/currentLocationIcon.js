import React, { Component } from 'react'
import { View, Image } from 'react-native'
import { Images } from '../Themes';
import { Marker } from 'react-native-maps';

export default class CurrentLocationIcon extends Component {

  render () {
    return (
      <View>
        <Marker
          coordinate={{
            latitude: 37.422632,
            longitude: -122.171757,
        }}>
          <Image source={Images.currentLocation}/>
        </Marker>

        <Marker
          coordinate={{
            latitude: 37.422632,
            longitude: -122.171757,
          }}>
            <Image source={Images.currentLocation2}/>
        </Marker>
      </View>
    );
  }
}
