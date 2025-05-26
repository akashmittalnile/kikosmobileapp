//import : react components
import React from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
//import : custom components
import CustomFastImage from '../../components/FastImage/CustomFastImage';
import CustomButton from '../../components/CustomButton/CustomButton';
//import : third parties
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import : utils
import {Constant} from '../../global';
import {FONTS, myHeight} from '../../global/Utils';
import images from '../../global/images';
import COLORS from '../../global/Colors';
//import : redux
import {useDispatch} from 'react-redux';
import {saveUserResult} from '../../redux/actions/user_action';

const TutorialScreen = ({navigation}) => {
  //variables
  const dispatch = useDispatch();
  const loginPress = data => {
    var dddd = {
      about: '',
      address: '',
      cert_no: '',
      city: '',
      country: '0',
      created_at: '',
      current_salon: '',
      dob: '',
      email: '',
      experience: '',
      expiry_date: '',
      expiry_date1: '',
      facilities: '',
      featured: '0',
      gender: '',
      hobbies: '',
      id: null,
      id_proof: '',
      language: '',
      license: '',
      license_num: '',
      license_num1: '',
      location: '',
      name: '',
      nationality: '',
      otp: '',
      owner_image: '',
      owner_name: '',
      password: '4e652ad08eba102e0658176641dc6da6',
      phone: '',
      phone1: '',
      previous_location: '',
      previous_salon: '',
      profile: '1',
      qualification: '',
      salon_image: '',
      salon_type: '',
      service: '',
      slogan: '',
      state: '',
      status: '1',
      type: 'customer',
      unique_id: '',
      vat: '',
      video: '',
    };
    AsyncStorage.setItem('kikos', JSON.stringify(dddd));
    dispatch(saveUserResult(data));
  };
  //UI
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ImageBackground
        source={require('../../assets/images/largeimages/loginbg.png')}
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
          resizeMode: 'stretch',
        }}
        resizeMode="stretch">
        <LinearGradient
          style={{flex: 1, alignItems: 'center'}}
          colors={['#FFFFFF', '#FFFFFF', '#23356F61', '#23356F61']}
          start={{x: 0, y: 0}}
          end={{x: 0.6, y: 1}}>
          <View style={{height: Constant.textFontSize(50)}} />
          <CustomFastImage
            imageStyle={styles.logo}
            img={images.loginlogo}
            resizeMode={'contain'}
          />

          <Text
            style={[
              styles.txtStyle,
              {
                fontSize: Constant.textFontSize(26),
                marginTop: 15,
                color: '#3DA1E3',
                opacity: 1,
              },
            ]}>
            Aloha
          </Text>
          <Text
            style={[
              styles.txtStyle,
              {
                fontSize: Constant.textFontSize(26),
                marginTop: 10,
                color: '#3DA1E3',
              },
            ]}>
            You found the spot!
          </Text>

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'flex-end',
              paddingBottom: '10%',
              width: '100%',
            }}>
            <View>
              <CustomButton
                title={'Start Here'}
                backgroundColor={COLORS.Primary_Blue}
                borderColor={'#83CDFD'}
                txtStyle={{color: '#fff', fontFamily: FONTS.alloyInk}}
                onPress={() => {
                  loginPress();
                  // navigation.navigate('SignUp')E Komo Mai
                }}
              />
            </View>

            <View style={{marginLeft: 10}}>
              <CustomButton
                title={'Sign In'}
                backgroundColor={COLORS.light_white}
                borderColor={'#F4F4F4'}
                txtStyle={{color: '#000', fontFamily: FONTS.alloyInk}}
                onPress={() => navigation.navigate('Login')}
              />
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

export default TutorialScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: Constant.textFontSize(150),
    width: Constant.myHeight - 20,
    resizeMode: 'stretch',
  },
  txt: {
    fontSize: Constant.textFontSize(32),
    fontWeight: '700',
    fontFamily: FONTS.regular,
    width: '90%',
    textAlign: 'center',
    color: COLORS.light_white,
    marginTop: 10,
    alignSelf: 'center',
  },
  txtStyle: {
    fontSize: Constant.textFontSize(14),
    width: '100%',
    color: COLORS.light_white,
    textAlign: 'center',
    marginTop: 10,
    fontWeight: '400',
    fontFamily: FONTS.alloyInk,
  },
  bottomTxt: {
    fontSize: Constant.textFontSize(14),
    fontWeight: '600',
    fontFamily: FONTS.regular,
    color: COLORS.light_white,
    opacity: 0.9,

    marginTop: 30,
    width: '90%',
    alignSelf: 'center',
    textAlign: 'center',
    bottom: 3,
  },
  backgroundVideo: {
    height: myHeight,
    position: 'absolute',
    top: 0,
    left: 0,
    alignItems: 'stretch',
    bottom: 0,
    right: 0,
  },
  termsTxt: {
    fontSize: Constant.textFontSize(14),
    color: COLORS.light_white,
  },
  conditionTxtStyle: {
    fontSize: Constant.textFontSize(14),
    color: COLORS.primary_white,

    opacity: 0.9,
    marginLeft: 4,
  },
  singUpTxt: {
    color: COLORS.Primary_Green,
  },
});
