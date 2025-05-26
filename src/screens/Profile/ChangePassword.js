import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';

import images from '../../global/images';

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
import {baseUrl, change_password, requestPostApi} from '../../WebApi/Service';
import MyHeader from '../../components/MyHeader';
import {dimensions} from '../../utility/Mycolors';
import CustomHeader from '../../components/CustomeHeader';
import {
  FONTS,
  FONTS_SIZE,
  checkPlatForm,
  heightScale,
  widthScale,
} from '../../global/Utils';
import {Constant} from '../../global';
import MyText from '../../MyText/MyText';

const ChangePassword = props => {
  const [email, setEmail] = useState('');
  const [oldPass, setOldPass] = useState('');
  const [pass, setPass] = useState('');
  const [myeye, setmyeye] = useState(true);
  const [myeye1, setmyeye1] = useState(true);
  const [myeye2, setmyeye2] = useState(true);
  const [cpass, setcPass] = useState('');
  const dispatch = useDispatch();
  const [My_Alert, setMy_Alert] = useState(false);
  const [alert_sms, setalert_sms] = useState('');
  const [loading, setLoading] = useState(false);
  const [popup, setpopup] = useState(false);

  useEffect(() => {
    setEmail(props?.route?.params?.Emailid?.email);
  }, []);
  //function : imp func
  const validation = () => {
    if (email == '' || email.trim().length == 0) {
      setalert_sms('Please Enter Email');
      setMy_Alert(true);
    } else if (oldPass == '' || oldPass.trim().length == 0) {
      setalert_sms('Please Enter Old Password');
      setMy_Alert(true);
    } else if (pass == '' || pass.trim().length == 0) {
      setalert_sms('Please Enter New Password');
      setMy_Alert(true);
    } else if (pass.trim().length < 8) {
      setalert_sms('The password must be at least 8 characters.');
      setMy_Alert(true);
    } else if (!Constant.passwordRegex.test(pass)) {
      setalert_sms(
        'Password must has at least eight characters that include 1 lowercase character, 1 uppercase character, 1 number, and at least one special character in this set.',
      );
      setMy_Alert(true);
    } else if (cpass == '' || cpass.trim().length == 0) {
      setalert_sms('Please Enter New Confirm Password');
      setMy_Alert(true);
    } else if (cpass.trim().length < 8) {
      setalert_sms('The confirm password must be at least 8 characters.');
      setMy_Alert(true);
    } else if (!Constant.passwordRegex.test(pass)) {
      setalert_sms(
        'Confirm Password must has at least eight characters that include 1 lowercase character, 1 uppercase character, 1 number, and at least one special character in this set.',
      );
      setMy_Alert(true);
    } else if (pass != cpass) {
      setalert_sms('Password And Confirm Password should be same');
      setMy_Alert(true);
    } else return true;
  };
  const LoginPressed = async () => {
    if (validation()) {
      setLoading(true);
      let formdata = new FormData();
      formdata.append('email', email);
      formdata.append('old_password', oldPass);
      formdata.append('new_password', pass);
      formdata.append('confirm_new_password', cpass);

      const {responseJson, err} = await requestPostApi(
        change_password,
        formdata,
        'POST',
        '',
      );
      setLoading(false);
      if (err == null) {
        if (responseJson.status) {
          setpopup(true);
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

  // const loginPress=(data)=>{

  //   var dddd= {"about": "", "address": "", "cert_no": "", "city": "", "country": "0", "created_at": "", "current_salon": "", "dob": "", "email": "", "experience": "", "expiry_date": "", "expiry_date1": "", "facilities": "", "featured": "0", "gender": "", "hobbies": "", "id": null, "id_proof": "", "language": "", "license": "", "license_num": "", "license_num1": "", "location": "", "name": "", "nationality": "", "otp": "", "owner_image": "", "owner_name": "", "password": "4e652ad08eba102e0658176641dc6da6", "phone": "", "phone1": "", "previous_location": "", "previous_salon": "", "profile": "1", "qualification": "", "salon_image": "", "salon_type": "", "service": "", "slogan": "", "state": "", "status": "1", "type": "customer", "unique_id": "", "vat": "", "video": ""}

  //   AsyncStorage.setItem("kikos", JSON.stringify(data));
  //   dispatch(saveUserResult(data))
  // }

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <CustomHeader
        backarrow={true}
        title={'Change Password'}
        onBackPress={() => {
          props.navigation.goBack();
        }}
        onNotificationPress={() => {
          props.navigation.navigate('Notification');
        }}
      />

      <KeyboardAwareScrollView>
        <View
          style={{
            marginTop: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <CustomTextInput
            onChangeText={txt => {
              setOldPass(txt);
            }}
            placeholder={'Old Password'}
            secureTextEntry={myeye}
            rightView={
              <TouchableOpacity
                onPress={() => {
                  setmyeye(!myeye);
                }}>
                <Image
                  source={myeye ? images.ceye : images.eye}
                  style={{height: 25, width: 25}}
                />
              </TouchableOpacity>
            }
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
            placeholder={'New Password'}
            secureTextEntry={myeye1}
            rightView={
              <TouchableOpacity
                onPress={() => {
                  setmyeye1(!myeye1);
                }}>
                <Image
                  source={myeye1 ? images.ceye : images.eye}
                  style={{height: 25, width: 25}}
                />
              </TouchableOpacity>
            }
          />
        </View>
        <View
          style={{
            marginVertical: 10,
            justifyContent: 'center',
            alignItems: 'center',
            // marginBottom: 100,
          }}>
          <CustomTextInput
            onChangeText={txt => {
              setcPass(txt);
            }}
            placeholder={'Confirm New Password'}
            secureTextEntry={myeye2}
            rightView={
              <TouchableOpacity
                onPress={() => {
                  setmyeye2(!myeye2);
                }}>
                <Image
                  source={myeye2 ? images.ceye : images.eye}
                  style={{height: 25, width: 25}}
                />
              </TouchableOpacity>
            }
          />
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: COLORS.Primary_Blue,
            height: 118,
            width: 118,
            alignSelf: 'center',
            borderRadius: 100,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 6,
            borderColor: '#83CDFD',
          }}
          onPress={() => {
            LoginPressed();
          }}>
          <View
            style={{
              borderWidth: 1,
              borderColor: 'rgba(228, 228, 228, 1)',
              borderRadius: 100,
              height: '99%',
              width: '99%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 18,
                color: COLORS.light_white,
                fontWeight: '400',
                fontFamily: FONTS.alloyInk,
                textAlign: 'center',
              }}>
              Update
            </Text>
          </View>
        </TouchableOpacity>
      </KeyboardAwareScrollView>

      <View
        style={{
          position: 'absolute',
          bottom: 0,
          width: '140%',
          height: (dimensions.SCREEN_HEIGHT * 50) / 100,
          alignSelf: 'center',
        }}></View>

      {popup ? (
        <View
          style={{
            position: 'absolute',
            width: '100%',
            height: dimensions.SCREEN_HEIGHT,
            backgroundColor: 'rgba(0,0,0,0.4)',
            justifyContent: 'center',
            padding: 20,
          }}>
          <View
            style={{
              width: '100%',
              alignSelf: 'center',
              backgroundColor: '#fff',
              padding: 15,
              borderRadius: 15,
            }}>
            <TouchableOpacity>
              <Image
                source={images.successimg}
                style={{
                  alignSelf: 'center',
                  width: 120,
                  height: 120,
                  resizeMode: 'stretch',
                  marginTop: 20,
                }}
              />
            </TouchableOpacity>

            <Text
              style={{
                color: '#000',
                alignSelf: 'center',
                marginTop: 45,
                fontSize: Constant.textFontSize(20),
                fontWeight: '600',
              }}>
              Password Changed!
            </Text>
            <Text
              style={{
                color: '#000',
                alignSelf: 'center',
                marginTop: 10,
                fontSize: Constant.textFontSize(13),
                fontWeight: '400',
              }}>
              Your Password has been changed successfully
            </Text>

            <CustomButton
              borderColor={'#83CDFD'}
              title={'Save'}
              onPress={() => {
                setpopup(false);
                props.navigation.goBack();
              }}
              backgroundColor={COLORS.Primary_Blue}
            />
          </View>
        </View>
      ) : null}

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

export default ChangePassword;
