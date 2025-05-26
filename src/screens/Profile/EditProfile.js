import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Toast from 'react-native-toast-message';
import images from '../../global/images';
import ImagePicker from 'react-native-image-crop-picker';
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
import MaskInput from 'react-native-mask-input';
import {
  baseUrl,
  change_password,
  requestPostApi,
  update_profile,
} from '../../WebApi/Service';
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
import PhoneTextInput from '../../components/PhoneTextInput/PhoneTextInput';

const EditProfile = props => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user_details);
  //hook : states
  const [fullname, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [pass, setPass] = useState('');
  const [modlevisual, setmodlevisual] = useState(false);
  const [picker, setPicker] = useState('');
  const [image2, setimage2] = useState('');
  const [isimageChange, setisimageChange] = useState(false);
  const [cpass, setcPass] = useState('');
  const [profileimg, setProfileimg] = useState('');
  const [My_Alert, setMy_Alert] = useState(false);
  const [alert_sms, setalert_sms] = useState('');
  const [loading, setLoading] = useState(false);
  const [popup, setpopup] = useState(false);
  const [countrySymbol, setCountrySymbol] = useState('');
  const [countryCode, setCountryCode] = useState('');
  //function : imp func
  const clearState = () => {
    setProfileimg('');
    setFullName('');
    setEmail('');
    setMobile('');
    setCountrySymbol('');
    setCountryCode('');
  };
  //hook : useEffect

  useEffect(() => {
    setProfileimg(props?.route?.params?.UserDetails?.profile);
    setFullName(props?.route?.params?.UserDetails?.fullname);
    setEmail(props?.route?.params?.UserDetails?.email);
    setMobile(props?.route?.params?.UserDetails?.mobile);
    setCountrySymbol(props?.route?.params?.UserDetails?.country_symbol);
    setCountryCode(props?.route?.params?.UserDetails?.country_code);
    // setPicker(props?.route?.params?.UserDetails?.profile.slice(
    //   props?.route?.params?.UserDetails?.profile.lastIndexOf("/"),
    //   props?.route?.params?.UserDetails?.profile.length
    // ))
    return () => {
      clearState();
    };
  }, []);
  const LoginPressed = async () => {
    var EmailReg =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (fullname == '' || fullname.trim().length == 0) {
      setalert_sms('Please Enter Full Name');
      setMy_Alert(true);
    } else if (email == '' || email.trim().length == 0) {
      setalert_sms('Please Enter Email');
      setMy_Alert(true);
    } else if (!EmailReg.test(email)) {
      setalert_sms('Enter valid email');
      setMy_Alert(true);
    } else if (mobile == '' || mobile.trim().length == 0) {
      setalert_sms('Please Enter Phone Number');
      setMy_Alert(true);
    } else if (mobile.trim().length !== 10) {
      setalert_sms('Please Enter Valid Phone Number');
      setMy_Alert(true);
    } else {
      setLoading(true);
      let formdata = new FormData();
      formdata.append('fullname', fullname);
      formdata.append('email', email);
      formdata.append('mobile', mobile);
      formdata.append('country_symbol', countrySymbol);
      formdata.append('country_code', countryCode);

      if (picker.length > 0) {
        picker.map((item, index) => {
          const imageName = item.path.slice(
            item.path.lastIndexOf('/'),
            item.path.length,
          );
          formdata.append('image', {
            name: imageName,
            type: item.mime,
            uri: item.path,
          });
        });
      }
      if (picker.length == undefined) {
        const imageName = picker.path.slice(
          picker.path.lastIndexOf('/'),
          picker.path.length,
        );
        formdata.append(`image`, {
          name: imageName,
          type: picker.mime,
          uri: picker.path,
        });
      }
      const {responseJson, err} = await requestPostApi(
        update_profile,
        formdata,
        'POST',
        user.token,
      );
      console.log('responseJson', responseJson);
      setLoading(false);
      if (err == null) {
        if (responseJson.status) {
          setalert_sms(responseJson.message);
          setMy_Alert(true);
          setTimeout(() => {
            clearState();
          props.navigation.goBack();
          }, 500);
          
        } else {
          setalert_sms(responseJson.message);
          setMy_Alert(true);
        }
      } else if (responseJson === null) {
        setalert_sms('The image should be less then 1 mb');
        setMy_Alert(true);
      } else {
        setalert_sms(err);
        setMy_Alert(true);
      }
    }
  };

  const onGallery = () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      cropping: true,
      maxFiles: 1,
      multiple: false, // Enable picking multiple images
    })
      .then(images => {
        setPicker(images);
        setimage2(images?.path);
        setisimageChange(true);
        setmodlevisual(false);
      })
      .catch(error => {
        setmodlevisual(false);
      });
  };

  const onCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      // setPicker(image.path);
      setPicker(image);
      setimage2(image?.path);
      setisimageChange(true);
      setmodlevisual(false);
    });
  };
  const checkCameraPermission = async () => {
    if (Platform.OS === 'ios') {
      onCamera();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission Required',
            message:
              'Application needs access to your camera to click your profile image',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          onCamera();
        } else {
          Toast.show({type: 'error', text1: 'Camera Permission Not Granted'});
        }
      } catch (err) {
        // To handle permission related exception
      }
    }
  };
  return (
    <View style={{flex: 1, backgroundColor: '#EAEDF7'}}>
      <CustomHeader
        backarrow={true}
        title={'Edit Profile Details'}
        onBackPress={() => {
          props.navigation.goBack();
        }}
        onNotificationPress={() => {
          props.navigation.navigate('Notification');
        }}
      />
      <View style={{alignItems: 'center', marginTop: 25}}>
        <View style={styles.ImageContainer}>
          <Image
            // resizeMode="contain"
            source={
              isimageChange
                ? {uri: image2}
                : profileimg
                ? {uri: profileimg}
                : require('../../assets/images/largeimages/dummy_profile.png')
            }
            style={styles.image}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            setmodlevisual(true);
          }}
          style={{top: -31, left: 31}}>
          <Image
            source={require('../../assets/images/Icons/Edit_profile_icon.png')}
            style={{height: 40, width: 40}}
          />
        </TouchableOpacity>
      </View>
      <KeyboardAwareScrollView>
        <View style={{marginTop: 0}}>
          <CustomTextInput
            value={fullname}
            onChangeText={txt => {
              setFullName(txt);
            }}
            placeholder={'Full Name'}
          />
        </View>
        <View
          style={{
            marginTop: 10,
            height: heightScale(55),
            borderRadius: widthScale(5),
            borderWidth: 0.5,
            borderColor: COLORS.primary_white,
            width: '90%',
            backgroundColor: '#ffffff',
            alignSelf: 'center',
            flexDirection: 'row',
            shadowColor: '#000',
            shadowOffset: {width: 1, height: 1},
            shadowOpacity: 0.4,
            shadowRadius: 2,
            elevation: 3,
            // justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 10,
          }}>
          <Text
            style={{
              fontSize: Constant.textFontSize(14),
              fontFamily: FONTS.regular,
              marginLeft: 5,
              color: '#1F191C',
            }}>
            {email}
          </Text>
        </View>
        <View
          style={{
            padding: 20,
          }}>
          <PhoneTextInput
            value={mobile}
            countrySymbol={countrySymbol}
            setCountrySymbol={setCountrySymbol}
            countryCode={countryCode}
            setValue={setMobile}
            setCountryCode={setCountryCode}
            placeholder={'Phone Number'}
            placeholderTextColor={COLORS.Black}
          />
        </View>

        {/* <View
          style={{
            flexDirection: 'row',
            marginTop: 15,
            alignSelf: 'center',
            width: '90%',
            backgroundColor: 'white',
            shadowColor: '#000',
            shadowOffset: {width: 1, height: 1},
            shadowOpacity: 0.4,
            shadowRadius: 2,
            elevation: 3,
            borderRadius: 5,
          }}>
          <View
            style={{
              height: 55,
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: 15,
            }}>
            <Text
              style={{
                marginLeft: 5,
                color: '#1F191C',
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
              height: 42,
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: 15,
              marginTop: 4,
            }}
          />

          <MaskInput
            value={mobile}
            keyboardType="phone-pad"
            placeholder="Phone Number"
            placeholderTextColor={'#CECECE'}
            style={{color: '#000', marginLeft: 15}}
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

        <View style={{height: 20}}></View>
        <CustomButton
          borderColor={'#83CDFD'}
          title={'Update'}
          onPress={() => {
            LoginPressed();
          }}
          backgroundColor={COLORS.Primary_Blue}
        />
      </KeyboardAwareScrollView>
      {/* <View
          style={{
            position: 'absolute',
            bottom: 0,
            width: '140%',
            height: (dimensions.SCREEN_HEIGHT * 50) / 100,
            alignSelf: 'center',
          }}></View> */}

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
      <Modal
        transparent={true}
        animationType="fade"
        visible={modlevisual}
        onRequestClose={() => setmodlevisual(false)}>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            margin: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
          <View
            style={{
              height: 150,
              backgroundColor: '#FFF',
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              padding: 20,
            }}>
            <View style={{}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '100%',
                }}>
                <TouchableOpacity
                  style={{width: 150, height: 150}}
                  onPress={onGallery}>
                  <Image
                    resizeMode="contain"
                    source={require('../../assets/images/Icons/Blue_gallery.png')}
                    style={{width: 70, height: 70, alignSelf: 'center'}}
                  />
                  <Text style={{textAlign: 'center', color: '#000'}}>
                    Open Library
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{width: 150, height: 150}}
                  onPress={() => {
                    checkCameraPermission();
                  }}>
                  <Image
                    resizeMode="contain"
                    source={require('../../assets/images/Icons/Blue_camera.png')}
                    style={{width: 70, height: 70, alignSelf: 'center'}}
                  />
                  <Text style={{textAlign: 'center', color: '#000'}}>
                    Open Camera
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
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
  ImageContainer: {
    height: 110,
    width: 110,
    alignItems: 'center',
    justifyContent: 'center',
    // overflow: 'hidden',
    backgroundColor: 'gray',
    borderRadius: 110 / 2,
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  image: {
    height: '100%',
    width: '100%',
    borderRadius: 110 / 2,
    alignSelf: 'center',
  },
});

export default EditProfile;
