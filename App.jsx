//import : react components
import React, {useEffect} from 'react';
import {LogBox, StatusBar, Platform, Text, TextInput, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
//import : third parties
import 'react-native-gesture-handler';
import messaging from '@react-native-firebase/messaging';
import Toast from 'react-native-toast-message';
//import : notification manager
import {NotificationManagerAndroid} from './NotificationManagerAndroid';
import {NotificationManagerIOS} from './NotificationManagerIOS';
//import : stack
import MainNav from './src/navigation/MainNav';
//import : redux
import store from './src/redux/store/store';
import {Provider} from 'react-redux';
import {COLORS} from './src/global';

const App = () => {
  //function : imp func
  const getToken = async () => {
    try {
      const token = await messaging().getToken();
      console.debug('Token', token);
    } catch (error) {
      console.error('error in token', error);
    }
  };
  async function requestUserPermission() {
    const authorizationStatus = await messaging().requestPermission({
      sound: false,
      announcement: true,
    });
  }

  async function requestUserPermissionIos() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.debug('Authorization status:', authStatus);
    }
  }
  //hook : useEffect
  useEffect(() => {
    LogBox.ignoreAllLogs();
    getToken();
    if (Text.defaultProps == null) {
      Text.defaultProps = {};
      Text.defaultProps.allowFontScaling = false;
      TextInput.defaultProps = TextInput.defaultProps || {};
      TextInput.defaultProps.allowFontScaling = false;
    }
    NotificationManagerAndroid.createChannel();
    NotificationManagerAndroid.configure();
    try {
      if (Platform.OS == 'android') {
        requestUserPermission();
      } else {
        requestUserPermissionIos();
      }
      const unsubscribe = messaging().onMessage(async remoteMessage => {
        JSON.stringify(remoteMessage.data);
        const {messageId} = remoteMessage;
        const data = remoteMessage.notification;
        if (Platform.OS === 'android') {
          NotificationManagerAndroid.showNotification(
            data.title,
            data.body,
            data.subText,
            messageId,
            data,
          );
        } else {
          NotificationManagerIOS.showNotification(
            2,
            data.title,
            data.body,
            data,
            {},
          );
        }
      });
      return unsubscribe;
    } catch (error) {
      console.error('app.js', error.message);
    }

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      const {data, messageId} = remoteMessage;
      const {Title, notificationText, subText} = data;
      PlayRing(false);
      if (Platform.OS === 'android') {
        NotificationManagerAndroid.showNotification(
          Title,
          notificationText,
          subText,
          messageId,
        );
      } else {
        NotificationManagerIOS.showNotification(
          messageId,
          Title,
          notificationText,
          data,
          {},
        );
      }
    });
  }, []);

  return (
    <Provider store={store}>
      {/* <SafeAreaView style={{flex: 1, backgroundColor: '#94a5b9'}}> */}

      <View
        style={{
          flex: 1,
          paddingTop: Platform.OS == 'ios' ? 30 : 0,
          backgroundColor: COLORS.default.Primary_Blue,
        }}>
        <StatusBar barStyle={'light-content'} backgroundColor={'#94a5b9'} />
        <NavigationContainer>
          <MainNav />
        </NavigationContainer>
      </View>
      {/* </SafeAreaView> */}
      <Toast />
    </Provider>
  );
};

export default App;
