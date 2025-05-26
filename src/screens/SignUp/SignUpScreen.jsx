//import : react components
import React, {useEffect, useRef, useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
//import : custom components
import CustomTextInput from '../../components/CustomTextinput/CustomTextInput';
import Loader from '../../WebApi/Loader';
import MyAlert from '../../components/MyAlert';
import CustomButton from '../../components/CustomButton/CustomButton';
import MyHeader from '../../components/MyHeader';
//import : third parties
import Toast from 'react-native-toast-message';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import MaskInput from 'react-native-mask-input';
//import : utils
import images from '../../global/images';
import COLORS from '../../global/Colors';
import {heightScale} from '../../global/Utils';
import {
  country,
  city,
  register,
  requestGetApi,
  requestPostApi,
  Signup_mail_otp,
} from '../../WebApi/Service';
import {dimensions} from '../../utility/Mycolors';
import {Constant} from '../../global';
//import : styles
import styles from './SignUpScreenStyle';
//import : modal
import OtpVerification from '../../modals/OtpVerification/OtpVerification';
import PhoneTextInput from '../../components/PhoneTextInput/PhoneTextInput';

const SignUpScreen = props => {
  //variables : ref
  const otpInfo = useRef({});
  //hook : states
  const [showCodeVerification, setShowCodeVerification] = useState(false);
  const [My_Alert, setMy_Alert] = useState(false);
  const [alert_sms, setalert_sms] = useState('');
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [lode, setlode] = useState(true);
  const [popup, setpopup] = useState(false);
  const [modalVisibleSendOtp, setModalVisibleSendOtp] = useState(false);
  const [checkvalid, setCheckvalid] = useState(false);
  const [state, setState] = useState('');
  const [codeData, setCodeData] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const [countrySymbol, setCountrySymbol] = useState('US');
  const [dob, setdob] = useState('');
  const [dobplace, setdobplace] = useState('Birth Date (mm/dd/yyyy)');
  const [maritalopen, setmaritalOpen] = useState(false);
  const [maritalvalue, setmaritalValue] = useState(null);
  const [maritalitems, setmaritalItems] = useState([
    {label: 'Single', value: 'Single'},
    {label: 'Married', value: 'Married'},
  ]);
  const [dependant, setdependant] = useState('');
  const [address, setaddress] = useState('');
  const [contry, setcontry] = useState('');
  const [contryopen, setcontryOpen] = useState(false);
  const [contryvalue, setcontryValue] = useState(null);
  const [contryitems, setcontryItems] = useState([{label: ' ', value: ' '}]);
  const [stateopen, setstateOpen] = useState(false);
  const [statevalue, setstateValue] = useState(null);
  const [stateitems, setstateItems] = useState([{label: ' ', value: ' '}]);
  const [cityopen, setcityOpen] = useState(false);
  const [cityvalue, setcityValue] = useState(null);
  const [cityitems, setcityItems] = useState([{label: ' ', value: ' '}]);
  const [zip, setzip] = useState('');
  const [resum, setresum] = useState('');
  const [latter, setlatter] = useState('');
  const [pass, setpass] = useState('');
  const [myeye, setmyeye] = useState(true);
  const [myeye1, setmyeye1] = useState(true);
  const [cpass, setcpass] = useState('');
  const [checkOtpValid, setCheckOtpValid] = useState(false);

  const [value, setValue] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const [valid, setValid] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  // const phoneInput = useRef<PhoneInput>(null);

  useEffect(() => {
    // getCountry()
  }, []);

  // const validateEmail = () => {
  //   const regex =
  //     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //   if (!regex.test(email)) {
  //     setalert_sms('Invalid Email Address');
  //     setMy_Alert(true);
  //   } else {
  //     SendotpApi();
  //   }
  // };

  const dateformates = (month, day, year) => {
    if (month == 'Jan') {
      return year + '-01-' + day;
    } else if (month == 'Feb') {
      return year + '-02-' + day;
    } else if (month == 'Mar') {
      return year + '-03-' + day;
    } else if (month == 'Apr') {
      return year + '-04-' + day;
    } else if (month == 'May') {
      return year + '-05-' + day;
    } else if (month == 'Jun') {
      return year + '-06-' + day;
    } else if (month == 'Jul') {
      return year + '-07-' + day;
    } else if (month == 'Aug') {
      return year + '-08-' + day;
    } else if (month == 'Sep') {
      return year + '-09-' + day;
    } else if (month == 'Oct') {
      return year + '-10-' + day;
    } else if (month == 'Nov') {
      return year + '-11-' + day;
    } else if (month == 'Dec') {
      return year + '-12-' + day;
    }
  };

  //function : imp func
  const validation = () => {
    var EmailReg =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (String(name).trim().length == 0) {
      setalert_sms('Please Enter Full Name');
      setMy_Alert(true);
    } else if (email.trim().length == 0) {
      setalert_sms('Please Enter Email');
      setMy_Alert(true);
    } else if (!EmailReg.test(email)) {
      setalert_sms('Enter Valid Email');
      setMy_Alert(true);
    } else if (String(mobile).trim().length == 0) {
      setalert_sms('Please Enter Phone Number');
      setMy_Alert(true);
    } else if (mobile.trim().length !== 10) {
      setalert_sms('Please Enter Valid Phone Number');
      setMy_Alert(true);
    } else if (String(pass).trim().length == 0) {
      setalert_sms('Please Enter Password');
      setMy_Alert(true);
    } else if (pass.trim().length < 8) {
      setalert_sms('The password must be at least 8 characters.');
      setMy_Alert(true);
    } else if (!Constant.passwordRegex.test(pass)) {
      setalert_sms(
        'Password must has at least eight characters that include 1 lowercase character, 1 uppercase character, 1 number, and at least one special character in this set.',
      );
      setMy_Alert(true);
    } else if (String(cpass).trim().length == 0) {
      setalert_sms('Please Enter Confirm Password');
      setMy_Alert(true);
    } else if (cpass.trim().length < 8) {
      setalert_sms('The confirm password must be at least 8 characters.');
      setMy_Alert(true);
    } else if (!Constant.passwordRegex.test(cpass)) {
      setalert_sms(
        'Confirm Password must has at least eight characters that include 1 lowercase character, 1 uppercase character, 1 number, and at least one special character in this set.',
      );
      setMy_Alert(true);
    } else if (pass != cpass) {
      setalert_sms('Password And Confirm Password should be same');
      setMy_Alert(true);
    }
    // else if (!checkvalid) {
    //   setalert_sms('Please verify your email first');
    //   setMy_Alert(true);
    // }
    else return true;
  };
  //function : serv func
  const SignupPressed = async () => {
    if (validation()) {
      setLoading(true);
      let formdata = new FormData();
      formdata.append('fullname', name);
      formdata.append('email', email);
      formdata.append('mobile', mobile);
      formdata.append('country_code', countryCode);
      formdata.append('country_symbol', countrySymbol);
      formdata.append('password', pass);
      formdata.append('c_password', cpass);

      console.log('formdata----', formdata);
      
      const {responseJson, err} = await requestPostApi(
        register,
        formdata,
        'POST',
        '',
      );

      console.log('SignUp resp----', responseJson);

      setLoading(false);
      if (err == null) {
        if (responseJson?.status == true) {
          setpopup(true);
          // dataStore(responseJson.data);
        } else {
          setalert_sms(responseJson.message);
          setMy_Alert(true);
        }
      } else if (err == null) {
        setalert_sms(err);
        setMy_Alert(true);
      }
    }
  };
  const checkSignupSubmit = () => {
    if (validation()) {
      SendotpApi();
    }
  };

  const SendotpApi = async () => {
    var EmailReg =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (email == '' || email.trim().length == 0) {
      setalert_sms('Please Enter Email');
      setMy_Alert(true);
    } else if (!EmailReg.test(email)) {
      setalert_sms('Enter Valid Email');
      setMy_Alert(true);
    } else {
      setLoading(true);
      let formdata = new FormData();
      formdata.append('fullname', name);
      formdata.append('email', email);

      const {responseJson, err} = await requestPostApi(
        Signup_mail_otp,
        formdata,
        'POST',
        '',
      );
      console.debug('Mail OTP resp----', responseJson);
      setLoading(false);
      if (err == null) {
        if (responseJson.status == true) {
          otpInfo.current = responseJson;
          setCodeData(responseJson.code);
          setShowCodeVerification(true);
        } else {
          setalert_sms(responseJson.message);
          setMy_Alert(true);
        }
      } else if (err == null) {
        setalert_sms(err);
        setMy_Alert(true);
      } else {
        setalert_sms(err);
        setMy_Alert(true);
      }
    }
  };
  const getCountry = async () => {
    setLoading(true);
    // let formdata = new FormData();
    // formdata.append("fullname", name);
    const {responseJson, err} = await requestGetApi(country, '', 'GET', '');
    setLoading(false);
    if (err == null) {
      if (responseJson.status) {
        // var dd=[]
        //  for(let i=0;i<responseJson.data.length;i++){
        //   let ab= {label:responseJson.data[i].name , value: responseJson.data[i].id}
        //   dd.push(ab)
        //  }
        setcontryItems(responseJson.data);
        setlode(!lode);
      } else {
        setalert_sms(responseJson.message);
        setMy_Alert(true);
      }
    } else {
      setalert_sms(err);
      setMy_Alert(true);
    }
  };

  const getState = async id => {
    setLoading(true);
    let formdata = new FormData();
    formdata.append('country_id', id);
    const {responseJson, err} = await requestPostApi(
      state,
      formdata,
      'POST',
      '',
    );
    setLoading(false);
    if (err == null) {
      if (responseJson.status) {
        setstateItems(responseJson.data);
        setlode(!lode);
      } else {
        setalert_sms(responseJson.message);
        setMy_Alert(true);
      }
    } else {
      setalert_sms(err);
      setMy_Alert(true);
    }
  };
  const getCity = async id => {
    setLoading(true);
    let formdata = new FormData();
    formdata.append('state_id', id);
    const {responseJson, err} = await requestPostApi(
      city,
      formdata,
      'POST',
      '',
    );
    setLoading(false);
    if (err == null) {
      if (responseJson.status) {
        setcityItems(responseJson.data);
        setlode(!lode);
      } else {
        setalert_sms(responseJson.message);
        setMy_Alert(true);
      }
    } else {
      setalert_sms(err);
      setMy_Alert(true);
    }
  };
  //UI
  return (
    <View style={{backgroundColor: '#ffffff', height: '100%', flex: 1}}>
      <MyHeader
        title={'Sign up'}
        onPress={() => {
          props.navigation.goBack();
        }}
      />
      <KeyboardAwareScrollView extraHeight={150}>
        <View style={{flex: 1}}>
          <Text
            style={{
              color: COLORS.Primary_Blue,
              marginLeft: 20,
              marginTop: 45,
              fontSize: Constant.textFontSize(20),
              fontWeight: '600',
            }}>
            Create an account
          </Text>
          <Text
            style={{
              color: '#000',
              marginLeft: 20,
              marginVertical: 10,
              fontSize: Constant.textFontSize(14),
              fontWeight: '400',
            }}>
            Please enter the basic details
          </Text>
          <View style={{marginTop: 20}}>
            <CustomTextInput
              onChangeText={txt => {
                setName(txt);
              }}
              placeholder={'Full Name*'}
            />
          </View>
          <View style={{marginTop: 20}}>
            <CustomTextInput
              onChangeText={txt => {
                setEmail(txt);
              }}
              placeholder={'Email Address*'}
            />
            {/* <TouchableOpacity
              style={{
                height: 25,
                backgroundColor: COLORS.Primary_Green,
                position: 'absolute',
                right: 30,
                top: 18,
                borderRadius: 4,
                justifyContent: 'center',
                paddingHorizontal: 10,
              }}
              onPress={() => {
                if (email == '' || email.trim().length == 0) {
                  setalert_sms('Please Enter Email*');
                  setMy_Alert(true);
                } else {
                  // validateEmail();
                  SendotpApi();
                }
              }}>
              <Text
                style={{
                  fontSize: Constant.textFontSize(12),
                  fontWeight: '600',
                  color: COLORS.White,
                  alignSelf: 'center',
                }}>
                {checkvalid == false ? 'Send OTP' : 'Verified'}
              </Text>
            </TouchableOpacity> */}
          </View>
          <View
            style={{
              padding: 20,
            }}>
            <PhoneTextInput
              value={mobile}
              setValue={setMobile}
              placeholder="Phone Number*"
              setCountryCode={setCountryCode}
              setCountrySymbol={setCountrySymbol}
            />
          </View>

          {/* <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
              alignSelf: 'center',
              width: '90%',
              backgroundColor: 'white',
              shadowColor: '#000',
              shadowOffset: {width: 1, height: 1},
              shadowOpacity: 0.4,
              shadowRadius: 2,
              elevation: 3,
              height: heightScale(55),
            }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: 15,
              }}>
              <Text
                style={{
                  marginLeft: 5,
                  color: '#000',
                  fontSize: Constant.textFontSize(14),
                  fontWeight: '400',
                }}>
                +1
              </Text>
            </View>
            <View
              style={{
                borderLeftColor: '#EAEDF7',
                borderLeftWidth: 1,

                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: 15,
                marginTop: 4,
              }}
            />

            <MaskInput
              value={mobile}
              keyboardType="phone-pad"
              placeholder="Phone Number*"
              placeholderTextColor={COLORS.dark_grey}
              style={{
                color: '#000',
                fontSize: Constant.textFontSize(14),
                height: '100%',
                marginLeft: 15,
              }}
              onChangeText={(masked, unmasked) => {
                setMobile(masked); // you can use the unmasked value as well

                // assuming you typed "9" all the way:
              }}
              mask={[
                '(',
                /\d/,
                /\d/,
                /\d/,
                ')',
                ' ',
                /\d/,
                /\d/,
                /\d/,
                '-',
                /\d/,
                /\d/,
                /\d/,
                /\d/,
              ]}
            />
          </View> */}
          <View style={{marginTop: 10}}>
            <CustomTextInput
              onChangeText={txt => {
                setpass(txt);
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
          <View style={{marginTop: 10}}>
            <CustomTextInput
              onChangeText={txt => {
                setcpass(txt);
              }}
              placeholder={'Confirm Password*'}
              secureTextEntry={myeye1}
              rightView={
                <TouchableOpacity
                  onPress={() => {
                    setmyeye1(!myeye1);
                  }}>
                  <Image
                    source={myeye1 ? images.ceye : images.eye}
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

          <CustomButton
            title={'Submit'}
            borderColor={COLORS.border_blue}
            onPress={() => {
              // SignupPressed();
              if (email == '' || email.trim().length == 0) {
                setalert_sms('Please Enter Email*');
                setMy_Alert(true);
              } else {
                checkSignupSubmit();
              }
            }}
            backgroundColor={COLORS.Primary_Blue}
          />
          <View
            style={{
              top: 20,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <Text style={[styles.txtStyle, {color: '#000', fontWeight: '400'}]}>
              Already have an account?{' '}
            </Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Login')}>
              <Text style={[styles.signup, {color: COLORS.Primary_Blue}]}>
                {' '}
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
          {/* </KeyboardAwareScrollView> */}
        </View>
      </KeyboardAwareScrollView>
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
            <View
              style={{
                alignSelf: 'center',
                width: 120,
                height: 120,
                marginTop: 20,
              }}>
              <Image
                source={images.alriightIcon}
                style={{
                  width: 120,
                  height: 120,
                }}
              />
            </View>

            <Text
              style={{
                color: '#000',
                alignSelf: 'center',
                marginTop: 20,
                fontSize: Constant.textFontSize(20),
                fontWeight: '600',
              }}>
              Congratulations
            </Text>
            <Text
              style={{
                color: '#000',
                alignSelf: 'center',
                marginTop: 10,
                textAlign: 'center',
                fontSize: Constant.textFontSize(14),
                fontWeight: '400',
              }}>
              Your account has been successfully created
            </Text>

            <CustomButton
              title={'Go'}
              borderColor={COLORS.border_blue}
              onPress={() => {
                props.navigation.navigate('Login');
                setpopup(false);
              }}
              backgroundColor={COLORS.Primary_Blue}
            />
          </View>
        </View>
      ) : null}
      <OtpVerification
        visible={showCodeVerification}
        username={name}
        setVisibility={setShowCodeVerification}
        codeInfo={otpInfo.current}
        nextFunction={data => {
          // setCheckvalid(true);
          // setalert_sms(data.message);
          // setMy_Alert(true);
          Toast.show({
            type: 'info',
            text1: data.message,
          });
          SignupPressed();
        }}
      />

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

// const styless = StyleSheet.create({
//   topImgContainer: {
//     flex: 0.5,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   forgotContainer: {
//     alignSelf: 'center',
//     marginRight: 20,
//     marginTop: 10,
//   },
//   underlineStyleBase: {
//     width: 30,
//     height: 45,
//     borderWidth: 0,
//     borderBottomWidth: 1,
//     color: '#000000',
//   },

//   underlineStyleHighLighted: {
//     borderColor: '#3DA1E3',
//   },
//   logo: {
//     height: heightScale(170),
//     width: widthScale(236),
//     resizeMode: 'contain',
//   },
//   container: {
//     flex: 0.6,
//     backgroundColor: '#ffff',
//     borderTopRightRadius: 30,
//     borderTopLeftRadius: 30,
//   },
//   Txt: {
//     alignSelf: 'center',
//     color: COLORS.Primary_Blue,
//     marginTop: widthScale(20),
//     fontWeight: '700',
//     fontFamily: FONTS.bold,
//   },
//   viewContanier: {
//     height: heightScale(155),
//     borderRadius: widthScale(5),
//     borderWidth: 0.5,
//     borderColor: COLORS.primary_white,
//     width: '90%',
//     backgroundColor: '#fff',
//     alignSelf: 'center',

//     shadowColor: '#000',
//     shadowOffset: {width: 1, height: 1},
//     shadowOpacity: 0.4,
//     shadowRadius: 2,
//     elevation: 3,

//     alignItems: 'center',

//     marginTop: 20,
//   },
//   resumeTxt: {
//     color: COLORS.grey,
//     marginTop: widthScale(20),
//     fontWeight: '500',
//     fontFamily: FONTS.regular,
//   },
//   instructionTxt: {
//     fontFamily: FONTS.regular,
//     fontWeight: '300',
//     marginTop: 10,
//   },
//   sizeStyle: {
//     fontFamily: FONTS.regular,
//     color: COLORS.grey,
//   },
//   btnContainer: {
//     height: 40,
//     borderWidth: 0.6,
//     borderColor: COLORS.primary_white,
//     width: '90%',
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     marginTop: 10,
//     flexDirection: 'row',
//     alignItems: 'center',

//     gap: 10,
//   },
//   btn: {
//     height: 25,
//     width: 100,
//     backgroundColor: COLORS.Primary_Blue,
//     borderRadius: 3,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginLeft: widthScale(30),
//   },
//   txt: {
//     fontFamily: FONTS.regular,
//     color: COLORS.light_white,
//   },
//   textInputContainer: {
//     height: heightScale(130),
//     borderRadius: widthScale(5),
//     borderWidth: 0.5,
//     borderColor: COLORS.primary_white,
//     width: '90%',
//     backgroundColor: '#fff',
//     alignSelf: 'center',

//     shadowColor: '#000',
//     shadowOffset: {width: 1, height: 1},
//     shadowOpacity: 0.4,
//     shadowRadius: 2,
//     elevation: 3,
//     marginTop: 20,
//   },
//   txtInput: {
//     flex: 1,
//     textAlignVertical: 'top',
//     paddingLeft: 15,
//   },
// });
// const mystyles = StyleSheet.create({
//   topImgContainer: {
//     flex: 0.9,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },

//   logo: {
//     height: heightScale(170),
//     width: widthScale(236),
//     resizeMode: 'contain',
//   },
//   container: {
//     flex: 0.2,
//     backgroundColor: '#ffff',
//     borderTopRightRadius: 30,
//     borderTopLeftRadius: 30,
//   },

//   container: {
//     flex: 1,
//     backgroundColor: COLORS.light_white,
//     borderTopRightRadius: 30,
//     borderTopLeftRadius: 30,
//   },
//   txt: {
//     fontWeight: '700',
//     fontFamily: FONTS.regular,
//     color: COLORS.Primary_Blue,
//     alignSelf: 'center',
//     marginTop: 30,
//   },
//   SignupTxtContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginTop: 20,
//     gap: 5,
//   },
//   txtStyle: {
//     fontFamily: FONTS.regular,
//     color: COLORS.grey,
//     fontWeight: '600',
//   },
//   signup: {
//     fontFamily: FONTS.regular,
//     fontWeight: '600',
//     color: COLORS.Primary_Green,
//   },
//   modalContainerStyle: {
//     backgroundColor: COLORS.light_white,
//     height: myHeight * 0.5,
//     width: '90%',
//     alignSelf: 'center',
//     marginBottom: myHeight * 0.2,
//     borderRadius: 20,
//   },
//   topContainer: {
//     alignItems: 'center',
//   },
//   img: {
//     height: heightScale(120),
//     width: widthScale(120),
//     resizeMode: 'contain',
//   },
//   modalCotationTxt: {
//     fontWeight: '700',
//     fontFamily: FONTS.regular,
//     color: COLORS.Primary_Blue,
//     textAlign: 'center',
//     marginTop: 10,
//   },
//   conditionalTxtStyle: {
//     fontFamily: FONTS.regular,
//     color: COLORS.grey,
//     textAlign: 'center',
//     width: '90%',
//     marginTop: 20,
//   },
//   txtContainer: {
//     width: '85%',
//     height: 35,
//     backgroundColor: COLORS.secondary_blue,
//     borderRadius: widthScale(5),
//     marginTop: 10,
//     justifyContent: 'center',
//   },

//   btnTxtStyle: {
//     textAlign: 'center',
//     fontFamily: FONTS.regular,
//     color: COLORS.light_white,
//   },
// });

export default SignUpScreen;
