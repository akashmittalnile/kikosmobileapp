// In App.js in a new project

import * as React from 'react';
import {View, Text} from 'react-native';
import {Easing} from 'react-native-reanimated';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../screens/Home/HomeScreen';
import Profile from '../screens/Profile/Profile';
import BookTaxiScreen from '../screens/BookTaxi/BookTaxiScreen';
import ProfileStack from './ProfileStack';
import BookTaxi from '../screens/BookTaxi/BookTaxi';
import {createStackNavigator} from '@react-navigation/stack';
import MyTour from '../screens/Home/MyTour';
import MyVirtualTour from '../screens/Home/MyVirtualTour';
import NoConnection from '../screens/NoConnection/NoConnection';
import { ScreenNames } from '../global';
import ContactUs from '../screens/ContactUs/ContactUs';
import ConfirmedTour from '../screens/BookTour/ConfirmedTour';

const Stack = createStackNavigator();
const config = {
  animation: 'bounce',
  config: {
    stiffness: 2000,
    damping: 500,
    mass: 10,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};
const closeConfig = {
  animation: 'timing',
  config: {
    duration: 500,
    easing: Easing.linear,
    direction: 'vertical',
  },
};
const forFade = ({current}) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

function BookTaxiStack() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false, cardStyleInterpolator: forFade}}>
      <Stack.Screen
        name="BookTaxiScreen"
        component={BookTaxiScreen}
        options={{
          headerShown: false,
          transitionSpec: {
            open: config,
            close: closeConfig,
          },
          gestureEnabled: true,
          gestureDirection: 'vertical',
          cardStyleInterpolator: ({current, layouts}) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateY: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.height, 0],
                    }),
                  },
                ],
              },
            };
          },
        }}
      />
      <Stack.Screen
        name="BookTaxi"
        component={BookTaxi}
        options={{
          headerShown: false,
          transitionSpec: {
            open: config,
            close: closeConfig,
          },
          gestureEnabled: true,
          gestureDirection: 'vertical',
          cardStyleInterpolator: ({current, layouts}) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateY: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.height, 0],
                    }),
                  },
                ],
              },
            };
          },
        }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          headerShown: false,
          transitionSpec: {
            open: config,
            close: closeConfig,
          },
          gestureEnabled: true,
          gestureDirection: 'vertical',
          cardStyleInterpolator: ({current, layouts}) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateY: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.height, 0],
                    }),
                  },
                ],
              },
            };
          },
        }}
      />
      <Stack.Screen
        name="ConfirmedTour"
        component={ConfirmedTour}/>
      <Stack.Screen
        name="ContactUs"
        component={ContactUs}
        options={{
          headerShown: false,
          transitionSpec: {
            open: config,
            close: closeConfig,
          },
          gestureEnabled: true,
          gestureDirection: 'vertical',
          cardStyleInterpolator: ({current, layouts}) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateY: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.height, 0],
                    }),
                  },
                ],
              },
            };
          },
        }}
      />
      <Stack.Screen name="MyTour" component={MyTour} />
      <Stack.Screen name="MyVirtualTour" component={MyVirtualTour} />
      {/* <Stack.Screen name={ScreenNames.NO_CONNECTION} component={NoConnection} /> */}
      {/* <Stack.Screen name="ServiceDetails" component={ServiceDetails} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="UPloadResume" component={UPloadResume} />
      <Stack.Screen name="CreatePassword" component={CreatePassword} /> */}
    </Stack.Navigator>
  );
}

export default BookTaxiStack;
