import React, {Component, useState, useEffect} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
  Modal,
} from 'react-native';
import DrawerHeader from '../../components/DrawerHeader';
import CustomScreen from '../../components/CustomScreen';
import images from '../../global/images';
import {FONTS, heightScale, widthScale} from '../../global/Utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector, useDispatch} from 'react-redux';
import {onLogoutUser, saveUserProfile} from '../../redux/actions/user_action';
import {WebView} from 'react-native-webview';
import {Constant} from '../../global';
import {requestGetApi, user_status} from '../../WebApi/Service';
import {useDrawerStatus} from '@react-navigation/drawer';
import Toast from 'react-native-toast-message';
import MyAlert from '../../components/MyAlert';

const CustomDrawer = props => {
  const isDrawerOpen = useDrawerStatus();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user_details);
  const [My_Alert, setMy_Alert] = useState(false);
  const [alert_sms, setalert_sms] = useState('');
  const [name, setname] = useState('John Dev.');
  const [loder, setLoder] = useState(false);
  const [webViewVisible, setWebViewVisible] = useState(false);
  const [getWebViewUrlBasedOnTitle, setGetWebViewUrlBasedOnTitle] =
    useState('');

  useEffect(() => {
    isDrawerOpen === 'open' && checkTokenExpired();
  }, [isDrawerOpen]);
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

  const gotoWebViewPage = data =>
    props.navigation.navigate('WebViewPage', {data});

  const closeDrawer = async () => {
    props.navigation.closeDrawer();
    await AsyncStorage.clear();
    dispatch(onLogoutUser());
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={styles.imgContainer}>
          <Image style={styles.imageStyle} source={images.drawerlogo}></Image>
        </View>
        <View
          style={{width: '100%', height: 0.5, backgroundColor: '#CECECE'}}
        />
        <DrawerHeader
          onPressprofile={() => {
            if (user.userid != undefined) {
              props.navigation.navigate('Profile');
            } else {
              closeDrawer();
            }
          }}
        />
        {/* <View style={styles.drowerComponentStyle}>
          <CustomScreen
            image={images.home}
            title={'Home'}
            onPress={() => {
              props.navigation.navigate('ConfirmedTour');
            }}
          />
        </View> */}
        <View style={styles.mainView}>
          <CustomScreen
            image={images.aboutuskikos}
            title={'About Us'}
            onPress={() => {
              props.navigation.closeDrawer();
              gotoWebViewPage({
                url: `http://100.21.178.252/about-us`,
                title: 'About Us',
              });
            }}
          />
          <CustomScreen
            image={images.mytourbooking}
            title={'My Tour Bookings'}
            onPress={() => {
              props.navigation.navigate('ConfirmedTour');
            }}
          />
          <CustomScreen
            image={images.mytourbooking}
            title={'My Virtual Tours'}
            onPress={() => {
              props.navigation.navigate('MyVirtualTour');
            }}
          />
          <CustomScreen
            image={images.contactus}
            title={'Contact Us'}
            onPress={() => {
              props.navigation.navigate('ContactUs');
            }}
          />
          {/* <CustomScreen image={images.ratingicon} title={'Rating & Reviews'} /> */}
          <CustomScreen
            image={images.termsandcond}
            title={'Terms & Conditions'}
            onPress={() => {
              props.navigation.closeDrawer();
              gotoWebViewPage({
                url: `http://100.21.178.252/term-condition`,
                title: 'Terms & Conditions',
              });
            }}
          />
          <CustomScreen
            image={images.privacypolicy}
            title={'Privacy Policy'}
            onPress={() => {
              props.navigation.closeDrawer();
              gotoWebViewPage({
                url: `http://100.21.178.252/privacy-policy`,
                title: 'Privacy Policy',
              });
            }}
          />
          {user.userid != undefined ? (
            <CustomScreen
              image={images.logouticon}
              title={'Log Out'}
              onPress={() => {
                props.navigation.closeDrawer();
                AsyncStorage.clear();
                dispatch(onLogoutUser());
                dispatch(saveUserProfile(null));
              }}
            />
          ) : null}
        </View>
        <LinearGradient
          colors={['#FFFFFF', '#FFFFFF', '#FFFFFF', '#3DA1E3']}
          start={{x: -2, y: 1}}
          end={{x: 1, y: 1}}
          style={styles.followcontainer}>
          <Text style={styles.title}>Follow Us!</Text>
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL('https://www.facebook.com/kikostoursoahu/');
              }}>
              <Image
                resizeMode="contain"
                source={require('../../assets/images/Icons/facebook_icon.png')}
                style={styles.image}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL('https://www.instagram.com/kikostoursoahu/');
              }}>
              <Image
                resizeMode="contain"
                source={require('../../assets/images/Icons/instagram_icon.png')}
                style={styles.image}
              />
            </TouchableOpacity>
          </View>
          <View style={{marginVertical: 10}}>
            <Text style={[styles.title]}>App Version: V1.0.0.1</Text>
          </View>
        </LinearGradient>
      </View>
      <Modal visible={webViewVisible} animationType="slide" transparent={false}>
        <View style={{flex: 1}}>
          <WebView
            contentMode="mobile"
            source={{uri: getWebViewUrlBasedOnTitle}}
            // Other WebView props...
          />
          <TouchableOpacity
            onPress={() => {
              setWebViewVisible(false);
            }}
            style={{
              backgroundColor: '#2084C7',
              height: 60,
              justifyContent: 'center',
            }}>
            {/* Close button or any UI to close the WebView */}
            <Text
              style={{
                fontFamily: FONTS.alloyInk,
                fontSize: Constant.textFontSize(16),
                color: 'white',
                fontWeight: '600',
                alignSelf: 'center',
              }}>
              Close WebView
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
      {My_Alert ? (
        <MyAlert
          sms={alert_sms}
          okPress={() => {
            setMy_Alert(false);
          }}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  drowerComponentStyle: {
    marginRight: 20,
    marginLeft: 20,
    marginTop: 30,
  },
  imageStyle: {
    height: heightScale(130),
    width: widthScale(130),
    resizeMode: 'stretch',
  },
  mainView: {
    padding: 20,
  },
  followcontainer: {
    justifyContent: 'center',
    marginTop: 60,
  },
  imgContainer: {
    marginVertical: 25,
    // marginBottom:10,
    alignItems: 'center',

    alignSelf: 'center',
  },
  title: {
    fontWeight: '400',
    fontSize: Constant.textFontSize(14),
    color: '#1F191C',
    marginLeft: 15,
  },
  image: {
    height: 25,
    width: 25,
    marginLeft: 15,
  },
});
export default CustomDrawer;
