import {View, Text, ImageBackground, StyleSheet} from 'react-native';
import React, {useState} from 'react';

import images from '../../global/images';
//   import styles from './LoginScreenStyle';

import CustomTextInput from '../../components/CustomTextinput/CustomTextInput';
import {ColorProperties} from 'react-native-reanimated/lib/typescript/reanimated2/Colors';
import COLORS from '../../global/Colors';
import CustomFastImage from '../../components/FastImage/CustomFastImage';
import CustomButton from '../../components/CustomButton/CustomButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector, useDispatch} from 'react-redux';
import {setLoading, saveUserResult} from '../../redux/actions/user_action';
import Loader from '../../WebApi/Loader';
import MyAlert from '../../components/MyAlert';
import {
  baseUrl,
  forgotPassword,
  login,
  requestPostApi,
} from '../../WebApi/Service';
import MyHeader from '../../components/MyHeader';
import {dimensions} from '../../utility/Mycolors';
import {
  FONTS,
  FONTS_SIZE,
  checkPlatForm,
  heightScale,
  widthScale,
} from '../../global/Utils';
import {Constant} from '../../global';
import {StatusBar} from 'react-native';

const ForgotPass = props => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const dispatch = useDispatch();
  const [My_Alert, setMy_Alert] = useState(false);
  const [alert_sms, setalert_sms] = useState('');
  const [loading, setLoading] = useState(false);

  // const validateEmail = () => {
  //   const regex =
  //     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //   if (!regex.test(email)) {
  //     setalert_sms('Invalid Email Address');
  //     setMy_Alert(true);
  //   } else {
  //     props.navigation.navigate('Otp', {from: 'ForgotPass', email: email});
  //   }
  // };
  const ForgotPressed = async () => {
    if (email == '' || email.trim().length == 0) {
      setalert_sms('Please Enter Email');
      setMy_Alert(true);
    } else if (!Constant.EmailReg.test(email)) {
      setalert_sms('Enter Valid Email');
      setMy_Alert(true);
    } else {
      setLoading(true);
      let formdata = new FormData();
      formdata.append('email', email);
      const {responseJson, err} = await requestPostApi(
        forgotPassword,
        formdata,
        'POST',
        '',
      );
      setLoading(false);
      if (err == null) {
        if (responseJson.status == true) {
          props.navigation.navigate('Otp', {
            from: 'ForgotPass',
            email: email,
            Otp: responseJson.code,
          });
        } else {
          setalert_sms(responseJson.message);
          setMy_Alert(true);
        }
      } else {
        setalert_sms(err);
        setMy_Alert(true);
      }
    }
  };

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

    AsyncStorage.setItem('kikos', JSON.stringify(data));
    dispatch(saveUserResult(data));
  };

  return (
    <View style={{flex: 1, backgroundColor: '#ffffff'}}>
      <MyHeader
        title={'Forgot Password'}
        onPress={() => {
          props.navigation.goBack();
        }}
      />
      <KeyboardAwareScrollView extraHeight={100}>
        <Text
          style={{
            color: COLORS.Primary_Blue,
            marginLeft: 20,
            marginTop: 45,
            fontSize: Constant.textFontSize(20),
            fontWeight: '600',
          }}>
          Reset your password
        </Text>
        <Text
          style={{
            color: '#000',
            marginLeft: 20,
            marginTop: 10,
            fontSize: Constant.textFontSize(13),
            fontWeight: '400',
          }}>
          We Will Send An 4 Digit OTP In Your Registered Email ID
        </Text>

        <View style={{marginTop: 20}}>
          <CustomTextInput
            onChangeText={txt => {
              setEmail(txt);
            }}
            placeholder={'Enter Your Email ID*'}
          />
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            paddingBottom: '10%',
          }}>
          <CustomButton
            title={'Send'}
            borderColor={'#83CDFD'}
            onPress={() => {
              ForgotPressed();
            }}
            backgroundColor={COLORS.Primary_Blue}
          />
        </View>
      </KeyboardAwareScrollView>
      {My_Alert ? (
        <MyAlert
          sms={alert_sms}
          okPress={() => {
            setMy_Alert(false);
          }}
        />
      ) : null}
      {loading ? <Loader /> : null}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    backgroundColor: '#ffff',
    position: 'absolute',
    bottom: 0,
    height: checkPlatForm() == 'android' ? '49%' : '53%',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    width: '100%',
  },
  logo: {
    height: heightScale(170),
    width: widthScale(236),
  },
  forgotContainer: {
    alignSelf: 'flex-end',
    marginRight: 20,
    marginTop: 10,
  },
  forgotTxt: {
    fontSize: Constant.textFontSize(14),
    fontWeight: '400',
    color: COLORS.Primary_Blue,
    fontFamily: FONTS.regular,
  },
  topImgContainer: {flex: 0.55, alignItems: 'center', justifyContent: 'center'},
  loginTxt: {
    // alignSelf: 'center',
    color: COLORS.Primary_Blue,
    marginTop: 20,
    fontSize: Constant.textFontSize(14),
    fontWeight: '700',
    fontFamily: FONTS.bold,
  },
  SignupTxtContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    gap: 5,
  },
  txtStyle: {
    fontSize: Constant.textFontSize(14),
    fontFamily: FONTS.regular,
    color: COLORS.grey,
    fontWeight: '600',
  },
  signup: {
    fontSize: Constant.textFontSize(14),
    fontFamily: FONTS.regular,
    fontWeight: '600',
    color: COLORS.Primary_Green,
  },
});

export default ForgotPass;
