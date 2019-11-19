import React, { Component } from 'react'
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import { Images, Metrics } from '../Themes';

export default class RallyLogo extends Component {

  render () {
    return (
      <View style={styles.rallyLogo}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Home')}
        >
          <Image source={Images.rally}/>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rallyLogo: {
    position: 'absolute',
    top: '6%',
  },
});
