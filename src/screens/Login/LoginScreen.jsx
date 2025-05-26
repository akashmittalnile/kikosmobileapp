//import : react components
import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
//import : custom components
import CustomTextInput from '../../components/CustomTextinput/CustomTextInput';
import CustomFastImage from '../../components/FastImage/CustomFastImage';
import CustomButton from '../../components/CustomButton/CustomButton';
import Loader from '../../WebApi/Loader';
import MyAlert from '../../components/MyAlert';
import MyHeader from '../../components/MyHeader';
//import : third parties
import messaging from '@react-native-firebase/messaging';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import : utils
import images from '../../global/images';
import styles from './LoginScreenStyle';
import COLORS from '../../global/Colors';
import {login, requestPostApi} from '../../WebApi/Service';
import {Constant} from '../../global';
//import : redux
import {useDispatch} from 'react-redux';
import {saveUserResult} from '../../redux/actions/user_action';

const LoginScreen = props => {
  //variables
  const dispatch = useDispatch();
  //hook : states
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [My_Alert, setMy_Alert] = useState(false);
  const [alert_sms, setalert_sms] = useState('');
  const [loading, setLoading] = useState(false);
  const [myeye, setmyeye] = useState(true);
  //function : nav func
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
  //function : serv func
  const LoginPressed = async () => {
    var EmailReg =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (String(email).trim().length == 0) {
      setalert_sms('Please Enter Email');
      setMy_Alert(true);
    } else if (!EmailReg.test(email)) {
      setalert_sms('Enter valid email');
      setMy_Alert(true);
    } else if (String(pass).trim().length == 0) {
      setalert_sms('Please Enter Password');
      setMy_Alert(true);
    } else {
      setLoading(true);
      let formdata = new FormData();
      const token = await messaging().getToken();
      formdata.append('email', email); //code+
      // formdata.append("device_id", mapdata.devicetoken);
      formdata.append('device_token', token);
      formdata.append('password', pass);

      const {responseJson, err} = await requestPostApi(
        login,
        formdata,
        'POST',
        '',
      );
      setLoading(false);
      if (err == null) {
        if (responseJson.status == true) {
          loginPress(responseJson.data);
        } else if (responseJson.status == false) {
          setalert_sms(responseJson.message);
          setMy_Alert(true);
        } else {
          setalert_sms('Your email or password is incorrect');
          setMy_Alert(true);
        }
      } else if (err == null) {
        setalert_sms(responseJson.message);
        setMy_Alert(true);
      } else {
        setalert_sms('Your email or password is incorrect');
        setMy_Alert(true);
      }
    }
  };
  //UI
  return (
    <View style={{flex: 1}}>
      <MyHeader
        onPress={() => {
          props.navigation.goBack();
        }}
      />
      <KeyboardAwareScrollView extraHeight={100}>
        <CustomFastImage
          imageStyle={styles.logo}
          img={images.loginlogo}
          resizeMode={'contain'}
        />
        <Text
          style={{
            color: COLORS.Primary_Blue,
            marginVertical: 10,
            fontSize: Constant.textFontSize(20),
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
          Sign In
        </Text>
        <Text
          style={{
            color: '#000',
            textAlign: 'center',
            fontSize: Constant.textFontSize(18),
            fontWeight: '600',
            width: '80%',
            alignSelf: 'center',
          }}>
          Please enter your email and password
        </Text>
        <View
          style={{
            marginTop: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <CustomTextInput
            onChangeText={txt => {
              setEmail(txt);
            }}
            placeholder={'Enter Your Email ID*'}
          />
        </View>

        <View
          style={{
            marginTop: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <CustomTextInput
            onChangeText={txt => {
              setPass(txt);
            }}
            placeholder={'Password*'}
            secureTextEntry={myeye}
            rightView={
              <TouchableOpacity
                onPress={() => {
                  setmyeye(!myeye);
                }}>
                <Image
                  source={myeye ? images.ceye : images.eye}
                  style={{
                    height: 25,
                    width: 25,
                    tintColor: COLORS.dark_grey,
                  }}
                />
              </TouchableOpacity>
            }
          />
        </View>
        <TouchableOpacity
          style={styles.forgotContainer}
          onPress={() => {
            props.navigation.navigate('ForgotPass');
          }}>
          <Text style={styles.forgotTxt}>Forgot your password?</Text>
        </TouchableOpacity>
        <CustomButton
          title={'Login'}
          borderColor={'#83CDFD'}
          onPress={() => {
            LoginPressed();
          }}
          backgroundColor={COLORS.Primary_Blue}
        />
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            marginTop: 10,
          }}>
          <Text style={[styles.txtStyle, {color: '#000', fontWeight: '400'}]}>
            Don’t have an account?
          </Text>
          <TouchableOpacity onPress={() => props.navigation.navigate('SignUp')}>
            <Text style={[styles.signup, {color: '#3DA1E3'}]}> Signup</Text>
          </TouchableOpacity>
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

export default LoginScreen;
