import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {Mycolors, dimensions} from '../utility/Mycolors';
import COLORS from '../global/Colors';
import DrawerPic from '../navigation/Drawer/DrawerPic';
import {FONTS, FONTS_SIZE, heightScale, widthScale} from '../global/Utils';
import {useSelector, useDispatch} from 'react-redux';
import moment from 'moment';
import {Constant} from '../global';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import {
  count_notifications,
  get_notifications,
  requestGetApi,
  requestPostApi,
  user_status,
} from '../WebApi/Service';
import {onLogoutUser} from '../redux/actions/user_action';
import MyText from '../MyText/MyText';

const HomeHeaderComponent = props => {
  const focused = useIsFocused();
  const dispatch = useDispatch();
  const [lat, setlat] = useState('28.6176');
  const [lan, setlan] = useState('77.422');
  const user = useSelector(state => state.user.user_details);
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    checkTokenExpired();
    getNotificationCount();
  }, [focused == true]);
  const checkTokenExpired = async () => {
    try {
      const {responseJson, err} = await requestGetApi(
        user_status,
        '',
        'GET',
        user.token,
      );
      if (err == null) {
        if (responseJson?.data[0].status == '0') {
          Toast.show({
            type: 'info',
            text1: 'Please login again',
          });
          closeDrawer();
        }
      } else {
        // setalert_sms(err);
        // setMy_Alert(true);
      }
    } catch (error) {
      console.error('error in checkTokenExpired', error);
    }
  };
  const closeDrawer = async () => {
    await AsyncStorage.clear();
    dispatch(onLogoutUser());
  };
  const getNotificationCount = async () => {
    let formdata = new FormData();
    formdata.append('user_id', user?.userid != undefined ? user?.userid : '');
    const {responseJson, err} = await requestPostApi(
      count_notifications,
      formdata,
      'POST',
      '',
    );
    if (err == null) {
      if (responseJson.status == true) {
        setNotificationCount(responseJson?.count);
      }
    } else if (err == null) {
    }
  };

  const Languagefun = () => {
    const now = new Date();
    const hour = now.getHours();
    if (hour >= 6 && hour < 10) {
      return 'ALOHA KAKAHIAKA';
    } else if (hour >= 10 && hour < 14) {
      return 'ALOHA AWAKEA';
    } else if (hour >= 14 && hour < 18) {
      return 'ALOHA `AHIAHI';
    } else if (hour >= 18 && hour < 22) {
      return 'ALOHA AHIAHI';
    } else {
      return 'ALOHA AHIAHI';
    }
  };

  return (
    <View style={[styles.container, {...props.stylecontainer}]}>
      <View
        style={[
          styles.subContainer,
          {justifyContent: 'space-evenly', alignSelf: 'center', width: '97%'},
        ]}>
        <View style={styles.subContainer}>
          <TouchableOpacity
            style={styles.Btn}
            onPress={props.press1 ? props.press1 : () => {}}>
            <Image
              source={
                props.icon1
                  ? props.icon1
                  : require('../assets/images/Icons/hback.png')
              }
              style={{
                height: 30,
                width: 30,
                resizeMode: 'stretch',
                tintColor: 'white',
              }}
            />
          </TouchableOpacity>

          <DrawerPic />
          <View style={{marginLeft: 10, width: '72%'}}>
            <View style={{flexDirection: 'row', width: '100%'}}>
              <Text
                numberOfLines={1}
                style={[
                  styles.headerText,
                  {
                    fontSize: Constant.textFontSize(18),
                    fontWeight: '400',
                    marginTop: 0,
                  },
                ]}>
                {Languagefun()}
              </Text>
            </View>
            <Text
              style={{
                ...styles.headerText,
                fontSize: Constant.textFontSize(14),
              }}>
              {moment().format('hh:mm a')},{moment().format('dddd')}
            </Text>
            <Text
              style={{
                ...styles.headerText,
                fontSize: Constant.textFontSize(14),
              }}>
              {moment().format('ll')}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.Btn}
          onPress={props.press2 ? props.press2 : () => {}}>
          <Image
            source={require('../assets/images/Icons/notification_white.png')}
            style={{height: 30, width: 30, resizeMode: 'stretch'}}></Image>
          {notificationCount ? (
            <View
              style={{
                position: 'absolute',
                borderColor: COLORS.White,
                borderWidth: 1,
                height: 10,
                width: 10,
                backgroundColor: COLORS.red,
                borderRadius: 100,
                justifyContent: 'center',
                alignItems: 'center',
                top: 0,
                right: 10,
              }}>
              {/* <MyText fontSize={8} text={notificationCount} /> */}
              {/* <MyText
                  fontSize={12}
                  text={'\u2B24'}
                  textColor={Colors.THEME_BLACK}
                /> */}
            </View>
          ) : null}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.Primary_Blue,
    height: heightScale(140),
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingHorizontal: 10,
    paddingTop: 20,
    zIndex: -100,
    // flexDirection: 'row',
    // justifyContent: 'space-between',
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontSize: Constant.textFontSize(14),
    fontWeight: '400',
    color: COLORS.light_white,
    fontFamily: FONTS.alloyInk,
  },
  Btn: {
    // backgroundColor: COLORS.Primary_Green,
    width: widthScale(40),
    height: heightScale(25),
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,

    // marginRight: 10,
  },
  BtnTxt: {
    color: COLORS.light_white,
    fontSize: Constant.textFontSize(14),
    fontWeight: '600',
    fontFamily: FONTS.regular,
  },
});

export default HomeHeaderComponent;
