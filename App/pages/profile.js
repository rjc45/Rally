import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Images, Metrics } from '../Themes';
import { RallyLogo, BackButton } from '../components';
import CardView from 'react-native-cardview';
import { ScrollView } from 'react-native-gesture-handler';

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
        <Text>Your Profile</Text>

        <View style={styles.eventsLists}>
          <Text>My Interests</Text>
          
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
              <Text>Housing Justice</Text>
            </CardView>
            <CardView 
              cardElevation={2}
              cardMaxElevation={2}
              cornerRadius={5}
              style={styles.cards}
            >
              <Text>Environmental Justice</Text>
            </CardView>
          </ScrollView> 
        </View>

        <View style={styles.eventsLists}>
          <Text>Upcoming Events</Text>

          <ScrollView 
            horizontal={true}
            style={styles.sideScroll}
          >
            <Text>Event1</Text>
            <Text>Event2</Text>
          </ScrollView>
        </View>

        <View style={styles.eventsLists}>
          <Text>Past Events</Text>

          <ScrollView 
            horizontal={true}
            style={styles.sideScroll}
          >
            <Text>Event1</Text>
            <Text>Event2</Text>
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
  },
  sideScroll: {
    width: Metrics.screenWidth,
    padding: 10,
  },
  cards: {
    borderColor: 'black',
    borderWidth: 1,
    width: Metrics.screenWidth * 0.33,
    padding: 10,
  },
});
