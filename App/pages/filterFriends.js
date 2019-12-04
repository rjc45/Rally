import React from 'react';
import { StyleSheet, View, Image, Text, Alert, FlatList, TextInput, Dimensions} from 'react-native';
import { Images, Metrics } from '../Themes';
import MapView from 'react-native-maps';
import { Marker, Callout } from 'react-native-maps';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { RallyLogo, SideIcons, BackButton } from '../components';
import { TouchableOpacity } from 'react-native-gesture-handler'
import { AntDesign } from '@expo/vector-icons';

const friends = [
  {
    id: '1',
    image: Images.friend1,
    name: 'Sophie',
    distance: '5 mi',
    navigation: 'FriendOne',
  },
  {
    id: '2',
    image: Images.friend2,
    name: 'Patrick',
    distance: '7 mi',
    navigation: 'FriendTwo',
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
                  title="Sophie">
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('FriendOne')}>
                    <Image source = {Images.friend1} style={styles.icon}/>
                  </TouchableOpacity>
                </Marker>

                <Marker
                  coordinate={{
                    latitude: 37.425682,
                    longitude: -122.167445,
                  }}
                  title="Patrick">
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('FriendTwo')}>
                    <Image source = {Images.friend2} style={styles.icon}/>
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
            <Image source={Images.filterFriends}></Image>
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
                <TouchableOpacity onPress={() => this.props.navigation.navigate(item.navigation)}>
                  <View style={styles.listItems}>
                    <Image source={item.image} style={styles.icon}/>
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
  icon: {
    width: 50,
    height: 50,
    borderRadius: 25,
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
    paddingTop: 20,
    paddingBottom: 20,
    paddingRight: 10,
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
    paddingLeft: 20,
    paddingRight: 10,
  },
  smallText: {
    fontSize: 13,
    paddingTop: 2,
  },
  mapStyle: {
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
  },
});