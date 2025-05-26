import {useNetInfo} from '@react-native-community/netinfo';
import {useNavigation, CommonActions} from '@react-navigation/core';
import {useEffect} from 'react';
import {ScreenNames} from '../global/index';
import NoConnection from '../screens/NoConnection/NoConnection';
import {Alert} from 'react-native';

// Amit katewa 18 april 24, if no connection, navigate to no connection screen
export function useNetworkError() {
  const navigation = useNavigation();
  const {isConnected, isInternetReachable} = useNetInfo();

  const resetIndexGoNoConnection = CommonActions.reset({
    index: 1,
    routes: [{name: ScreenNames.NO_CONNECTION}],
  });
  useEffect(() => {
    if (isInternetReachable === undefined || isInternetReachable === null)
      return;
    if (!isInternetReachable) {
      navigation.navigate(ScreenNames.NO_CONNECTION);
      // navigation.dispatch(resetIndexGoNoConnection);
      // Alert.alert("",'Please check your internet connection and try again!')
    } else {
      if (navigation?.canGoBack()) {
        navigation?.goBack();
      }
    }
  }, [isInternetReachable]);
}
