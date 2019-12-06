import React, { Component } from 'react'
import { StyleSheet, View, Image, TouchableOpacity} from 'react-native'
import { Images, Metrics } from '../Themes';
import { AntDesign } from '@expo/vector-icons';

export default class BackButtonMessages extends Component {

  render () {
    return (
      <View style={styles.backButton}>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>
            <AntDesign name='arrowleft' size={35}/>
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
