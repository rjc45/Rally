import React from 'react';
import { Button, StyleSheet, View, Image, Text, Alert, TouchableOpacity } from 'react-native';
import MapView from 'react-native-maps';
import { Marker, Polyline } from 'react-native-maps';
import { Images, Metrics } from '../Themes';
import { RallyLogo, BackButton, SideIcons, CurrentLocationIcon } from '../components';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import firestore from '../../firebase';
import firebase from 'firebase';
import { material, human, iOSColors, systemWeights } from 'react-native-typography'


const ralliesIcons = [ Images.rally1, Images.rally2 ];
const ralliesImages = [ Images.rally1Pic, Images.rally2Pic ];
const transportationIcons = [ 'numeric-1-box-outline', 'numeric-2-box-outline' ];

export default class RalliesExpanded extends React.Component {

  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    var user = firebase.auth().currentUser;
    this.roomsRef = firestore.collection('users/' + user.uid  + '/rooms');
    this.state = {
      rooms: [],
      rally: false,
      highlightedRoute: 0,
    }
  }

  pressRoute(index) {
    if (this.state.highlightedRoute !== index) {
      this.setState({ highlightedRoute: index});
    }
    this.props.navigation.navigate('Transportation',
    { info: this.props.navigation.getParam('info'),
    image: this.props.navigation.getParam('image'), 
    highlightedRoute: index,
    type: 'rallies'});
  };

  openMessages(room) {
    if (room.key == '6HBpyQIweArvlyP50LiK') {
      var users = ['Sophie'];
      this.props.navigation.navigate('GiftedMessages', {roomKey: room.key, roomName: "What is Asian American Studies?", users_arr: users});
    } else if (room.key == 'fTokbgBc9FSDrmmiO63u') {
      var users = ['Sophie', 'Patrick'];
      this.props.navigation.navigate('GiftedMessages', {roomKey: room.key, roomName: 'Sexual Violence Town Hall', users_arr: users});
    }
  }

  rallyButton() {
    let tmp = !this.state.interested;
    this.setState({ interested: tmp });
    var FirebaseDB = firebase.database();
    if (tmp) {
      Alert.alert('Success', 'You have joined ' + this.props.navigation.getParam('info').rallyOwner + '\'s Rally!');
    }
    if (this.props.navigation.getParam('info').rallyOwner == 'Sophie') {
      this.roomsRef.doc('6HBpyQIweArvlyP50LiK').set({
        name: "What is Asian American Studies?",
      });
      this.openMessages(FirebaseDB.ref('messages/6HBpyQIweArvlyP50LiK'));
    } else if (this.props.navigation.getParam('info').rallyOwner == 'Patrick') {
      this.roomsRef.doc('fTokbgBc9FSDrmmiO63u').set({
        name: 'Sexual Violence Town Hall',
      })
      this.openMessages(FirebaseDB.ref('messages/fTokbgBc9FSDrmmiO63u'));
    }
  }

  render() {
    const { navigation } = this.props;
    const { highlightedRoute } = this.state;

    return (
      <ParallaxScrollView
        contentBackgroundColor="white"
        parallaxHeaderHeight={Metrics.screenHeight * .6}
        renderForeground={() => (
          <View style={styles.foreground}>
            <View style={styles.container}>
              <MapView
                initialRegion={{
                  latitude: navigation.getParam('info').latInit,
                  longitude: navigation.getParam('info').longInit,
                  latitudeDelta: navigation.getParam('info').latdelta,
                  longitudeDelta: 0.0001,
                }}
                style={styles.mapStyle}
              >

              <CurrentLocationIcon/>

              <Marker
                coordinate={{
                  latitude: navigation.getParam('info').latitude,
                  longitude: navigation.getParam('info').longitude,
                }}
                title={navigation.getParam('info').name}
              >
                <Image source={ralliesIcons[navigation.getParam('image')]}/>
              </Marker>

              {Object.keys(navigation.getParam('info').routes).map((key, index) => {
                  let route = navigation.getParam('info').routes[key];

                  return (
                    <View key={index}>
                      <Polyline
                        coordinates={route}
                        strokeWidth={3}
                        strokeColor={highlightedRoute === index ? '#729CEF' : '#BBBDBF'}
                        tappable={true}
                        onPress={() => this.pressRoute(index)}
                      />
                      <Marker
                        coordinate={{
                          latitude: navigation.getParam('info').transport[index]['_lat'],
                          longitude: navigation.getParam('info').transport[index]['_long'],
                        }}
                      >
                        <TouchableOpacity onPress={() => this.pressRoute(index)}>
                          <MaterialCommunityIcons name={transportationIcons[index]} size={25}/>
                        </TouchableOpacity>
                      </Marker>
                    </View>
                  );
                })}

                {navigation.getParam('info').routeWalk &&
                  <Polyline
                    coordinates={navigation.getParam('info').routeWalk}
                    strokeWidth={2}
                    strokeColor={'#729CEF'}
                    lineDashPattern={[1, 5]}
                  />
                }

            </MapView>

            <RallyLogo navigation={this.props.navigation} />
            <SideIcons navigation={this.props.navigation} />
            <BackButton navigation={this.props.navigation} />
          </View>
        </View>
      )}>


        <View style={styles.scrollView}>
          <View style={styles.alignCenter}>
            <Entypo name='chevron-small-up' size={30}/>
            <Text style={styles.title}>{navigation.getParam('info').name}</Text>
            <Image source={ralliesImages[navigation.getParam('image')]} style={styles.eventImage}/>
          </View>

          <View style={styles.text}>
            <Text style={styles.smallText}>{navigation.getParam('info').host}</Text>
            <Text style={styles.smallText}>{navigation.getParam('info').date}</Text>
            <Text style={styles.smallText}>{navigation.getParam('info').location}</Text>
          </View>
          <View style={styles.text}>
            <Text style={styles.description}>{navigation.getParam('info').bodyOne} </Text>
          </View>
          {navigation.getParam('info').bodyTwo &&
            <View style={styles.text}>
              <Text style={styles.description}>{navigation.getParam('info').bodyTwo}</Text>
            </View>
          }
          {navigation.getParam('info').bodyThree &&
            <View style={styles.text}>
              <Text style={styles.description}>{navigation.getParam('info').bodyThree}</Text>
            </View>
          }


          <View style={styles.bottombuttons}>
          <TouchableOpacity
            style={styles.interested}
            onPress={() => navigation.getParam('info').rallyOwner == "Patrick" 
            ? this.props.navigation.navigate('FriendTwo') : this.props.navigation.navigate('FriendOne')}
            >
              <Text style={[human.title3, systemWeights.semibold, {color: iOSColors.blue, textAlign: 'center'}]}>
              {'View ' + navigation.getParam('info').rallyOwner + '\'s Profile'}</Text>
          </TouchableOpacity>

            {this.state.interested ?
              <TouchableOpacity
                style={styles.interested}
                onPress={() => this.rallyButton()}
                >
                  <Text style={[human.title3, systemWeights.semibold, {color: iOSColors.blue, textAlign: 'center'}]}>
                  {'View ' + navigation.getParam('info').rallyOwner + '\'s Rally'}</Text>
              </TouchableOpacity>
            :
            <TouchableOpacity
              style={styles.interested}
              onPress={() => this.rallyButton()}
              >
                <Text style={[human.title3, systemWeights.semibold, {color: iOSColors.blue, textAlign: 'center'}]}>
                {'Join ' + navigation.getParam('info').rallyOwner + '\'s Rally'}</Text>
            </TouchableOpacity>
            }
          </View>
        </View>
      </ParallaxScrollView>
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
  mapStyle: {
    flex: 1,
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
  },
  scrollView: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  alignCenter: {
    alignItems: 'center',
  },
  eventImage: {
    width: Metrics.screenWidth * 0.90,
    height: Metrics.screenHeight * 0.3,
    margin: 10,
    borderRadius: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  smallText: {
    fontSize: 16,
    textAlign: 'center',
  },
  text: {
    padding: 10,
  },
  description: {
    textAlign: 'center',
  },
  bottombuttons: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    paddingTop: 10,
  },
  confirmedInterest: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  star: {
    height: 25,
    width: 30,
    alignItems: 'center'
  },
  interested: {
    backgroundColor: 'white',
    paddingTop:5,
    paddingBottom:5,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 20,
    borderColor: '#c4c4c4',
    borderWidth: 1,
    margin: 10
  }
});
