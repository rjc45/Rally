import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, Button } from 'react-native';
import { Images } from '../Themes';
import { TouchableHighlight } from 'react-native-gesture-handler';

export default class Home extends React.Component {

  static navigationOptions = {
    headerTitle: (<Image source={Images.logo}/>),
  };

  render() {
    return (
      <View style={styles.container}>
          <ImageBackground source={Images.map} style={{width: '100%', height: '100%'}}>
            <View style={styles.map}>
              
            </View>

            <View style={styles.filters}>
              
              <TouchableHighlight
                onPress={() => this.props.navigation.navigate('FilterEvents')}
              >
                <Image source={Images.filterEvents}/>
              </TouchableHighlight> 

              <TouchableHighlight
                onPress={() => this.props.navigation.navigate('FilterRallies')}
              >
                <Image source={Images.filterRallies}/>
              </TouchableHighlight> 

              <TouchableHighlight
                onPress={() => this.props.navigation.navigate('FilterFriends')}
              >
                <Image source={Images.filterFriends}/>
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
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 700,
  },
});