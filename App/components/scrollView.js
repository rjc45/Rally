import React, { Component } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text, TextInput, FlatList } from 'react-native';
import { Images, Metrics } from '../Themes';
import { AntDesign, Entypo } from '@expo/vector-icons';

const eventIcons = [ Images.event1, Images.event2, Images.event3 ];
const rallyIcons = [ Images.rally1, Images.rally2 ];
const friendsIcons = [ Images.friend1, Images.friend2 ];

export default class ScrollView extends Component {

  state = {
    searchText: '',
  }

  render () {
    const { searchText } = this.state;

    return (

      <View style={styles.scrollView}>
        <View style={styles.visualization}>
          <Entypo name='chevron-small-up' size={30} style={{justifyContent: 'center'}}/>
        </View>
        <View style={styles.visualization}>
          <Text style={styles.title}>{this.props.filter}</Text>
          <Image
            source={this.props.icon}
            style={{height: 25, width: 28}}
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
          data={this.props.data}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => this.props.navigation.navigate(item.navigation)}>
              <View style={styles.listItems}>
                {this.props.filter == 'Filtering By Events' &&
                  <Image source={eventIcons[Number(item.id) - 1]}/>
                }
                {this.props.filter == 'Filtering By Rallies' &&
                  <Image source={rallyIcons[Number(item.id) - 1]}/>
                }
                {this.props.filter == 'Filtering By Friends' &&
                  <Image 
                    source={friendsIcons[Number(item.id) - 1]}
                    style={styles.icon}
                  />
                }
                <Text style={styles.bigText}>{item.name}</Text>
                <Text style={styles.smallText}>{item.distance}</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
    justifyContent: 'space-between',
    marginLeft: 30,
    marginRight: 30,
    paddingTop: 20,
    paddingBottom: 20,
    borderColor: 'gray',
    borderBottomWidth: 1,
  },
  bigText: {
    fontSize: 20,
    width: Metrics.screenWidth * 0.6,
  },
  smallText: {
    fontSize: 13,
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});
