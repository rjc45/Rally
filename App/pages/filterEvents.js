import React from 'react';
import { StyleSheet, View, Image, Text, FlatList, TextInput } from 'react-native';
import { Images, Metrics} from '../Themes';
import MapView from 'react-native-maps';
import { Marker, Callout } from 'react-native-maps';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { RallyLogo, SideIcons, BackButton } from '../components';
import { TouchableOpacity } from 'react-native-gesture-handler'
import { AntDesign, Entypo } from '@expo/vector-icons';
import firestore from '../../firebase';
import firebase from 'firebase';

const eventIcons = [ Images.event1, Images.event2, Images.event3 ];

export default class FilterEvents extends React.Component {

  static navigationOptions = {
    header: null,
  };

  state = {
    searchText: '',
    events: [],
  }

  componentDidMount() {
    this.getEvents();
  }

  getEvents = async () => {
    try {
      let eventsData = [];
      let eventCollectionRef = firestore.collection('events').orderBy('id', 'asc');
      let allEvents = await eventCollectionRef.get();
      allEvents.forEach((event) => {
        eventsData.push(event.data());
      })
      this.setState({ events: eventsData })
      
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { searchText } = this.state;

    return (
      <ParallaxScrollView
        contentBackgroundColor="white"
        parallaxHeaderHeight={Metrics.screenHeight * .8}
        renderForeground={() => (
          <View style={styles.foreground}>
            <View style={styles.container}>
              <MapView
                initialRegion={{
                  latitude: 37.4274,
                  longitude: -122.1697,
                  latitudeDelta: 0.0222,
                  longitudeDelta: 0.0001,
                }}
                style={styles.mapStyle}
              >

                <Marker
                  coordinate={{
                    latitude: 37.4274,
                    longitude: -122.1697,
                  }}>
                  <Image source={Images.currentLocation}/>
                </Marker>

                <Marker
                  coordinate={{
                    latitude: 37.4274,
                    longitude: -122.1697,
                  }}>
                  <Image source={Images.currentLocation2}/>
                </Marker>

                {this.state.events.map((event) => {
                  return (
                    <Marker key={event.id}
                      coordinate={{
                        latitude: event.latitude,
                        longitude: event.longitude,
                      }}
                      title={event.name}>
                      <TouchableOpacity onPress={() => this.props.navigation.navigate(event.navigation)}>
                        <Image source={eventIcons[Number(event.id) - 1]}/>
                      </TouchableOpacity>
                    </Marker>
                  );
                })}
              </MapView>

            <RallyLogo navigation={this.props.navigation} />
            <SideIcons navigation={this.props.navigation} />
            <BackButton navigation={this.props.navigation} />
          </View>
        </View>
      )}>

        <View style={styles.scrollView}>
          <View style={styles.visualization}>
            <Entypo name='chevron-small-up' size={30} style={{justifyContent: 'center'}}/>
          </View>
          <View style={styles.visualization}>
            <Text style={styles.title}>Filtering By Events</Text>
            <Image
              source={Images.filterEvents}
              style={{height: 25, width: 17}}
            />
          </View>

          <View style={styles.search}>
            <TouchableOpacity>
              <AntDesign
                name='search1'
                style={{paddingLeft: 10}}
              />
            </TouchableOpacity>
            <TextInput
              placeholder=''
              onChangeText={searchText => this.setState({searchText})}
              value={searchText}
            />
          </View>

          <FlatList
            data={this.state.events}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => this.props.navigation.navigate(item.navigation)}>
                <View style={styles.listItems}>
                  <Image source={eventIcons[Number(item.id) - 1]}/>
                  <Text style={styles.listText}>{item.name}</Text>
                  <Text style={styles.smallText}>{item.distance}</Text>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={item => item.id}
          />
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
  scrollView: {
    borderRadius: 10,
  },
  visualization: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    paddingTop: 5,
    paddingRight: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  search: {
    marginTop: 20,
    marginLeft: 40,
    marginRight: 40,
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
  },
  listItems: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
    padding: 20,
    paddingLeft: 0,
    borderColor: 'gray',
    borderBottomWidth: 1,
  },
  listText: {
    fontSize: 20,
    paddingRight: 10,
  },
  smallText: {
    fontSize: 13,
    paddingTop: 4,
  },
  mapStyle: {
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
  },
});
