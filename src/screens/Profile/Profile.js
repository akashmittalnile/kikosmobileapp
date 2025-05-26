import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {Mycolors, dimensions} from '../../utility/Mycolors';
import HomeHeaderComponent from '../../components/HomeHeaderComponent';
import COLORS from '../../global/Colors';
import images from '../../global/images';
import DrawerPic from '../../navigation/Drawer/DrawerPic';
import {FONTS, FONTS_SIZE, heightScale, widthScale} from '../../global/Utils';
import CustomTextInput from '../../components/CustomTextinput/CustomTextInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import {useSelector, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {saveUserProfile, saveUserResult} from '../../redux/actions/user_action';
import Loader from '../../WebApi/Loader';
import MyAlert from '../../components/MyAlert';
import CustomheaderCard from '../../components/CustomheaderCard';
import {
  baseUrl,
  country,
  state,
  city,
  profile,
  update_profile,
  register,
  requestGetApi,
  requestPostApi,
} from '../../WebApi/Service';
import {Constant} from '../../global';

const Profile = props => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user_details);
  const ProfileDetail = useSelector(state => state.user.ProfileDetails);
  const [DATA, setDATA] = useState('');

  const [profileimg, setProfileimg] = useState('');
  const [name, setname] = useState('');
  const [phone, setphone] = useState('');
  const [email, setemail] = useState('');
  const [My_Alert, setMy_Alert] = useState(false);
  const [alert_sms, setalert_sms] = useState('');
  const [loading, setLoading] = useState(false);
  const [lod, setlod] = useState(false);
  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      getprofile();
    });
    return unsubscribe;
  }, []);
  const getprofile = async () => {
    setLoading(true);
    const {responseJson, err} = await requestGetApi(
      profile,
      '',
      'GET',
      user.token,
    );
    setLoading(false);
    if (err == null) {
      if (responseJson.status == true) {
        setDATA(responseJson.data);
        setProfileimg(responseJson.data.profile);
        dispatch(saveUserProfile(responseJson.data));
        //  setname(responseJson.data.fullname)
        //  setemail(responseJson.data.email)
        //  setphone(responseJson.data.mobile)
      } else {
        setalert_sms(responseJson.message);
        setMy_Alert(true);
      }
    } else {
      setalert_sms(err);
      setMy_Alert(true);
    }
  };

  return (
    <View style={{flex: 1}}>
      <HomeHeaderComponent
        icon1={images.arrowleft}
        press1={() => {
          props.navigation.goBack();
        }}
        press2={() => {
          props.navigation.navigate('Notification');
        }}
        stylecontainer={Platform.OS == 'ios' ? {marginTop: 0} : {marginTop: 0}}
      />

      <View
        style={{
          top: -60,
          // height:"100%",
          marginBottom: 60,
          // justifyContent: 'center',
          // alignItems: 'center',
          // height: 300,
        }}>
        <ScrollView
          contentContainerStyle={{
            paddingBottom: '10%',
          }}
          style={{height: '100%'}}>
          <>
            <View
              style={styles.container}
              // onPress={() => {
              //   props.navigation.replace('ServiceDetails');
              // }}
            >
              <View style={styles.container2}>
                <View style={styles.subContainer}>
                  <View style={styles.ImageContainer}>
                    <Image
                      // resizeMode="contain"
                      source={
                        profileimg != ''
                          ? {uri: profileimg}
                          : require('../../assets/images/largeimages/dummy_profile.png')
                      }
                      style={styles.image}
                    />
                  </View>
                  <View
                    style={{
                      marginTop: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '100%',
                    }}>
                    <Text
                      style={[
                        styles.headerText,
                        {
                          fontWeight: '500',
                          fontSize: Constant.textFontSize(14),
                        },
                      ]}>
                      {DATA.fullname}
                    </Text>

                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 10,
                        justifyContent: 'center',
                      }}>
                      <Image
                        style={{width: 19, height: 19, resizeMode: 'contain'}}
                        source={require('../../assets/images/Icons/call_icon_black.png')}
                      />
                      <View style={{marginLeft: 7}}>
                        <Text
                          style={{
                            color: COLORS.Primary_Blue,
                            fontWeight: '400',
                            fontSize: Constant.textFontSize(12),
                          }}>
                          {DATA.country_code} {DATA?.mobile}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginTop: 10,
                        justifyContent: 'center',
                        marginLeft: 0,
                      }}>
                      <Image
                        style={{width: 19, height: 19, resizeMode: 'contain'}}
                        source={require('../../assets/images/Icons/sms_black.png')}
                      />
                      <View style={{marginLeft: 7}}>
                        <Text
                          style={{
                            color: COLORS.Primary_Blue,
                            fontWeight: '400',
                            fontSize: Constant.textFontSize(12),
                          }}>
                          {DATA?.email}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 20,
                    width: '100%',
                  }}>
                  <TouchableOpacity
                    style={styles.Btn}
                    onPress={() => {
                      props.navigation.navigate('EditProfile', {
                        UserDetails: DATA,
                      });
                    }}>
                    <Text style={styles.BtnTxt}>Edit Details</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.Btn, {width: 175, marginLeft: 13}]}
                    onPress={() => {
                      props.navigation.navigate('ChangePassword', {
                        Emailid: DATA,
                      });
                    }}>
                    <Text style={styles.BtnTxt}>Change Password</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View style={styles.cardContainer}>
              <View style={{marginTop: 20}}>
                <Text style={styles.title}>My Tour Bookings</Text>
                <Text style={styles.number}>{DATA?.confirmed_tour}</Text>

                <TouchableOpacity
                  style={styles.cardbtn}
                  onPress={() => {
                    props.navigation.navigate('BookTourStack', {
                      screen: 'ConfirmedTour',
                      params: {},
                    });
                    // props.navigation.navigate('ConfirmedTour');
                  }}>
                  <View
                    style={{
                      width: 45,
                      // alignSelf: 'center',
                      alignItems: 'center',
                      height: 45,
                      borderRadius: 45 / 2,
                      justifyContent: 'center',
                      borderWidth: 1,
                      borderColor: 'rgba(228, 228, 228, 1)',
                    }}>
                    <Image
                      style={{height: 28, width: 28}}
                      source={require('../../assets/images/Icons/arrow-right_white.png')}
                    />
                    {/* <Text style={styles.btnTxt}>Go</Text> */}
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{}}>
                <Image
                  source={images.groupImg}
                  style={{
                    height: 115,
                    width: 169,
                    resizeMode: 'contain',
                    marginTop: 10,
                  }}
                />
              </View>
            </View>
            <View style={[styles.cardContainer, {paddingLeft: 10}]}>
              <View style={{marginTop: 20}}>
                <Text style={styles.title}>My Virtual Tours</Text>
                <Text style={styles.number}>
                  {DATA?.virtual_audio_purchased}
                </Text>

                <TouchableOpacity
                  style={styles.cardbtn}
                  onPress={() => {
                    props.navigation.navigate('AudioStack', {
                      screen: 'MyVirtualTour',
                      params: {},
                    });
                    // props.navigation.navigate('ConfirmedTourScreen')
                  }}>
                  <View
                    style={{
                      width: 45,
                      // alignSelf: 'center',
                      alignItems: 'center',
                      height: 45,
                      borderRadius: 45 / 2,
                      justifyContent: 'center',
                      borderWidth: 1,
                      borderColor: 'rgba(228, 228, 228, 1)',
                    }}>
                    <Image
                      style={{height: 28, width: 28}}
                      source={require('../../assets/images/Icons/arrow-right_white.png')}
                    />
                    {/* <Text style={styles.btnTxt}>Go</Text> */}
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{}}>
                <Image
                  source={images.img2img}
                  style={{
                    height: 115,
                    width: 169,
                    resizeMode: 'contain',
                    marginTop: 10,
                  }}
                />
              </View>
            </View>

            <View
              style={[
                styles.cardContainer,
                {paddingLeft: 30, height: 135, marginBottom: 40},
              ]}>
              <View style={{marginTop: 20}}>
                <Text style={styles.title}>Photo Booth</Text>
                {/* <Text style={styles.number}>05</Text> */}
                <View style={styles.hrcontainer}>
                  <Image
                    style={{height: 15, width: 15, tintColor: '#CECECE'}}
                    source={images.gallaryicon}
                  />
                  <Text style={styles.titleTxt}>
                    {DATA?.total_purchased_photo} Photos
                  </Text>
                  <Image
                    style={{
                      height: 15,
                      width: 15,
                      marginLeft: 5,
                      tintColor: '#CECECE',
                    }}
                    source={images.gallaryvideoicon}
                  />
                  <Text style={styles.titleTxt}>
                    {DATA?.total_purchased_video} Videos
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.cardbtn}
                  onPress={() => {
                    props.navigation.navigate('PhotoBoothStack', {
                      screen: 'TotalPurchasedScreen',
                      params: {},
                    });
                  }}>
                  <View
                    style={{
                      width: 45,
                      // alignSelf: 'center',
                      alignItems: 'center',
                      height: 45,
                      borderRadius: 45 / 2,
                      justifyContent: 'center',
                      borderWidth: 1,
                      borderColor: 'rgba(228, 228, 228, 1)',
                    }}>
                    <Image
                      style={{height: 28, width: 28}}
                      source={require('../../assets/images/Icons/arrow-right_white.png')}
                    />
                    {/* <Text style={styles.btnTxt}>Go</Text> */}
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{marginLeft: 10}}>
                <Image
                  source={images.img3img}
                  style={{
                    height: 115,
                    width: 169,
                    resizeMode: 'contain',
                    marginTop: 10,
                  }}
                />
              </View>
            </View>
          </>
        </ScrollView>
      </View>

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
    width: (dimensions.SCREEN_WIDTH * 90) / 100,
    // height:400,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowRadius: 2,
    shadowOpacity: 0.2,
    elevation: 3,
    marginHorizontal: 20,
    padding: 20,
    // flex: 1,
    // paddingVertical:15,
  },
  hrcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    gap: 2,
  },
  titleTxt: {
    fontSize: Constant.textFontSize(12),
    fontWeight: '400',
    fontFamily: FONTS.regular,
    marginLeft: 2,
    color: '#8F93A0',
  },
  cardContainer: {
    height: 138,
    width: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    elevation: 3,
    paddingHorizontal: 10,
    // position: 'absolute',
    // marginTop: '15%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  title: {
    fontSize: Constant.textFontSize(14),
    fontWeight: '400',
    fontFamily: FONTS.regular,
    color: '#000',
  },
  number: {
    fontSize: Constant.textFontSize(16),
    fontWeight: '700',
    color: '#3DA1E3',
    lineHeight: 20,
    letterSpacing: 0.1,
    marginTop: 5,
  },
  cardbtn: {
    height: 55,
    width: 55,
    backgroundColor: '#3DA1E3',
    borderRadius: 55 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 7,
    borderColor: '#83CDFD',
    borderWidth: 5,
  },
  btnTxt: {
    fontSize: Constant.textFontSize(14),
    fontWeight: '400',
    color: 'white',
  },
  ImageContainer: {
    height: 110,
    width: 110,
    alignItems: 'center',
    justifyContent: 'center',
    // overflow: 'hidden',
    backgroundColor: 'gray',
    borderRadius: 110 / 2,
  },
  image: {
    height: '100%',
    width: '100%',
    borderRadius: 110 / 2,
    alignSelf: 'center',
  },
  container2: {
    // backgroundColor: COLORS.Primary_Blue,
    // height: heightScale(120),
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // padding: widthScale(0),
  },
  subContainer: {
    // backgroundColor: COLORS.Primary_Blue,
    // flexDirection: 'row',
    // width:'95%',
    // width:'100%',
    justifyContent: 'center',
    alignItems: 'center',
    // gap: widthScale(15),
  },
  headerText: {
    fontSize: Constant.textFontSize(14),
    color: '#455A64',
    // fontFamily: FONTS.regular,
  },
  Btn: {
    backgroundColor: '#3DA1E3',
    width: widthScale(140),
    height: heightScale(42),
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  BtnTxt: {
    color: COLORS.light_white,
    fontSize: Constant.textFontSize(14),
    fontWeight: '500',
    // fontFamily: FONTS.regular,
  },
});

export default Profile;
