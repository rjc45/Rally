import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Images } from '../Themes';
import metrics from '../Themes/Metrics';

export default class Profile extends React.Component {

  static navigationOptions = {
    headerTitle: (<Image source={Images.logo}/>),
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
    width: metrics.screenWidth,
    height: metrics.screenHeight,
  },
});
