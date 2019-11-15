import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Images, Metrics } from '../Themes';

export default class Messages extends React.Component {

  static navigationOptions = {
    headerTitle: (<Image source={Images.logo}/>),
   };

  render() {
    return (
      <View style={styles.container}>
        <Text> messages screen to do</Text>
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
