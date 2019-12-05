import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Images, Metrics} from '../Themes';
import MapView from 'react-native-maps';
import { Marker, Callout } from 'react-native-maps';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { RallyLogo, SideIcons, BackButton, CurrentLocationIcon, ScrollView } from '../components';
import { TouchableOpacity } from 'react-native-gesture-handler'
import firestore from '../../firebase';

const rallyIcons = [ Images.rally1, Images.rally2 ];

export default class FilterEvents extends React.Component {

  static navigationOptions = {
    header: null,
  };

  state = {
    rallies: [],
  }

  componentDidMount() {
    this.getRallies();
  }

  getRallies = async () => {
    try {
      let ralliesData = [];
      let rallyCollectionRef = firestore.collection('rallies').orderBy('id', 'asc');
      let allRallies = await rallyCollectionRef.get();
      allRallies.forEach((rally) => {
        ralliesData.push(rally.data());
      })
      this.setState({ rallies: ralliesData })
      
    } catch (error) {
      console.log(error);
    }
  }

  render() {
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
                  latitudeDelta: 0.0250,
                  longitudeDelta: 0.0001,
                }}
                style={styles.mapStyle}
              >
                <CurrentLocationIcon/>

                {this.state.rallies.map((rally) => {
                  return (
                    <Marker key={rally.id}
                      coordinate={{
                        latitude: rally.latitude,
                        longitude: rally.longitude,
                      }}
                      title={rally.name}>
                      <TouchableOpacity onPress={() => this.props.navigation.navigate(rally.navigation)}>
                        <Image source={rallyIcons[Number(rally.id) - 1]}/>
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

        <ScrollView
          filter={'Filtering By Rallies'}
          expanded={'RalliesExpanded'}
          icon={Images.filterRallies}
          navigation={this.props.navigation}
          data={this.state.rallies}
        />

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
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
  },
});
