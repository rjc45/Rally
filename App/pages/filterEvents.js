import React from 'react';
import { StyleSheet, View, Image, Text, Alert, FlatList, TextInput} from 'react-native';
import { Images, Metrics} from '../Themes';
import MapView from 'react-native-maps';
import { Marker, Callout } from 'react-native-maps';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { RallyLogo, SideIcons, BackButton } from '../components';
import { TouchableOpacity } from 'react-native-gesture-handler'
import { AntDesign } from '@expo/vector-icons';


const events = [
  {
    eventNum: '1.',
    name: 'Social Justice Activities Fair',
    distance: '5 mi',
    navigation: 'Home',
  },
  {
    eventNum: '2.',
    name: '2020 Election Trivia Night',
    distance: '7 mi',
    navigation: 'Home',
  },
  {
    eventNum: '3.',
    name: 'Cardinal for Warren',
    distance: '12 mi',
    navigation: 'Home',
  },
];

export default class FilterEvents extends React.Component {

  static navigationOptions = {
    header: null,
  };

  state = {
    searchText: '',
  }

  _onPressButton() {
    Alert.alert("You tapped the button!")
  }

  render() {
    const { searchText } = this.state;

    return (
      <ParallaxScrollView
        contentBackgroundColor="white"
        parallaxHeaderHeight={700}
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
                  latitude: 37.427799,
                  longitude: -122.171198,
                }}
                title="Event 2">

                <TouchableOpacity onPress= {this._onPressButton}>
                  <Image source = {Images.event2}/>
                </TouchableOpacity>
              </Marker>

              <Marker
                coordinate={{
                  latitude: 37.4274,
                  longitude: -122.1697,
                }}
                title="Event 1">
                <Image source = {Images.event1}/>
              </Marker>

              <Marker
                coordinate={{
                  latitude: 37.425682,
                  longitude: -122.167445,
                }}
                title="Event 3">
                <Image source = {Images.event3}/>
              </Marker>
            </MapView>
          
            <RallyLogo navigation={this.props.navigation} />
            <SideIcons navigation={this.props.navigation} />
            <BackButton navigation={this.props.navigation} />
          </View>
        </View>
      )}>

        <View>
          <View style={styles.visualization}>
            <Text style={styles.listText}>Filtering By Events </Text>
            <Image 
              source={Images.filterEvents}
              style={{height: 25, width: 17}}
            />
          </View>

          <View style={styles.search}>
            <TextInput
              placeholder=''
              onChangeText={searchText => this.setState({searchText})}
              value={searchText}
            />
            <TouchableOpacity> 
              <AntDesign
                name='search1'
              />
            </TouchableOpacity>
          </View>

          <FlatList
            data={events}
            renderItem={({ item }) => (
              <View style={styles.event}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate(item.navigation)}>
                  <Text style={styles.listText}>
                    <Text>{item.eventNum} </Text>
                    <Text>{item.name}  </Text>
                    <Text style={styles.smallText}>{item.distance}  </Text>
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={item => item.eventNum}
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
  visualization: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  search: {
    marginLeft: 10,
    marginRight: 10,
    paddingTop: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
  },
  listText: {
    padding: 10,
    paddingLeft: 40,
    fontSize: 20,
  },
  smallText: {
    fontSize: 13,
  },
  mapStyle: {
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
  },
});
