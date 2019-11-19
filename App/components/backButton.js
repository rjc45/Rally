import React, { Component } from 'react'
import { StyleSheet, View, Image, TouchableOpacity} from 'react-native'
import { Images, Metrics } from '../Themes';

export default class BackButton extends Component {

  render () {
    return (
      <View style={styles.backButton}>
        <TouchableOpacity
          onPress={() => this.props.navigation.goBack()}
        >
          <Image 
            source={Images.back}
            style={{width: 30, height: 30}}
          />
        </TouchableOpacity>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    top: '6%',
    alignSelf: 'flex-start',
    paddingLeft: 15,
  },
});