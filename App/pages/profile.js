import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Images, Metrics } from '../Themes';
import { RallyLogo, BackButton } from '../components';
import CardView from 'react-native-cardview';
import { ScrollView } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';

export default class Profile extends React.Component {

  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <Image 
          source={Images.yourImage}
          style={styles.profilePic}
        />
        <Text style={styles.header}>Your Profile</Text>

        <View style={styles.eventsLists}>
          <Text style={styles.headerText}>My Interests</Text>
          
          <ScrollView 
            horizontal={true}
            style={styles.sideScroll}
          >
            <CardView 
              cardElevation={2}
              cardMaxElevation={2}
              cornerRadius={5}
              style={styles.cards}
            >
              <Text style={styles.cardText}>Housing Justice</Text>
            </CardView>
            <CardView 
              cardElevation={2}
              cardMaxElevation={2}
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
                cardElevation={2}
                cardMaxElevation={2}
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
              cardElevation={2}
              cardMaxElevation={2}
              cornerRadius={5}
              style={styles.cards}
            >
              <Text style={styles.cardText}>Environmental Justice Dinner</Text>
              <Text>11/21/2019</Text>
              <Text>Okada Lounge</Text>
            </CardView>
            <CardView 
              cardElevation={2}
              cardMaxElevation={2}
              cornerRadius={5}
              style={styles.cards}
            >
              <Text style={styles.cardText}>Fossil Free Sit-In</Text>
              <Text>11/01/2019</Text>
              <Text>White Plaza</Text>
            </CardView>
            <CardView 
              cardElevation={2}
              cardMaxElevation={2}
              cornerRadius={5}
              style={styles.cards}
            >
              <Text style={styles.cardText}>SCoPE 2035 Rally</Text>
              <Text>10/22/2019</Text>
              <Text style={{textAlign: 'center'}}>Palo Alto City Hall</Text>
            </CardView>
          </ScrollView> 
        </View>

        <BackButton navigation={this.props.navigation}/>
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
    borderColor: 'black',
    borderWidth: 1,
    width: Metrics.screenWidth * 0.33,
    height: Metrics.screenHeight * 0.1,
    padding: 10,
    margin: 10,
    marginLeft: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 25,
    fontWeight: 'bold',
    paddingBottom: 10,
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
});
