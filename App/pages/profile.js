import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Images, Metrics } from '../Themes';
import { RallyLogo } from '../components';

export default class Profile extends React.Component {

  static navigationOptions = {
    headerTitle: <Text> My Profile </Text>,
   };

  render() {
    return (
      <View style={styles.container}>
        <Image source={Images.yourImage} />
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
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
  },
});
