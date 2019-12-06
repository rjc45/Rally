import React, { Component } from 'react'
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import { Images, Metrics } from '../Themes';
import { Feather, FontAwesome } from '@expo/vector-icons';

export default class SideIcons extends Component {

  render () {
    return (
      <View style={styles.sideIcons}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('GiftedChat')}
        >
          <View style={styles.checkBoxWrapper}>
            <Feather name='mail' size={35}/>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Profile')}
        >
          <View style={styles.checkBoxWrapper}>
            <FontAwesome name='user-o' size={35}/>
          </View>
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
    paddingRight: 15,
  },
  checkBoxWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 48,
    height: 48,
    backgroundColor: '#FFFFFF',
    borderColor: 'gray',
    borderWidth: 0.2,
    borderRadius: 24,
    marginBottom: 5,
  },
});
