import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import * as pages from './App/pages';

const StackNav = createStackNavigator({
  Home: {screen: pages.Home},
  FilterEvents: {screen: pages.FilterEvents},
  FilterRallies: {screen: pages.FilterRallies},
  FilterFriends: {screen: pages.FilterFriends},
  Messages: {screen: pages.Messages},
  Profile: {screen: pages.Profile},
  EventOne: {screen: pages.EventOne},
  EventTwo: {screen: pages.EventTwo},
  EventThree: {screen: pages.EventThree},
  EventOneExpanded: {screen: pages.EventOneExpanded},
  EventTwoExpanded: {screen: pages.EventTwoExpanded},
  EventThreeExpanded: {screen: pages.EventThreeExpanded},
  EventOneStartRally: {screen: pages.EventOneStartRally},
  EventTwoStartRally: {screen: pages.EventTwoStartRally},
  EventThreeStartRally: {screen: pages.EventThreeStartRally},
},{
   initialRouteName: 'Home',
});

const MyApp = createAppContainer(StackNav);
export default MyApp;
