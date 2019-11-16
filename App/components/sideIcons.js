import React, { Component } from 'react'
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import { Images, Metrics } from '../Themes';

export default class SideIcons extends Component {

  render () {
    return (
      <View style={styles.sideIcons}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Messages')}
        >
          <Image source={Images.messagesFilled}/>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Profile')}
        >
          <Image source={Images.profileFilled}/>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  sideIcons: {
    position: 'absolute',
    alignSelf: 'flex-end',
    top:'6%',
    paddingRight: 10,
  },
});
