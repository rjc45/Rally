import React from 'react';
import { StyleSheet, View, Image} from 'react-native';
import { Images, Metrics } from '../Themes';
import MapView from 'react-native-maps';
import { RallyLogo, BackButton, SideIcons } from '../components';

export default class FilterFriends extends React.Component {

  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.container}>
          <MapView style={styles.mapStyle} />
          
          <RallyLogo navigation={this.props.navigation} />
          <SideIcons navigation={this.props.navigation} />
          <BackButton navigation={this.props.navigation} />
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
  mapStyle: {
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
  },
});
