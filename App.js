import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import * as pages from './pages';

const StackNav = createStackNavigator({
  Home: {screen: pages.Home},
  Buttons: {screen: pages.Buttons},
},{
  initialRouteName: 'Home',
  // mode: 'modal',
});

const MyApp = createAppContainer(StackNav);
export default MyApp;