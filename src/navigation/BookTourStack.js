// In App.js in a new project

import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Easing} from 'react-native-reanimated';
import BookTour from '../screens/BookTour/BookTour';

import RequestAFreeCallback from '../screens/Home/RequestAFreeCallback';
import BookAnTour from '../screens/Home/BookAnTour';
import ReviewBooking from '../screens/Home/ReviewBooking';
import ConfirmedTour from '../screens/BookTour/ConfirmedTour';
import FreeCallBackRqst from '../screens/BookTour/FreeCallBackRqst';
import ConfirmedTourDetails from '../screens/BookTour/ConfirmedTourDetails';
import ProfileStack from './ProfileStack';
import BookDetails from '../screens/Home/BookDetails';
import {createStackNavigator} from '@react-navigation/stack';
import MyTour from '../screens/Home/MyTour';
import MyVirtualTour from '../screens/Home/MyVirtualTour';
import PurchaseReview from '../screens/Purchase/Purchase';
import PaymentWebView from '../components/PaymentWebView';
import NoConnection from '../screens/NoConnection/NoConnection';
import {ScreenNames} from '../global';
import ContactUs from '../screens/ContactUs/ContactUs';
import PaymentProcessing from '../screens/PaymentProcessing/PaymentProcessing';

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
function BookTourStack() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false, cardStyleInterpolator: forFade}}>
      <Stack.Screen
        name="BookTour"
        component={BookTour}
        options={{
          headerShown: false,
          // transitionSpec: {
          //   open: config,
          //   close: closeConfig,
          // },
          // gestureEnabled: true,
          // gestureDirection: 'vertical',
          // cardStyleInterpolator: ({current, layouts}) => {
          //   return {
          //     cardStyle: {
          //       transform: [
          //         {
          //           translateY: current.progress.interpolate({
          //             inputRange: [0, 1],
          //             outputRange: [layouts.screen.height, 0],
          //           }),
          //         },
          //       ],
          //     },
          //   };
          // },
        }}
      />
      <Stack.Screen
        name="ConfirmedTour"
        component={ConfirmedTour}
        // options={{
        //     headerShown: false,
        //     transitionSpec: {
        //       open: config,
        //       close: closeConfig
        //     },
        //     gestureEnabled: true,
        //     gestureDirection: 'vertical',
        //     cardStyleInterpolator: ({ current, layouts }) => {
        //       return {
        //         cardStyle: {
        //           transform: [
        //             {
        //               translateY: current.progress.interpolate({
        //                 inputRange: [0, 1],
        //                 outputRange: [layouts.screen.height, 0],
        //               }),
        //             },
        //           ],
        //         },
        //       }
        //     }
        //   }}
      />
      <Stack.Screen
        name="FreeCallBackRqst"
        component={FreeCallBackRqst}
        // options={{
        //   headerShown: false,
        //   transitionSpec: {
        //     open: config,
        //     close: closeConfig,
        //   },
        //   gestureEnabled: true,
        //   gestureDirection: 'vertical',
        //   cardStyleInterpolator: ({current, layouts}) => {
        //     return {
        //       cardStyle: {
        //         transform: [
        //           {
        //             translateY: current.progress.interpolate({
        //               inputRange: [0, 1],
        //               outputRange: [layouts.screen.height, 0],
        //             }),
        //           },
        //         ],
        //       },
        //     };
        //   },
        // }}
      />
      <Stack.Screen
        name="ConfirmedTourDetails"
        component={ConfirmedTourDetails}
        options={{
          headerShown: false,
          transitionSpec: {
            open: config,
            close: closeConfig,
          },
          // gestureEnabled: true,
          // gestureDirection: 'vertical',
          // cardStyleInterpolator: ({current, layouts}) => {
          //   return {
          //     cardStyle: {
          //       transform: [
          //         {
          //           translateY: current.progress.interpolate({
          //             inputRange: [0, 1],
          //             outputRange: [layouts.screen.height, 0],
          //           }),
          //         },
          //       ],
          //     },
          //   };
          // },
        }}
      />
      <Stack.Screen
        name="PurchaseReview"
        component={PurchaseReview}
        options={{
          headerShown: false,
          transitionSpec: {
            open: config,
            close: closeConfig,
          },
          // gestureEnabled: true,
          // gestureDirection: 'vertical',
          // cardStyleInterpolator: ({current, layouts}) => {
          //   return {
          //     cardStyle: {
          //       transform: [
          //         {
          //           translateY: current.progress.interpolate({
          //             inputRange: [0, 1],
          //             outputRange: [layouts.screen.height, 0],
          //           }),
          //         },
          //       ],
          //     },
          //   };
          // },
        }}
      />
      <Stack.Screen
        name="BookDetails"
        component={BookDetails}
        options={{
          headerShown: false,
          transitionSpec: {
            open: config,
            close: closeConfig,
          },
          // gestureEnabled: true,
          // gestureDirection: 'vertical',
          // cardStyleInterpolator: ({current, layouts}) => {
          //   return {
          //     cardStyle: {
          //       transform: [
          //         {
          //           translateY: current.progress.interpolate({
          //             inputRange: [0, 1],
          //             outputRange: [layouts.screen.height, 0],
          //           }),
          //         },
          //       ],
          //     },
          //   };
          // },
        }}
      />
      <Stack.Screen
        name="RequestAFreeCallback"
        component={RequestAFreeCallback}
        options={{
          headerShown: false,
          transitionSpec: {
            open: config,
            close: closeConfig,
          },
          // gestureEnabled: true,
          // gestureDirection: 'vertical',
          // cardStyleInterpolator: ({current, layouts}) => {
          //   return {
          //     cardStyle: {
          //       transform: [
          //         {
          //           translateY: current.progress.interpolate({
          //             inputRange: [0, 1],
          //             outputRange: [layouts.screen.height, 0],
          //           }),
          //         },
          //       ],
          //     },
          //   };
          // },
        }}
      />
      <Stack.Screen
        name="BookAnTour"
        component={BookAnTour}
        options={{
          headerShown: false,
          transitionSpec: {
            open: config,
            close: closeConfig,
          },
          // gestureEnabled: true,
          // gestureDirection: 'vertical',
          // cardStyleInterpolator: ({current, layouts}) => {
          //   return {
          //     cardStyle: {
          //       transform: [
          //         {
          //           translateY: current.progress.interpolate({
          //             inputRange: [0, 1],
          //             outputRange: [layouts.screen.height, 0],
          //           }),
          //         },
          //       ],
          //     },
          //   };
          // },
        }}
      />
      <Stack.Screen
        name="PaymentWebView"
        component={PaymentWebView}
        options={{
          headerShown: false,
          transitionSpec: {
            open: config,
            close: closeConfig,
          },
          // gestureEnabled: true,
          // gestureDirection: 'vertical',
          // cardStyleInterpolator: ({current, layouts}) => {
          //   return {
          //     cardStyle: {
          //       transform: [
          //         {
          //           translateY: current.progress.interpolate({
          //             inputRange: [0, 1],
          //             outputRange: [layouts.screen.height, 0],
          //           }),
          //         },
          //       ],
          //     },
          //   };
          // },
        }}
      />
      <Stack.Screen
        name="ReviewBooking"
        component={ReviewBooking}
        options={{
          headerShown: false,
          transitionSpec: {
            open: config,
            close: closeConfig,
          },
          // gestureEnabled: true,
          // gestureDirection: 'vertical',
          // cardStyleInterpolator: ({current, layouts}) => {
          //   return {
          //     cardStyle: {
          //       transform: [
          //         {
          //           translateY: current.progress.interpolate({
          //             inputRange: [0, 1],
          //             outputRange: [layouts.screen.height, 0],
          //           }),
          //         },
          //       ],
          //     },
          //   };
          // },
        }}
      />
      <Stack.Screen
        name="ContactUs"
        component={ContactUs}
        options={{
          headerShown: false,
          transitionSpec: {
            open: config,
            close: closeConfig,
          },
          // gestureEnabled: true,
          // gestureDirection: 'vertical',
          // cardStyleInterpolator: ({current, layouts}) => {
          //   return {
          //     cardStyle: {
          //       transform: [
          //         {
          //           translateY: current.progress.interpolate({
          //             inputRange: [0, 1],
          //             outputRange: [layouts.screen.height, 0],
          //           }),
          //         },
          //       ],
          //     },
          //   };
          // },
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
          // gestureEnabled: true,
          // gestureDirection: 'vertical',
          // cardStyleInterpolator: ({current, layouts}) => {
          //   return {
          //     cardStyle: {
          //       transform: [
          //         {
          //           translateY: current.progress.interpolate({
          //             inputRange: [0, 1],
          //             outputRange: [layouts.screen.height, 0],
          //           }),
          //         },
          //       ],
          //     },
          //   };
          // },
        }}
      />
      {/* <Stack.Screen name={ScreenNames.NO_CONNECTION} component={NoConnection} /> */}
      <Stack.Screen name="MyTour" component={MyTour} />
      <Stack.Screen name="MyVirtualTour" component={MyVirtualTour} />
      <Stack.Screen
        name={ScreenNames.PAYMENT_PROCESSING}
        component={PaymentProcessing}
        options={{
          headerShown: false,
          transitionSpec: {
            open: config,
            close: closeConfig,
          },
          // gestureEnabled: true,
          // gestureDirection: 'vertical',
          // cardStyleInterpolator: ({current, layouts}) => {
          //   return {
          //     cardStyle: {
          //       transform: [
          //         {
          //           translateY: current.progress.interpolate({
          //             inputRange: [0, 1],
          //             outputRange: [layouts.screen.height, 0],
          //           }),
          //         },
          //       ],
          //     },
          //   };
          // },
        }}
      />
    </Stack.Navigator>
  );
}

export default BookTourStack;
