import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Images, Metrics } from '../Themes';
import { BackButton } from '../components';
import CardView from 'react-native-cardview';
import { ScrollView } from 'react-native-gesture-handler';
import { AntDesign, SimpleLineIcons, Entypo } from '@expo/vector-icons';
import firebase from 'firebase';

export default class Profile extends React.Component {

  static navigationOptions = {
    header: null,
  };

  state = {
    shareLocation: true,
  }

  logout = async() => {
    await firebase.auth().signOut();
    this.props.navigation.navigate('LoginScreen')
  }

  locationPreference() {
    let tmp = !this.state.shareLocation;
    this.setState({ shareLocation: tmp });
  }

  render() {
    return (
      <View style={styles.container}>
        <BackButton navigation={this.props.navigation}/>
        <View style={styles.logout}>
          <TouchableOpacity onPress={() => this.logout()}>
            <SimpleLineIcons name='logout' size={35}/>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>

        <Image source={Images.yourImage} style={styles.profilePic}/>
        <Text style={styles.header}>Your Profile</Text>

        <View style={styles.locationPrompt}>
          <Text style={styles.locationText}>Share Location with friends?</Text>
          <TouchableOpacity onPress={() => this.locationPreference()}>
            <View style={styles.checkBoxWrapper}>
              {this.state.shareLocation ? <Entypo name='check' size={30} color='#449AFF'/> : <Text/>}
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.eventsLists}>
          <Text style={styles.headerText}>My Interests</Text>

          <ScrollView
            horizontal={true}
            style={styles.sideScroll}
          >
            <CardView
              cardElevation={5}
              cardMaxElevation={5}
              cornerRadius={5}
              style={styles.cards}
            >
              <Text style={styles.cardText}>Housing Justice</Text>
            </CardView>
            <CardView
              cardElevation={5}
              cardMaxElevation={5}
              cornerRadius={5}
              style={styles.cards}
            >
              <Text style={styles.cardText}>Environmental Justice</Text>
            </CardView>
          </ScrollView>
        </View>

        <View style={styles.eventsLists}>
          <Text style={styles.headerText}>Upcoming Events</Text>

          <ScrollView
            horizontal={true}
            style={styles.sideScroll}
          >
            <TouchableOpacity onPress={() => this.props.navigation.navigate('FilterEvents')}>
              <CardView
                cardElevation={5}
                cardMaxElevation={5}
                cornerRadius={5}
                style={styles.cards}
              >
                <Text style={styles.cardText}>Explore Events</Text>
                <AntDesign
                  style={{paddingTop: 10}}
                  name='pluscircleo'
                  size={30}
                  color='black'
                />
              </CardView>
            </TouchableOpacity>
          </ScrollView>
        </View>

        <View style={styles.eventsLists}>
          <Text style={styles.headerText}>Past Events</Text>

          <ScrollView
            horizontal={true}
            style={styles.sideScroll}
          >
            <CardView
              cardElevation={5}
              cardMaxElevation={5}
              cornerRadius={5}
              style={styles.cards}
            >
              <Text style={styles.cardText}>Environmental Justice Dinner</Text>
              <Text>11/21/2019</Text>
              <Text>Okada Lounge</Text>
            </CardView>
            <CardView
              cardElevation={5}
              cardMaxElevation={5}
              cornerRadius={5}
              style={styles.cards}
            >
              <Text style={styles.cardText}>Fossil Free Sit-In</Text>
              <Text>11/01/2019</Text>
              <Text>White Plaza</Text>
            </CardView>
            <CardView
              cardElevation={5}
              cardMaxElevation={5}
              cornerRadius={5}
              style={styles.cards}
            >
              <Text style={styles.cardText}>SCoPE 2035 Rally</Text>
              <Text>10/22/2019</Text>
              <Text style={{textAlign: 'center'}}>Palo Alto City Hall</Text>
            </CardView>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logout: {
    position: 'absolute',
    top: '7%',
    alignSelf: 'flex-end',
    paddingRight: 25,
  },
  logoutText: {
    fontSize: 9,
    textAlign: 'center',
    paddingLeft: 7,
  },
  profilePic: {
    borderRadius: 44,
  },
  eventsLists: {
    height: Metrics.screenHeight * 0.2,
    paddingTop: 10,
    justifyContent: 'space-between',
  },
  sideScroll: {
    width: Metrics.screenWidth,
    padding: 10,
  },
  cards: {
    width: Metrics.screenWidth * 0.33,
    height: Metrics.screenHeight * 0.1,
    padding: 10,
    margin: 10,
    marginLeft: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  header: {
    fontSize: 25,
    fontWeight: 'bold',
    padding: 10,
  },
  headerText: {
    padding: 10,
    paddingLeft: 30,
    fontSize: 20,
    fontWeight: 'bold',
  },
  cardText: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  locationPrompt: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontWeight: 'bold',
    fontSize: 14,
    paddingRight: 5,
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
});
