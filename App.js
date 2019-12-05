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
  EventsExpanded: {screen: pages.EventsExpanded},
  EventsStartRally: {screen: pages.EventsStartRally},
  FriendOne: {screen: pages.FriendOne},
  FriendTwo: {screen: pages.FriendTwo},
  RalliesExpanded: {screen: pages.RalliesExpanded},
  LoginScreen: {screen: pages.LoginScreen},
  GiftedChat: {screen: pages.GiftedChat},
  GiftedMessages: {screen: pages.GiftedMessages},
},{
  initialRouteName: 'LoginScreen',
});

const MyApp = createAppContainer(StackNav);
export default MyApp;
