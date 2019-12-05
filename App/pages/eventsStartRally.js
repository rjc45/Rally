import React from 'react';
import { Button, StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import { Images, Metrics } from '../Themes';
import { BackButton } from '../components';
import { Entypo } from '@expo/vector-icons';

const eventImages = [ Images.event3Pic, Images.event2Pic, Images.event1Pic ];

export default class EventsStartRally extends React.Component {

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
    const { navigation } = this.props;

    return (
        <View>

          <Image source={eventImages[navigation.getParam('image')]} style={styles.eventImage}/>
            <Text style={styles.title}>{navigation.getParam('eventInfo').name}</Text>
            <Text style={styles.smallText}>{navigation.getParam('eventInfo').host}</Text>
            <Text style={styles.smallText}>{navigation.getParam('eventInfo').date}</Text>
            <Text style={styles.smallText}>{navigation.getParam('eventInfo').location}</Text>
            <Text></Text>
          <Text style={styles.title}>Rally with Interested Friends</Text>
          <View style={styles.friendRow}>
            <Text style={styles.largeText}>Friend 1</Text>
            <TouchableOpacity onPress={() => this.rallyButton(0)}>
            <View style={styles.checkBoxWrapper}>
              {this.state.arr[0].clicked ?
              <Entypo name='check' size={30} color='blue'/>
              : <Text></Text>}
            </View>
            </TouchableOpacity>
           </View>
           <View style={styles.friendRow}>
           <Text style={styles.largeText}>Friend 2</Text>
            <TouchableOpacity onPress={() => this.rallyButton(1)}>
            <View style={styles.checkBoxWrapper}>
              {this.state.arr[1].clicked ?
              <Entypo name='check' size={30} color='blue'/>
              : <Text></Text>}
            </View>
            </TouchableOpacity>
           </View>
           <View style={styles.friendRow}>
           <Text style={styles.largeText}>Friend 3</Text>
            <TouchableOpacity onPress={() => this.rallyButton(2)}>
            <View style={styles.checkBoxWrapper}>
              {this.state.arr[2].clicked ?
              <Entypo name='check' size={30} color='blue'/>
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

           <BackButton navigation={this.props.navigation} />
          </View>
    );
  }
}

const styles = StyleSheet.create({
  eventImage: {
    width: Metrics.screenWidth,
    height: Metrics.screenHeight * .4,
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
    paddingVertical: Metrics.screenHeight * .025
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
  bottombuttons: {
    paddingTop: Metrics.screenHeight * .02,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center'
  },
  friendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  check: {
    height: 35,
    width: 35,
  },
});
