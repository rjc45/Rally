import React from 'react';
import { StyleSheet, View, Image, Text, Alert, FlatList, TextInput, Dimensions} from 'react-native';
import { Images, Metrics} from '../Themes';
import MapView from 'react-native-maps';
import { Marker, Callout } from 'react-native-maps';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { RallyLogo, SideIcons, BackButton } from '../components';
import { TouchableOpacity } from 'react-native-gesture-handler'
import { AntDesign } from '@expo/vector-icons';

const friends = [
  {
    friendNum: '1.',
    name: 'Ryan',
    distance: '5 mi',
    navigation: 'FriendOne',
  },
  {
    friendNum: '2.',
    name: 'Gabby',
    distance: '7 mi',
    navigation: 'FriendTwo',
  },
  {
    friendNum: '3.',
    name: 'Peter',
    distance: '12 mi',
    navigation: 'FriendThree',
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

                <Marker
                  coordinate={{
                    latitude: 37.427799,
                    longitude: -122.171198,
                  }}
                  title="Ryan">
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('EventThree')}>
                    <Image source = {Images.event1}/>
                  </TouchableOpacity>
                </Marker>

                <Marker
                  coordinate={{
                    latitude: 37.425682,
                    longitude: -122.167445,
                  }}
                  title="Gabby">
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('EventTwo')}>
                    <Image source = {Images.event2}/>
                  </TouchableOpacity>
                </Marker>

                <Marker
                  coordinate={{
                    latitude: 37.420561,
                    longitude: -122.166688,
                  }}
                  title="Peter">
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('EventOne')}>
                    <Image source = {Images.event3}/>
                  </TouchableOpacity>
                </Marker>
              </MapView>

            <RallyLogo navigation={this.props.navigation} />
            <SideIcons navigation={this.props.navigation} />
            <BackButton navigation={this.props.navigation} />
          </View>
        </View>
      )}>

        <View style={styles.scrollView}>
          <View style={styles.visualization}>
            <Text style={styles.title}>Filtering By Friends</Text>
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
            data={friends}
            renderItem={({ item }) => (
              <View style={styles.event}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate(item.navigation)}>
                  <Text style={styles.listText}>
                    <Text>{item.friendNum} </Text>
                    <Text>{item.name}  </Text>
                    <Text style={styles.smallText}>{item.distance}</Text>
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={item => item.friendNum}
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
    padding: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
  search: {
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
  listText: {
    paddingTop: 30,
    paddingLeft: 40,
    fontSize: 20,
    borderColor: 'gray',
    borderBottomWidth: 1,
  },
  smallText: {
    fontSize: 13,
  },
  mapStyle: {
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
  },
});