import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { ListMaster, ListAdd, ListView } from "../screens/list/index.js";
import { PlaceMaster, AddPlace, PlaceProfile, AddPlacetoList } from "../screens/place/index.js";
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { MaterialCommunityIcons } from '@expo/vector-icons';

//All list screens in one stack to allow for easy push / pop navigation
const ListMasterStack = createStackNavigator({
  ListMaster,
  ListAdd,
  ListView
}, { headerBackTitleVisible: false });

ListMasterStack.navigationOptions = {
  tabBarLabel: 'Lists'
};

//All place screens in one stack to allow for easy push / pop navigation
const PlaceMasterStack = createStackNavigator({
  PlaceMaster,
  AddPlace,
  PlaceProfile,
  AddPlacetoList
}, { headerBackTitleVisible: false });

PlaceMasterStack.navigationOptions = {
  tabBarLabel: 'Places'
};

//Combine both list and place stacks into bottom tab navigator for easy organization
export default createBottomTabNavigator(
  { ListMasterStack,
    PlaceMasterStack
}, {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'ListMasterStack') {
          iconName = `format-list-bulleted`;
        } else if (routeName === 'PlaceMasterStack') {
          iconName = `map-marker`;
        }
        return <MaterialCommunityIcons name={iconName} size={wp(6)} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'rgb(0,122,255)',
      inactiveTintColor: 'gray',
    },
  }
);
