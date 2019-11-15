import React, { Component } from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { TouchableHighlight } from 'react-native-gesture-handler'
import { Images, Metrics } from '../Themes';

export default class SideIcons extends Component {
  static navigationOptions = {
    headerTitle: (<Image source={Images.logo}/>),
  };

  render () {
    return (
      <View style={styles.sideIcons}> 
        <TouchableHighlight
          onPress={() => this.props.navigation.navigate('Messages')}
        >
          <Image source={Images.messages}/>
        </TouchableHighlight>

        <TouchableHighlight
          onPress={() => this.props.navigation.navigate('Profile')}
        >
          <Image source={Images.profile}/>
        </TouchableHighlight>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  sideIcons: {
    position: 'absolute',
    alignSelf: 'flex-end',
    top:'5%',
    paddingRight: 10,
  },
});