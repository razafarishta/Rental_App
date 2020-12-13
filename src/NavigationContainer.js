import React from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import {
  CardStyleInterpolators,
  createStackNavigator,
  HeaderStyleInterpolators,
} from '@react-navigation/stack';
import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Feather from 'react-native-vector-icons/Feather';
import LandingScreen from './screens/Auth/LandingScreen';
import LoginScreen from './screens/Auth/LoginScreen';
import SignupScreen from './screens/Auth/SignupScreen';
import MainScreen from './screens/MainScreen';
import SplashScreen from './screens/Auth/SplashScreen';
import FilterScreen from './screens/Tabs/FilterScreen';
import NotificationScreen from './screens/Tabs/NotificationScreen';
import ProfileScreen from './screens/Tabs/ProfileScreen';
import AddProperty from './screens/AddProperty';
import RentDetail from './screens/Tabs/RentDetail';
import FavouriteScreen from './screens/FavouriteScreen';
const Navigation = () => {
  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();
  const mainTab = () => {
    return (
      <Tab.Navigator
      // tabBarOptions = {{
      //   activeTintColor
      // }}
      >
        <Tab.Screen
          name="Main"
          component={MainScreen}
          options={{
            // title="",
            tabBarIcon: () => <Feather name="home" size={30} />,
          }}
        />
        <Tab.Screen
          name="Filter"
          component={FilterScreen}
          options={{
            title: 'Filter',
            tabBarIcon: () => (
              <Image
                source={require('./assets/filter.png')}
                style={{width: 30, height: 30}}
              />
            ),
          }}
        />
        <Tab.Screen
          name="notification"
          component={NotificationScreen}
          options={{
            tabBarIcon: () => (
              <Ionicons name="notifications-outline" size={30} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: () => (
              <MaterialCommunityIcons name="account-outline" size={30} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  };
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
          headerStyleInterpolator: HeaderStyleInterpolators.forSlideRight,
        }}>
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Landing"
          component={LandingScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Register"
          component={SignupScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Main"
          component={mainTab}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Add"
          component={AddProperty}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="Notification"
          component={NotificationScreen}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="Rent"
          component={RentDetail}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="Filter"
          component={FilterScreen}
          options={{headerShown: true, title: 'Filter'}}
        />
        <Stack.Screen name="favourites" component={FavouriteScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Navigation;
