
import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native';
import map from '../../assets/map.png';
import logo from '../../assets/logo.png';

export default class Buttons extends React.Component {

  static navigationOptions = {
    headerTitle: (<Image source={logo}/>),
   };

  render() {
    return (
      <View style={styles.container}>
          <ImageBackground source={map} style={{width: '100%', height: '100%'}}>
          </ImageBackground>
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
});