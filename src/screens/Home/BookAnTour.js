//import : react components
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
//import : custom components
import CustomButtonRound from '../../components/CustomButton/CustomButtonRound';
import CustomHeader from '../../components/CustomeHeader';
import Loader from '../../WebApi/Loader';
import MyAlert from '../../components/MyAlert';
import MyText from '../../MyText/MyText';
//import : third parties
import moment from 'moment';
//import : utils
import COLORS from '../../global/Colors';
import {Constant} from '../../global';
import FastImage from 'react-native-fast-image';
import CustomTextInput from '../../components/CustomTextinput/CustomTextInput';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
//import : redux

const BookAnTour = props => {
  //hook : states
  const [My_Alert, setMy_Alert] = useState(false);
  const [alert_sms, setalert_sms] = useState('');
  const [loading, setLoading] = useState(false);
  const [counter, setcounter] = useState(1);
  const [counter1, setcounter1] = useState(0);
  const [counter2, setcounter2] = useState(0);
  const [selectedDate, setSelectedDate] = useState('');
  const [pickuploc, setPickUpLoc] = useState('');
  const [tourdetails, setTourDetail] = useState(props?.route?.params?.TourData);
  //function : imp func
  const putadult = async add => {
    if (add == '+') {
      if (counter < 6) {
        setcounter(counter + 1);
      }
    } else {
      if (counter > 0) {
        setcounter(counter - 1);
      } else {
      }
    }
  };
  const Totalamountadultfun = item => {
    if (item != null && item > 0) {
      return item * counter;
    }
  };
  const putsenior = async add => {
    if (add == '+') {
      if (counter1 < 6) {
        setcounter1(counter1 + 1);
      }
    } else {
      if (counter1 > 0) {
        setcounter1(counter1 - 1);
      } else {
      }
    }
  };
  const Totalamountseniorfun = item => {
    if (item != null && item > 0) {
      return item * counter1;
    }
  };

  const putkids = async add => {
    if (add == '+') {
      if (counter2 < 6) {
        setcounter2(counter2 + 1);
      }
    } else {
      if (counter2 > 0) {
        setcounter2(counter2 - 1);
      } else {
      }
    }
  };
  const Totalamountkidsfun = item => {
    if (item != null && item > 0) {
      return item * counter2;
    }
  };
  //hook : useEffect
  useEffect(() => {
    setSelectedDate(props?.route?.params?.dates);
    // PostTourDetails(props?.route?.params?.tourId);
  }, []);
  //UI
  return (
    <View style={{backgroundColor: '#EAEDF7', flex: 1}}>
      <CustomHeader
        backarrow={true}
        title={'Book A Tour'}
        onBackPress={() => {
          props.navigation.goBack();
        }}
      />
      <KeyboardAwareScrollView>
        <>
          <Text
            style={[
              styles.uploadTxt,
              {fontWeight: '600', marginLeft: '5%', marginTop: 10},
            ]}>
            You’re Booking Tour for!
          </Text>

          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              alignItems: 'center',
              marginTop: 15,
              width: '90%',
              backgroundColor: '#fff',
              borderRadius: 10,
              shadowColor: '#000',
              shadowOffset: {width: 1, height: 1},
              shadowOpacity: 0.4,
              shadowRadius: 2,
              elevation: 3,
              padding: 7,
            }}>
            <View>
              <FastImage
                resizeMode="stretch"
                style={{
                  width: Constant.textFontSize(80),
                  height: Constant.textFontSize(80),

                  borderRadius: 5,
                }}
                source={{uri: `${tourdetails?.images[0]}`}}
              />
            </View>

            <View style={{width: '80%', marginLeft: 10}}>
              <View style={{width: '85%'}}>
                <Text
                  numberOfLines={2}
                  style={[styles.uploadTxt, {fontWeight: '700'}]}>
                  {tourdetails?.title}
                </Text>
              </View>
              <View style={{width: '99%'}}>
                <MyText
                  numberOfLines={2}
                  text={tourdetails?.name}
                  fontSize={Constant.textFontSize(13)}
                  textColor={COLORS.dark_grey}
                  width={'80%'}
                  marginVertical={5}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 5,
                }}>
                <Image
                  style={styles.imgStyle}
                  source={require('../../assets/images/Icons/calendar.png')}></Image>
                <MyText
                  text={`Duration ${tourdetails?.duration} Hours`}
                  textColor={COLORS.dark_grey}
                />
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  style={styles.imgStyle}
                  source={require('../../assets/images/Icons/clock.png')}></Image>
                <MyText
                  text={`${moment(selectedDate).format('LL')}`}
                  textColor={COLORS.dark_grey}
                />
              </View>
            </View>
          </View>
          <View style={{marginTop: 15}}>
            <CustomTextInput
              value={pickuploc}
              onChangeText={text => {
                setPickUpLoc(text);
              }}
              style={{height: 'auto', paddingVertical: 6}}
              // editable={addresspickup?.length > 5 ? false : true}
              // selectTextOnFocus={false}
              placeholder={'Pickup Location*'}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignSelf: 'center',
              alignItems: 'center',
              marginTop: 10,
              width: '90%',
              backgroundColor: '#fff',
              borderRadius: 10,
              shadowColor: '#000',
              shadowOffset: {width: 1, height: 1},
              shadowOpacity: 0.4,
              shadowRadius: 2,
              elevation: 3,
              padding: 7,
              zIndex: 3,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '40%',
              }}>
              <View style={{}}>
                <Image
                  style={{
                    width: 40,
                    height: 40,
                    resizeMode: 'stretch',
                    borderRadius: 20,
                    overflow: 'hidden',
                  }}
                  source={require('../../assets/images/Icons/yng.png')}></Image>
              </View>
              <View style={{marginLeft: 5}}>
                <Text style={[styles.uploadTxt, {fontWeight: '600'}]}>
                  Adults
                </Text>
                <Text style={[styles.forAllTxt, {color: COLORS.dark_grey}]}>
                  Ages 11+
                </Text>
              </View>
            </View>
            <View style={{}}>
              <Text
                style={[
                  styles.forAllTxt,
                  {
                    color: COLORS.Primary_Blue,
                    fontWeight: '700',
                    fontSize: Constant.textFontSize(14),
                  },
                ]}>
                $
                {Totalamountadultfun(
                  tourdetails?.same_for_all != null
                    ? tourdetails?.same_for_all
                    : tourdetails?.age_11_price,
                )}
              </Text>
            </View>

            <View
              style={{
                height: 50,
                // zIndex: -999,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingTop: 10,
                }}>
                {counter != 0 && (
                  <TouchableOpacity
                    style={{
                      width: 55,
                      height: 55,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    onPress={() => {
                      putadult('-');
                      // counter <= 0 ? setcounter(1) : putadult("-");;
                    }}>
                    <Image
                      style={{width: '100%', height: '100%'}}
                      source={require('../../assets/images/Icons/Minus_icon.png')}
                    />
                  </TouchableOpacity>
                )}

                <View
                  style={{
                    width: 15,
                    height: 30,
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    // backgroundColor:'red'
                  }}>
                  <MyText text={counter} textAlign={'center'} />
                </View>

                <TouchableOpacity
                  style={{
                    width: 55,
                    height: 55,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    putadult('+');
                    // setcounter(counter + 1);
                  }}>
                  <Image
                    style={{width: '100%', height: '100%'}}
                    source={require('../../assets/images/Icons/Plus_icon.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignSelf: 'center',
              alignItems: 'center',
              marginTop: 15,
              width: '90%',
              backgroundColor: '#fff',
              borderRadius: 10,
              shadowColor: '#000',
              shadowOffset: {width: 1, height: 1},
              shadowOpacity: 0.4,
              shadowRadius: 2,
              elevation: 3,
              padding: 7,
              zIndex: 2,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '40%',
              }}>
              <View style={{}}>
                <Image
                  style={{
                    width: 40,
                    height: 40,
                    resizeMode: 'stretch',
                    borderRadius: 20,
                    overflow: 'hidden',
                  }}
                  source={require('../../assets/images/Icons/adlt.png')}></Image>
              </View>
              <View style={{marginLeft: 5}}>
                <Text style={[styles.uploadTxt, {fontWeight: '600'}]}>
                  Senior
                </Text>
                <Text style={[styles.forAllTxt, {color: COLORS.dark_grey}]}>
                  Ages 60+
                </Text>
              </View>
            </View>
            <View style={{}}>
              <Text
                style={[
                  styles.forAllTxt,
                  {
                    color: COLORS.Primary_Blue,
                    fontWeight: '700',
                    fontSize: Constant.textFontSize(14),
                  },
                ]}>
                $
                {Totalamountseniorfun(
                  tourdetails?.same_for_all != null
                    ? tourdetails?.same_for_all
                    : tourdetails?.age_60_price,
                )}
              </Text>
            </View>
            <View
              style={{
                height: 50,
                // zIndex: -999,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingTop: 10,
                }}>
                {counter1 != 0 && (
                  <TouchableOpacity
                    style={{
                      width: 55,
                      height: 55,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    onPress={() => {
                      putsenior('-');
                    }}>
                    <Image
                      style={{width: '100%', height: '100%'}}
                      source={require('../../assets/images/Icons/Minus_icon.png')}
                    />
                  </TouchableOpacity>
                )}

                <View
                  style={{
                    width: 15,
                    height: 30,
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    // backgroundColor:'red'
                  }}>
                  <MyText text={counter1} textAlign={'center'} />
                </View>

                <TouchableOpacity
                  style={{
                    width: 55,
                    height: 55,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    putsenior('+');
                    // setcounter1(counter1 + 1);
                  }}>
                  <Image
                    style={{width: '100%', height: '100%'}}
                    source={require('../../assets/images/Icons/Plus_icon.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignSelf: 'center',
              alignItems: 'center',
              marginTop: 15,
              width: '90%',
              backgroundColor: '#fff',
              borderRadius: 10,
              shadowColor: '#000',
              shadowOffset: {width: 1, height: 1},
              shadowOpacity: 0.4,
              shadowRadius: 2,
              elevation: 3,
              padding: 7,
              zIndex: 1,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '40%',
              }}>
              <View style={{}}>
                <Image
                  style={{
                    width: 40,
                    height: 40,
                    resizeMode: 'stretch',
                    borderRadius: 20,
                    overflow: 'hidden',
                  }}
                  source={require('../../assets/images/Icons/chld.png')}></Image>
              </View>
              <View style={{marginLeft: 5}}>
                <Text style={[styles.uploadTxt, {fontWeight: '600'}]}>
                  Kids
                </Text>
                <Text style={[styles.forAllTxt, {color: COLORS.dark_grey}]}>
                  Ages 10 & under
                </Text>
              </View>
            </View>
            <View style={{}}>
              <Text
                style={[
                  styles.forAllTxt,
                  {
                    color: COLORS.Primary_Blue,
                    fontWeight: '700',
                    fontSize: Constant.textFontSize(14),
                  },
                ]}>
                $
                {Totalamountkidsfun(
                  tourdetails?.same_for_all != null
                    ? tourdetails?.same_for_all
                    : tourdetails?.under_10_age_price,
                )}
              </Text>
            </View>
            <View
              style={{
                height: 50,
                // zIndex: -999,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingTop: 10,
                }}>
                {counter2 != 0 && (
                  <TouchableOpacity
                    style={{
                      width: 55,
                      height: 55,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    onPress={() => {
                      putkids('-');
                      // counter2 <= 0 ? setcounter2(1) : setcounter2(counter2 - 1);
                    }}>
                    <Image
                      style={{width: '100%', height: '100%'}}
                      source={require('../../assets/images/Icons/Minus_icon.png')}
                    />
                  </TouchableOpacity>
                )}

                <View
                  style={{
                    width: 15,
                    height: 30,
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    // backgroundColor:'red'
                  }}>
                  <MyText text={counter2} textAlign={'center'} />
                </View>

                <TouchableOpacity
                  style={{
                    width: 55,
                    height: 55,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    putkids('+');
                    // setcounter2(counter2 + 1);
                  }}>
                  <Image
                    style={{width: '100%', height: '100%'}}
                    source={require('../../assets/images/Icons/Plus_icon.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={{height: 5}} />
          <MyText
            text={'Note: A minimum 4 person are mandatory for tour booking.'}
            textAlign={'center'}
            textColor={COLORS.red}
            marginVertical={10}
            alignSelf={'center'}
            width={'80%'}
          />
          <CustomButtonRound
            stle={{width: '90%'}}
            //  borderColor={'#83CDFD'}
            txtStyle={{
              color: '#fff',
              fontSize: Constant.textFontSize(14),
              fontWeight: '400',
            }}
            backgroundColor={COLORS.Primary_Blue}
            title={'Confirm Booking'}
            onPress={() => {
              const totalMember =
                parseInt(counter) + parseInt(counter1) + parseInt(counter2);
              if (totalMember < 4) {
                setalert_sms(
                  'A minimum 4 person are mandatory for tour booking.',
                );
                setMy_Alert(true);
              } else if (String(pickuploc).trim().length == 0) {
                setalert_sms('Please Enter Pickup Location*');
                setMy_Alert(true);
              } else if (counter > '0' || counter1 > '0' || counter2 > '0') {
                props.navigation.navigate('ReviewBooking', {
                  TourData: props?.route?.params?.TourData,
                  selectedDate: selectedDate,
                  counter: counter,
                  counter1: counter1,
                  counter2: counter2,
                  pickuptext: pickuploc,
                });
              } else {
                setalert_sms('Please select minimum 1 person for booking tour');
                setMy_Alert(true);
              }
            }}
          />

          <CustomButtonRound
            stle={{width: '90%'}}
            // borderColor={'#F4F4F4'}
            txtStyle={{
              color: '#000',
              fontSize: Constant.textFontSize(14),
              fontWeight: '400',
            }}
            backgroundColor={'#FFF'}
            title={'Cancel'}
            onPress={() => {
              props.navigation.goBack();
            }}
          />

          <View style={{height: 80}} />
        </>
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

export default BookAnTour;

const styles = StyleSheet.create({
  cardContainer: {
    marginTop: 20,
  },
  imageContainer: {
    height: (Dimensions.get('screen').width * 25) / 100,
    width: (Dimensions.get('screen').width * 70) / 100,
  },
  photoTxt: {
    fontSize: Constant.textFontSize(12),
    fontWeight: '400',
    color: COLORS.Primary_Blue,
  },
  iconTxtContainer: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  thirdRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  titleTxt: {
    fontSize: Constant.textFontSize(16),
    fontWeight: '600',
    color: 'black',
    fontWeight: '700',
  },
  forAllTxt: {
    fontSize: Constant.textFontSize(12),
    fontWeight: '400',
    lineHeight: 20,
  },
  uploadTxt: {
    fontSize: Constant.textFontSize(15),
    fontWeight: '400',
    color: 'black',
    fontWeight: '400',
  },
  uploadTxtImgContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    gap: 10,
  },
  txtTotal: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  whiteCircle: {
    height: 30,
    width: 30,
    borderRadius: 30,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  countTxt: {
    fontSize: Constant.textFontSize(16),
    fontWeight: 'bold',
    color: '#1F191C',
  },
  imgStyle: {
    width: Constant.textFontSize(18),
    height: Constant.textFontSize(18),
    resizeMode: 'stretch',
  },
});
