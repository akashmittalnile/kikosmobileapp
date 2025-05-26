//import : react components
import React from 'react';
import {View, Text, Image, StyleSheet, Alert} from 'react-native';
import {CommonActions} from '@react-navigation/native';

//import : third parties
import {useNetInfo} from '@react-native-community/netinfo';
//import : globals
import {COLORS, Constant} from '../../global';
//import : redux
import {useDispatch, useSelector} from 'react-redux';
// import {CustomToastAction} from '../../redux/actions/actions';
import Toast from 'react-native-toast-message';
// import MyButton from 'components/MyButton/MyButton';

import CustomButton from '../../components/CustomButton/CustomButton';
import {FONTS} from '../../global/Utils';

// Amit katewa 18 april 024, if no internet connection show this screen
const NoConnection = props => {
  //variables

  const user = useSelector(state => state.user.user_details);
  const {isConnected, isInternetReachable} = useNetInfo();
  const dispatch = useDispatch();
  const resetIndexGoBottomTab = CommonActions.reset({
    index: 1,
    routes: [{name: props.navigation.navigate('HomeStack')}],
  });
  const resetIndexGoToWelcome = CommonActions.reset({
    index: 1,
    routes: [{name: props.navigation.navigate('HomeStack')}],
  });

  //function
  const checkConnectivity = () => {
    if (isInternetReachable) {
      if (user.userid != undefined) {
        props.navigation.dispatch(ScreenNames.BOTTOM_TAB);
      } else {
        props.navigation.dispatch(ScreenNames.BOTTOM_TAB);
      }
    } else {
      Toast.show({
        text1: 'Please check your internet connection and try again!',
      });
      // Alert.alert('Please check your internet connection and try again!')
      // dispatch(
      //   CustomToastAction.showToast(
      //     'Please check your internet connection and try again!',
      //   ),
      // );
    }
  };
  const gotoWhichScreen = () => {
    return userToken === '' ? 'Go to Welcome' : 'Go to Home';
  };
  //UI
  return (
    <View
      style={{
        flex: 1,
      }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: COLORS.primary_white,
        }}>
        <Image
          resizeMode="contain"
          source={require('../../assets/images/largeimages/No_internet.png')}
          style={{
            width: 300,
            height: 300,
            alignSelf: 'center',
          }}
        />
        <Text
          style={{
            fontFamily: FONTS.regular,
            fontSize: Constant.textFontSize(20),
            marginVertical: 20,
            color: '#000',
          }}>
          No Internet Connection?
        </Text>
        {/* <MyButton
          text={gotoWhichScreen()}
          style={{
            width: width * 0.9,
            marginBottom: 10,
            backgroundColor: COLORS.WHITE,
          }}
          onPress={checkConnectivity}
        /> */}

        <CustomButton
          title={'Try Again'}
          borderColor={'#83CDFD'}
          onPress={checkConnectivity}
          backgroundColor={'#3DA1E3'}
          txtStyle={{padding: 5}}
        />
      </View>
    </View>
  );
};

export default NoConnection;
