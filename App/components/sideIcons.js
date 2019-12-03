import React, { Component } from 'react'
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import { Images, Metrics } from '../Themes';
import { AntDesign } from '@expo/vector-icons';

export default class SideIcons extends Component {

  render () {
    return (
      <View style={styles.sideIcons}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Messages')}
        >
          <AntDesign
            name='mail'
            size={40}
            color='black'
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Profile')}
        >
          <AntDesign
            name='user'
            size={40}
            color='black'
          />
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
    paddingRight: 20,
  },
});
