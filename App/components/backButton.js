import React, { Component } from 'react'
import { StyleSheet, View, Image, TouchableOpacity} from 'react-native'
import { Images, Metrics } from '../Themes';
import { AntDesign } from '@expo/vector-icons';

export default class BackButton extends Component {

  render () {
    return (
      <View style={styles.backButton}>
        <TouchableOpacity
          onPress={() => this.props.navigation.goBack()}
        >
          <View style={styles.checkBoxWrapper}>
            <AntDesign
              name='arrowleft'
              size={35}
              color='black'
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    top: '7%',
    alignSelf: 'flex-start',
    paddingLeft: 15,
  },
  checkBoxWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    backgroundColor: '#FFFFFF',
    borderColor: 'gray',
    borderWidth: 0.2,
    borderRadius: 20,
    paddingTop: 2,
  },
});