// In App.js in a new project

import * as React from 'react';
import {View, Text} from 'react-native';
import {Easing} from 'react-native-reanimated';
import {NavigationContainer} from '@react-navigation/native';
import LoginScreen from '../screens/Login/LoginScreen';
import TutorialScreen from '../screens/Tutorial/TutorialScreen';
import SignUpScreen from '../screens/SignUp/SignUpScreen';
import ForgotPass from '../screens/ForgotPass/ForgotPass';
import Otp from '../screens/OTP/Otp';
import SetNewPass from '../screens/SetNewPass/SetNewPass';
import {createStackNavigator} from '@react-navigation/stack';
import NoConnection from '../screens/NoConnection/NoConnection';
import { ScreenNames } from '../global';
 

const Stack = createStackNavigator();

// const Stack = createNativeStackNavigator();
// const config = {
//   animation: 'spring',
//   config: {
//     stiffness: 1000,
//     damping: 500,
//     mass: 3,
//     overshootClamping: false,
//     restDisplacementThreshold: 0.01,
//     restSpeedThreshold: 0.01,
//   },
// };

// const closeConfig = {
//   animation: 'timing',
//   config: {
//     duration: 5000,
//     easing: Easing.linear,
//   },
// };
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

function AuthRoute() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false, cardStyleInterpolator: forFade}}>
      <Stack.Screen
        name="Tutorial"
        component={TutorialScreen}
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
        name="Login"
        component={LoginScreen}
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
       
      {/* <Stack.Screen name={ScreenNames.NO_CONNECTION} component={NoConnection} /> */}
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
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
        name="ForgotPass"
        component={ForgotPass}
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
        name="Otp"
        component={Otp}
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
        name="SetNewPass"
        component={SetNewPass}
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
    </Stack.Navigator>
  );
}

export default AuthRoute;
