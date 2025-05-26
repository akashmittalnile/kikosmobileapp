import * as React from 'react';
import {View, Text} from 'react-native'; 
import Profile from '../screens/Profile/Profile'
import ChangePassword from '../screens/Profile/ChangePassword';
import EditProfile from '../screens/Profile/EditProfile';
import {Easing} from 'react-native-reanimated';
import {createStackNavigator} from '@react-navigation/stack';
import ConfirmedTour from '../screens/BookTour/ConfirmedTour';
import NoConnection from '../screens/NoConnection/NoConnection';
import { ScreenNames } from '../global';
import ContactUs from '../screens/ContactUs/ContactUs';
 
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
const forFade = ({ current }) => ({
  cardStyle: {
    opacity: current.progress,
  },
});
function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false,cardStyleInterpolator: forFade}}>
      <Stack.Screen name="Profile" component={Profile} options={{
          headerShown: false,
          transitionSpec: {
            open: config,
            close: closeConfig
          },
          gestureEnabled: true,
          gestureDirection: 'vertical',
          cardStyleInterpolator: ({ current, layouts }) => {
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
            }
          }
        }} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} options={{
          headerShown: false,
          transitionSpec: {
            open: config,
            close: closeConfig
          },
          gestureEnabled: true,
          gestureDirection: 'vertical',
          cardStyleInterpolator: ({ current, layouts }) => {
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
            }
          }
        }} />
      <Stack.Screen name='EditProfile' component={EditProfile} options={{
          headerShown: false,
          transitionSpec: {
            open: config,
            close: closeConfig
          },
          gestureEnabled: true,
          gestureDirection: 'vertical',
          cardStyleInterpolator: ({ current, layouts }) => {
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
            }
          }
        }} />
         <Stack.Screen name="ConfirmedTour" component={ConfirmedTour} options={{
          headerShown: false,
          transitionSpec: {
            open: config,
            close: closeConfig
          },
          gestureEnabled: true,
          gestureDirection: 'vertical',
          cardStyleInterpolator: ({ current, layouts }) => {
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
            }
          }
        }} />
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
        {/* <Stack.Screen name={ScreenNames.NO_CONNECTION} component={NoConnection} /> */}
      {/* <Stack.Screen name="ServiceDetails" component={ServiceDetails} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="UPloadResume" component={ChangePassword} />
      <Stack.Screen name="CreatePassword" component={CreatePassword} /> */}
    </Stack.Navigator>
  );
}

export default ProfileStack;
