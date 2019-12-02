import React from 'react';
import { Button, StyleSheet, View, Image, Text, Alert, FlatList, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import { Marker, Callout } from 'react-native-maps';
import { Images, Metrics } from '../Themes';
import { RallyLogo, BackButton, SideIcons } from '../components';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { AntDesign } from '@expo/vector-icons';
import Constants from 'expo-constants';

const { height, width } = Dimensions.get('window')

export default class EventThreeStartRally extends React.Component {

  static navigationOptions = {
    header: null,
  };

  state = { 
    arr: [
      { friend: "friendOne", clicked: false },
      { friend: "friendTwo", clicked: false},
      { friend: "friendThree", clicked: false},
    ]
  };

  rallyButton(index) {
    let tmp = this.state.arr;
    tmp[index].clicked = !tmp[index].clicked;
    this.setState({ arr: tmp });
    return tmp[index].clicked;
  }

  render() {
    return (
        <View style={styles.scrollView}>
          <Image source={Images.event3Pic} style={styles.eventImage}/>
            <Text style={styles.title}>Mana `O Maunakea</Text>
            <Text style={styles.smallText}>Hosted by: Stanford Hui O Nā Moku</Text>
            <Text style={styles.smallText}>Oct. 30 | 6:30PM - 8:30PM</Text>
            <Text style={styles.smallText}>Native American Culture Center</Text>
            <Text></Text>
          <Text style={styles.title}>Rally with Friends</Text>
          <View style={styles.friendRow}>
            <Text style={styles.largeText}>Friend 1</Text>
            <TouchableOpacity onPress={() => this.rallyButton(0)}>
            <View style={styles.checkBoxWrapper}>
              {this.state.arr[0].clicked ?
              <Image source={Images.star} style={styles.star}/> 
              : <Text></Text>}
            </View>
            </TouchableOpacity>
           </View>
           <View style={styles.friendRow}>
           <Text style={styles.largeText}>Friend 2</Text>
            <TouchableOpacity onPress={() => this.rallyButton(1)}>
            <View style={styles.checkBoxWrapper}>
              {this.state.arr[1].clicked ?
              <Image source={Images.star} style={styles.star}/> 
              : <Text></Text>}
            </View>
            </TouchableOpacity>
           </View>
           <View style={styles.friendRow}>
           <Text style={styles.largeText}>Friend 3</Text>
            <TouchableOpacity onPress={() => this.rallyButton(2)}>
            <View style={styles.checkBoxWrapper}>
              {this.state.arr[2].clicked ?
              <Image source={Images.star} style={styles.star}/> 
              : <Text></Text>}
            </View>
            </TouchableOpacity>
           </View>
           <View style={styles.bottombuttons}>
           <Button
              title="Let's Rally!"
              onPress={() => this.props.navigation.navigate('Messages')}
            />
           </View>
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
  foreground: {
    height: 700, 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center', 
    paddingTop: 10,
  },
  map: {
    flex: 1,
  },
  mapStyle: {
    flex: 1,
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
  },
  info: {
    flex: 2.5,
  },
  eventImage: {
    width: Metrics.screenWidth,
    height: 300,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 10,
  },
  smallText: {
    fontSize: 16,
    textAlign: 'center',
  },
  largeText: {
    fontSize: 24,
    textAlign: 'left',
    paddingVertical: height * .025
  },
  checkBoxWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    backgroundColor: '#F0F0F0',
    borderRadius: 20
  },
  checkBox: {
    height: 25,
    width: 25,
  },
  description: {
    textAlign: 'center',
  },
  bottombuttons: {
    paddingTop: height * .02,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center'
  },
  friendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  star: {
    height: 25,
    width: 25,
  },
});