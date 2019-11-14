import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, Button } from 'react-native';
import map from '../assets/map.png';
import logo from '../assets/logo.png';
import filterEvents from '../assets/filter-events.png';
import { TouchableHighlight } from 'react-native-gesture-handler';

export default class Home extends React.Component {

  static navigationOptions = {
    headerTitle: (<Image source={logo}/>),
  };

  render() {
    return (
      <View style={styles.container}>
          <ImageBackground source={map} style={{width: '100%', height: '100%'}}>
            <View style={styles.filters}>
              
              <TouchableHighlight
                onPress={() => this.props.navigation.navigate('Buttons')}
              >
                <Image source={filterEvents}/>
              </TouchableHighlight> 


            </View>
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
  filters: {
    flex: 1
  },
});