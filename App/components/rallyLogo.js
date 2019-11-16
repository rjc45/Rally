import React, { Component } from 'react'
import { StyleSheet, View, Image, TouchableOpacity, Dimensions } from 'react-native'
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
const { height, width } = Dimensions.get('window')

const styles = StyleSheet.create({
  rallyLogo: {
    height: height * .2,
    width: width,
    position: 'absolute',
    top: '5%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});
