//import : react components
import React, {
  useState,
  Fragment,
  useCallback,
  useMemo,
  useRef,
  useEffect,
} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Modal,
  Platform,
  Alert,
  FlatList,
} from 'react-native';
import Toast from 'react-native-toast-message';
import {dimensions} from '../../utility/Mycolors';
import images from '../../global/images';
import COLORS from '../../global/Colors';
import {FONTS, FONTS_SIZE, heightScale, widthScale} from '../../global/Utils';
import AntDesign from 'react-native-vector-icons';
import CustomButton from '../../components/CustomButton/CustomButton';
import CustomButtonRound from '../../components/CustomButton/CustomButtonRound';
import {ScrollView} from 'react-native-gesture-handler';
import {Calendar} from 'react-native-calendars';
import CustomTextInput from '../../components/CustomTextinput/CustomTextInput';
//import : third party
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import DatePicker from 'react-native-date-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import Loader from '../../WebApi/Loader';
import MyAlert from '../../components/MyAlert';
import {
  booking_taxi,
  calendarEvents,
  callback_request,
  requestGetApi,
  requestPostApi,
  taxi_calendar,
} from '../../WebApi/Service';
import {useSelector, useDispatch} from 'react-redux';
import MaskInput from 'react-native-mask-input';
import {Constant, MyIcon} from '../../global';
import CustomeHeader from '../../components/CustomeHeader';
import GetLocation from 'react-native-get-location';
import Geocoder from 'react-native-geocoding';
import {GoogleApiKey} from '../../WebApi/GoogleApiKey';
import MyText from '../../MyText/MyText';
import PhoneTextInput from '../../components/PhoneTextInput/PhoneTextInput';

Geocoder.init(GoogleApiKey);

const BookTaxi = props => {
  //variables
  const pickUpSearchRef = useRef(null);
  const user = useSelector(state => state.user.user_details);
  const ProfileDetail = useSelector(state => state.user.ProfileDetails);
  const [cdate, setCDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [hotelName, setHotelName] = useState('');
  const [pickuploc, setPickUpLoc] = useState('');
  const [droploc, setDropLoc] = useState('');
  const [email, setEmail] = useState(
    user?.email != undefined ? user?.email : '',
  );
  const [My_Alert, setMy_Alert] = useState(false);
  const [alert_sms, setalert_sms] = useState('');
  const [loading, setLoading] = useState(false);
  const [popup, setpopup] = useState(false);
  const [timezonevalue, setTimeZoneValue] = useState('UTC-05:00 Los Angeles');
  const [orderTime, setOrderTime] = useState('');
  const [selectedPickUp, setSelectedPickUp] = useState('');
  const [selectedDropOff, setSelectedDropOff] = useState('');
  const [showda, setshowda] = useState(false);
  const [showdatime, setshowdatime] = useState(false);
  const [showdatimeIos, setshowdatimeIos] = useState(false);
  const [countyCode, setCountyCode] = useState('+1');
  const [countrySymbol, setCountrySymbol] = useState('US');
  const [lat, setlat] = useState('');
  const [lan, setlan] = useState('');
  const [addre, setaddre] = useState(' ');
  const [googleAddress, setGoogleAddress] = useState('');
  const [googleLatLng, setGoogleLatLng] = useState({});
  const [googleAddressDrop, setGoogleAddressDrop] = useState('');
  const [googleLatLngDrop, setGoogleLatLngDrop] = useState({});
  const [openGoogleAddressModal, setOpenGoogleAddressModal] = useState(false);
  const [isExactAddress, setIsExactAddress] = useState(true);
  const [remainingCompleteAddress, setRemainingCompleteAddress] = useState('');

  const [addresspickup, setaddresspickup] = useState('');
  const [isShowingResults, setisShowingResults] = useState(false);
  const [searchResults, setsearchResults] = useState([]);

  const [latdrop, setlatdrop] = useState('');
  const [landrop, setlandrop] = useState('');
  const [addressdrop, setaddressDrop] = useState('');
  const [isShowingDropResults, setisShowingDropResults] = useState(false);
  const [searchDropResults, setsearchDropResults] = useState([]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  //hook : cal states
  const [pickupcross, setPickupcross] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [unavailableDays, setUnavailableDays] = useState({});
  const [availableDays, setavailableDays] = useState({});
  const [markedDates, setMarkedDates] = useState({
    ...unavailableDays,
    ...availableDays,
  });

  // useEffect(() => {

  //   // Alert.alert('Booking PAGE for Taxi booking!!!!')
  //   GetLocation.getCurrentPosition({
  //     enableHighAccuracy: true,
  //     timeout: 15000,
  //   })
  //     .then(location => {
  //       setlat(location.latitude);
  //       setlan(location.longitude);
  //       // let My_cord = { latitude: '28.5355', longitude: '77.3910' }
  //       let My_cord = {
  //         latitude: location.latitude,
  //         longitude: location.longitude,
  //       };
  //       // dispatch(setRestorentLocation(My_cord))
  //       //  homePage(location.latitude,location.longitude)
  //       // homePage('28.5355','77.3910')

  //       LatlongTo_address(My_cord);
  //     })
  //     .catch(error => {
  //       const {code, message} = error;
  //       console.warn(code, message);
  //     });

  //   // venderList()
  // }, []);

  // const LatlongTo_address = async latlong => {
  //   // var courentlocation = mapdata.curentPosition
  //   // dispatch(setStartPosition(courentlocation))
  //   Geocoder.from(latlong.latitude, latlong.longitude)
  //     .then(json => {
  //       var addressComponent = json.results[0].formatted_address;
  //       setaddre(addressComponent);
  //       // UpdateLocation(latlong,addressComponent)
  //     })
  //     .catch(error => console.warn(error));
  // };

  //function : imp func
  const validation = () => {
    if (String(selectedDate).trim().length == 0) {
      setalert_sms('Please Select Taxi Booking Date*');
      setMy_Alert(true);
    } else if (String(orderTime).trim().length == 0) {
      setalert_sms('Please Select Time');
      setMy_Alert(true);
    } else if (String(fullName).trim().length == 0) {
      setalert_sms('Please Enter Full Name');
      setMy_Alert(true);
    } else if (email.trim().length == 0) {
      setalert_sms('Please Enter Email');
      setMy_Alert(true);
    } else if (!Constant.EmailReg.test(email)) {
      setalert_sms('Please Enter Valid Email');
      setMy_Alert(true);
    } else if (String(mobile).trim().length == 0) {
      setalert_sms('Please Enter Phone Number');
      setMy_Alert(true);
    } else if (mobile.trim().length !== 10) {
      setalert_sms('Please Enter Valid Phone Number');
      setMy_Alert(true);
    } else if (String(hotelName).trim().length == 0) {
      setalert_sms('Please Enter Hotel Name');
      setMy_Alert(true);
    } else if (String(addresspickup).trim().length == 0) {
      setalert_sms('Please Enter Pickup Location');
      setMy_Alert(true);
    } else if (String(addressdrop).trim().length == 0) {
      setalert_sms('Please Enter Drop off Location');
      setMy_Alert(true);
    } else return true;
  };

  // moment(orderTime).format('hh:mm:ss'),
  const PostBookingTaxi = async () => {
    if (validation()) {
      setLoading(true);
      try {
        let formdata = new FormData();
        if (Platform.OS == 'ios') {
          formdata.append(
            'booking_date_time',
            moment(selectedDate).format('MM-DD-YYYY') +
              ' ' +
              moment(orderTime).format('HH:mm'),
          );
        } else {
          formdata.append(
            'booking_date_time',
            moment(selectedDate).format('MM-DD-YYYY') + ' ' + orderTime,
          );
        }
        formdata.append('mobile', mobile);
        formdata.append('fullname', fullName);
        formdata.append('email_id', email);
        formdata.append('pickup_location', addresspickup);
        formdata.append('pickup_lat', lat);
        formdata.append('pickup_long', lan);
        formdata.append('drop_location', addressdrop);
        formdata.append('drop_lat', latdrop);
        formdata.append('drop_long', landrop);
        formdata.append('hotel_name', hotelName);
        formdata.append('country_symbol', countrySymbol);
        formdata.append('country_code', countyCode);
        formdata.append(
          'user_id',
          ProfileDetail?.userid != undefined ? ProfileDetail?.userid : '',
        );
        const {responseJson, err} = await requestPostApi(
          booking_taxi,
          formdata,
          'POST',
          '',
        );
        console.log('responseJson and err', responseJson, err);
        setLoading(false);
        if (err == null) {
          if (responseJson.status == true) {
            setpopup(true);
          } else {
            setalert_sms(responseJson.message);
            setMy_Alert(true);
          }
        } else {
          setalert_sms(err);
          setMy_Alert(true);
        }
      } catch (error) {
        console.error('error in api', error);
        setLoading(false);
      }
    }
  };

  const handleDayPress = day => {
    if (!availableDays[day.dateString]) {
      setSelectedDate(day.dateString);
    } else {
      const updatedMarkedDates = {...markedDates};
      delete updatedMarkedDates[day.dateString];
      setMarkedDates(updatedMarkedDates);
    }
  };

  //function : serv func
  const GetCalenderEvents = async () => {
    setLoading(true);
    const {responseJson, err} = await requestGetApi(
      taxi_calendar,
      '',
      'GET',
      user.userid != undefined ? user.token : '',
    );
    setLoading(false);

    if (err == null) {
      if (responseJson.status == true) {
        const notAvailableDatesObj = {};
        responseJson.booked_events.forEach(date => {
          notAvailableDatesObj[date.date] = {
            disabled: true,
            disableTouchEvent: true,
            selectedColor: COLORS.red,
            dotColor: COLORS.red,
            marked: false,
            selected: true,
          };
        });
        setUnavailableDays(notAvailableDatesObj);
        const bookedDatesObj = {};
        responseJson.not_available.forEach(date => {
          bookedDatesObj[date.date] = {
            disabled: true,
            disableTouchEvent: true,
            selectedColor: '#9C9D9F',
            dotColor: '#9C9D9F',
            marked: false,
            selected: true,
          };
        });
        setavailableDays(bookedDatesObj);
      } else {
        setalert_sms(responseJson.message);
        setMy_Alert(true);
      }
    } else {
      setalert_sms(err);
      setMy_Alert(true);
    }
  };

  //hook : useEffect
  useEffect(() => {
    GetCalenderEvents();

    return () => {};
  }, []);
  const StartsearchLocation = async text => {
    setaddresspickup(text);
    let response = await fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=AIzaSyBpDifF6mYV1-eyb-oTBevna68Tmwe1s4w&input=${text}`,
      {method: 'POST'},
    );
    var myresponce = await response.json();
    if (myresponce.predictions.length > 0) {
      setsearchResults(myresponce.predictions);
      setisShowingResults(true);
    } else if (myresponce.predictions.length == 0 || text == '') {
      setisShowingResults(false);
    }
  };
  const onPressaddress = item => {
    setisShowingResults(false);
    setSelectedPickUp(item.description);
    setaddresspickup(item.description);
    addressToLatlong(item.description);
  };

  const addressToLatlong = address => {
    Geocoder.from(address)
      .then(json => {
        var location = json.results[0].geometry.location;
        var latitude = location.lat;
        var longitude = location.lng;
        var destinationLatlon = {latitude: latitude, longitude: longitude};
        setlat(latitude);
        setlan(longitude);
      })
      .catch(error => console.warn(error));
  };

  const StartsearchDropLocation = async text => {
    setaddressDrop(text);
    let response = await fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=AIzaSyBpDifF6mYV1-eyb-oTBevna68Tmwe1s4w&input=${text}`,
      {method: 'POST'},
    );
    var myresponce = await response.json();
    if (myresponce.predictions.length > 0) {
      setsearchDropResults(myresponce.predictions);
      setisShowingDropResults(true);
    } else if (myresponce.predictions.length == 0 || text == '') {
      setisShowingDropResults(false);
    }
  };
  const onPressDropaddress = item => {
    setisShowingDropResults(false);
    setaddressDrop(item.description);
    setSelectedDropOff(item.description);
    addressDropToLatlong(item.description);
  };

  const addressDropToLatlong = address => {
    Geocoder.from(address)
      .then(json => {
        var location = json.results[0].geometry.location;
        var latitude = location.lat;
        var longitude = location.lng;
        var destinationLatlon = {latitude: latitude, longitude: longitude};
        setlatdrop(latitude);
        setlandrop(longitude);
      })
      .catch(error => console.warn(error));
  };

  // function renderDescription(rowData) {
  //   const title = rowData.structured_formatting.main_text;
  //   const address = rowData.structured_formatting.secondary_text;
  //   return (
  //     <View style={{justifyContent: 'center', height: 100}}>
  //       <Text style={{color: 'grey'}}>{title}</Text>
  //       <Text style={{color: 'grey'}}>{address}</Text>
  //     </View>
  //   );
  // }

  //UI
  return (
    <View style={{flex: 1}}>
      <CustomeHeader
        backarrow={true}
        title={'Book Taxi'}
        onBackPress={() => {
          props.navigation.goBack();
        }}
        onNotificationPress={() => {
          props.navigation.navigate('Notification');
        }}
      />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="never"
        showsVerticalScrollIndicator={false}
        extraHeight={150}
        style={{flex: 1}}>
        <View style={{flex: 1, backgroundColor: '#EAEDF7'}}>
          <View
            style={{
              width: '90%',
              marginTop: 10,
              justifyContent: 'center',
              marginHorizontal: 20,
            }}>
            <Calendar
              // onDayPress={day => {
              //   var mydd=selected
              //   mydd.push(day.dateString)
              //   setSelected(mydd)
              // }}
              // markedDates={{
              //   [selected]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}
              // }}
              // markedDates={{
              //   '2023-12-14': {selected: true, selectedColor: 'blue'},
              //   '2023-12-15': {selected: true,selectedColor: 'blue'},
              //   '2023-12-16': {selected: true,  selectedColor: 'blue'}
              // }}
              minDate={new Date()}
              current={new Date()}
              onDayPress={handleDayPress}
              markedDates={{
                ...availableDays,
                ...unavailableDays,
                [selectedDate]: {
                  selected: true,
                  selectedColor: '#3DA1E3',
                  marked: true,
                  dotColor: '#3DA1E3',
                },
              }}
              horizontal={true}
              // Enable paging on horizontal, default = false
              pagingEnabled={true}
              disabledOpacity={0.6}
              theme={{
                backgroundColor: '#ffffff',
                calendarBackground: '#ffffff',
                textSectionTitleColor: '#9C9D9F',
                selectedDayBackgroundColor: '#00adf5',
                selectedDayTextColor: '#ffffff',
                todayTextColor: '#00adf5',
                dayTextColor: '#2d4150',
                textDisabledColor: '#9C9D9F',
              }}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              columnGap: 5,
              width: '90%',
              marginHorizontal: 20,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 15,
                width: '32%',
                backgroundColor: '#fff',
                borderRadius: 30,
                shadowColor: '#000',
                shadowOffset: {width: 1, height: 1},
                shadowOpacity: 0.4,
                shadowRadius: 2,
                elevation: 3,
                padding: 7,
              }}>
              <View
                style={{
                  height: 15,
                  width: 15,
                  backgroundColor: '#9C9D9F',
                  borderRadius: 2,
                  marginLeft: 5,
                }}
              />

              <Text
                style={[styles.uploadTxt, {fontWeight: '600', fontSize: 12}]}>
                {' '}
                Not Available
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 15,
                width: '32%',
                backgroundColor: '#fff',
                borderRadius: 30,
                shadowColor: '#000',
                shadowOffset: {width: 1, height: 1},
                shadowOpacity: 0.4,
                shadowRadius: 2,
                elevation: 3,
                padding: 7,
              }}>
              <View
                style={{
                  height: 15,
                  width: 15,
                  backgroundColor: 'red',
                  borderRadius: 2,
                  marginLeft: 5,
                }}
              />

              <Text
                style={[styles.uploadTxt, {fontWeight: '600', fontSize: 12}]}>
                {' '}
                Taxi Booked
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 15,
                width: '32%',
                backgroundColor: '#fff',
                borderRadius: 30,
                shadowColor: '#000',
                shadowOffset: {width: 1, height: 1},
                shadowOpacity: 0.4,
                shadowRadius: 2,
                elevation: 3,
                padding: 7,
              }}>
              <View
                style={{
                  height: 15,
                  width: 15,
                  backgroundColor: '#00adf5',
                  borderRadius: 2,
                  marginLeft: 5,
                }}
              />

              <Text
                style={[styles.uploadTxt, {fontWeight: '600', fontSize: 12}]}>
                {' '}
                Taxi Booking
              </Text>
            </View>
          </View>

          <View
            style={{
              marginTop: 17,
              width: '90%',
              height: 55,
              marginHorizontal: 20,
              backgroundColor: '#FFFFFF',
              borderRadius: 5,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderColor: '#E0E0E0',
              borderWidth: 1,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowRadius: 1,
              shadowOpacity: 0.1,

              elevation: 3,
            }}>
            <View style={{}}>
              {Platform.OS == 'ios' ? (
                <>
                  <Text
                    style={{
                      fontSize: Constant.textFontSize(14),
                      color: orderTime ? '#000' : COLORS.dark_grey,
                      left: 15,
                    }}>
                    {orderTime
                      ? moment(orderTime).format('LT')
                      : 'Select Time*'}
                  </Text>
                </>
              ) : showdatime ? (
                <View
                  style={{
                    width: '100%',
                    height: 55,
                    justifyContent: 'center',

                    borderColor: 'transparent',
                    zIndex: -999,
                    borderRadius: 5,
                  }}>
                  <DateTimePicker
                    value={new Date()}
                    mode="time"
                    is24Hour={true}
                    placeholder={'Select Time*'}
                    placeholderTextColor={COLORS.Primary_Grey}
                    //   display="default"
                    display="spinner"
                    onChange={(event, stime) => {
                      setshowdatime(false);
                      setOrderTime(
                        moment(event.nativeEvent.timestamp).format('HH:mm:ss'),
                      );
                    }}
                  />
                  <Text
                    style={{
                      fontSize: Constant.textFontSize(14),
                      color: '#000',
                      left: 15,
                    }}>
                    Select Time*
                  </Text>
                </View>
              ) : (
                <TouchableOpacity
                  style={{
                    width: '100%',
                    height: 55,
                    justifyContent: 'center',

                    borderColor: 'transparent',
                    zIndex: -999,
                    borderRadius: 5,
                  }}>
                  <Text
                    style={{
                      fontSize: Constant.textFontSize(14),
                      color: '#000',
                      left: 15,
                    }}
                    onPress={() => {
                      if (Platform.OS != 'android') {
                        setshowdatimeIos(true);
                      } else {
                        setshowdatime(true);
                      }
                    }}>
                    {orderTime != '' ? orderTime.slice(0, 5) : 'Select Time*'}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
            <TouchableOpacity
              onPress={() => {
                if (Platform.OS === 'ios') {
                  setshowdatimeIos(true);
                } else {
                  setshowdatime(true);
                }
              }}
              style={{
                justifyContent: 'center',
                marginRight: 9,
                alignItems: 'center',
              }}>
              <Image
                source={require('../../assets/images/Icons/clock_gray.png')}
                style={{
                  width: 24,
                  height: 24,
                  alignSelf: 'center',
                  tintColor: COLORS.dark_grey,
                }}
              />
            </TouchableOpacity>
          </View>
          <View style={{marginTop: 13}}>
            <CustomTextInput
              onChangeText={txt => {
                setFullName(txt);
              }}
              placeholder={'Full Name*'}
            />
          </View>
          <View style={{marginTop: 13}}>
            <CustomTextInput
              value={email}
              onChangeText={txt => {
                setEmail(txt);
              }}
              placeholder={'Email Address*'}
            />
          </View>
          <View
            style={{
              padding: 20,
            }}>
            <PhoneTextInput
              value={mobile}
              setValue={setMobile}
              countryCode={countyCode}
              setCountryCode={setCountyCode}
              countrySymbol={countrySymbol}
              setCountrySymbol={setCountrySymbol}
              placeholder={'Phone number*'}
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
            }}>
            <View
              style={{
                height: 55,
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: 15,
                // marginTop: 4,
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
                // marginTop: 10,

                // justifyContent:'center',
                // width: '90%',
                // backgroundColor: 'white',
                height: 55,

                borderLeftColor: '#EAEDF7',
                borderLeftWidth: 1,
                // height: 42,
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: 15,
                // marginTop: 4,
              }}>
              <MaskInput
                value={mobile}
                keyboardType="phone-pad"
                placeholder="Phone Number*"
                placeholderTextColor={COLORS.dark_grey}
                style={{
                  color: '#000',
                  fontSize: Constant.textFontSize(14),
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
            </View>
          </View> */}
          <View style={{marginTop: 13}}>
            <CustomTextInput
              onChangeText={txt => {
                setHotelName(txt);
              }}
              placeholder={'Hotel Name*'}
            />
          </View>

          <View style={{marginTop: 13}}>
            {selectedPickUp.trim().length > 0 ? (
              <View
                style={{
                  borderWidth: 0.5,
                  borderColor: COLORS.primary_white,
                  backgroundColor: '#fff',
                  flexDirection: 'row',
                  shadowColor: '#000',
                  shadowOffset: {width: 1, height: 1},
                  shadowOpacity: 0.4,
                  shadowRadius: 2,
                  elevation: 3,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginHorizontal: 20,
                  padding: 10,
                  borderRadius: 10,
                }}>
                <MyText text={selectedPickUp} width={'85%'} />
                <TouchableOpacity
                  style={{justifyContent: 'center', alignItems: 'center'}}
                  onPress={() => {
                    setaddresspickup('');
                    setSelectedPickUp('');
                  }}>
                  <MyIcon.AntDesign
                    name="closecircleo"
                    size={20}
                    color={COLORS.Black}
                  />
                </TouchableOpacity>
              </View>
            ) : (
              <>
                <CustomTextInput
                  inputRef={pickUpSearchRef}
                  onChangeText={text => {
                    StartsearchLocation(text);

                    // setPickUpLoc(txt);
                  }}
                  style={{height: 'auto', paddingVertical: 6}}
                  // editable={addresspickup?.length > 5 ? false : true}
                  // selectTextOnFocus={false}
                  placeholder={'Pickup Location*'}
                />
                <View
                  style={{
                    position: 'absolute',
                    height: heightScale(55),
                    width: 30,
                    right: 20,
                    top: 17,
                  }}>
                  {addresspickup ? (
                    <TouchableOpacity
                      style={{justifyContent: 'center', alignItems: 'center'}}
                      onPress={() => {
                        setaddresspickup('');
                      }}>
                      <MyIcon.AntDesign
                        name="closecircleo"
                        size={20}
                        color={COLORS.Black}
                      />
                    </TouchableOpacity>
                  ) : null}
                </View>
              </>
            )}
          </View>
          {isShowingResults ? (
            <FlatList
              data={searchResults}
              keyExtractor={item => item.id}
              style={styles.searchResultsContainer}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    style={styles.resultItem}
                    onPress={() => {
                      onPressaddress(item);
                      setsearchResults([]);
                      setisShowingResults(false);
                    }}>
                    <Image
                      resizeMode="contain"
                      source={require('../../assets/images/Icons/location.png')}
                      style={{width: 20, height: 20}}></Image>
                    <Text
                      style={{
                        color: '#000',
                        left: 10,
                        fontSize: Constant.textFontSize(14),
                      }}>
                      {item.description}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          ) : null}
          <View style={{marginTop: 13}}>
            {selectedDropOff.trim().length > 0 ? (
              <View
                style={{
                  borderWidth: 0.5,
                  borderColor: COLORS.primary_white,
                  backgroundColor: '#fff',
                  flexDirection: 'row',
                  shadowColor: '#000',
                  shadowOffset: {width: 1, height: 1},
                  shadowOpacity: 0.4,
                  shadowRadius: 2,
                  elevation: 3,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginHorizontal: 20,
                  padding: 10,
                  borderRadius: 10,
                }}>
                <MyText text={selectedDropOff} width={'85%'} />
                <TouchableOpacity
                  style={{justifyContent: 'center', alignItems: 'center'}}
                  onPress={() => {
                    setaddressDrop('');
                    setSelectedDropOff('');
                  }}>
                  <MyIcon.AntDesign
                    name="closecircleo"
                    size={20}
                    color={COLORS.Black}
                  />
                </TouchableOpacity>
              </View>
            ) : (
              <>
                <CustomTextInput
                  value={addressdrop}
                  onChangeText={text => {
                    StartsearchDropLocation(text);
                    // setDropLoc(txt);
                    // setOpenGoogleAddressModal(true)
                  }}
                  style={{height: 'auto', paddingVertical: 6}}
                  editable={addressdrop?.length > 5 ? false : true}
                  placeholder={'Drop off Location*'}
                />
                <View
                  style={{
                    position: 'absolute',
                    height: heightScale(55),
                    width: 30,
                    right: 20,
                    top: 17,
                  }}>
                  {addressdrop ? (
                    <TouchableOpacity
                      style={{justifyContent: 'center', alignItems: 'center'}}
                      onPress={() => {
                        setaddressDrop('');
                      }}>
                      <MyIcon.AntDesign
                        name="closecircleo"
                        size={20}
                        color={COLORS.Black}
                      />
                    </TouchableOpacity>
                  ) : null}
                </View>
              </>
            )}
          </View>
          {isShowingDropResults ? (
            <FlatList
              data={searchDropResults}
              keyExtractor={item => item.id}
              style={styles.searchResultsContainer}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    style={styles.resultItem}
                    onPress={() => {
                      onPressDropaddress(item);
                    }}>
                    <Image
                      resizeMode="contain"
                      source={require('../../assets/images/Icons/location.png')}
                      style={{width: 20, height: 20}}></Image>
                    <Text
                      style={{
                        color: '#000',
                        left: 10,
                        fontSize: Constant.textFontSize(14),
                      }}>
                      {item.description}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          ) : null}
          <CustomButtonRound
            stle={{width: '90%'}}
            txtStyle={{
              color: '#fff',
              fontSize: Constant.textFontSize(14),
              fontWeight: '400',
            }}
            backgroundColor={COLORS.Primary_Blue}
            title={'Next'}
            onPress={() => {
              PostBookingTaxi();
            }}
          />
          <View style={{height: 20}} />
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
                marginTop: 20,
                fontSize: Constant.textFontSize(20),
                fontWeight: '600',
                textAlign: 'center',
              }}>
              Taxi Booking Request Sent Successfully
            </Text>
            <Text
              style={{
                color: '#000',
                alignSelf: 'center',
                marginTop: 10,
                fontSize: Constant.textFontSize(13),
                fontWeight: '400',
              }}>
              We Will Get Back To You…
            </Text>

            <CustomButton
              title={'Close'}
              borderColor={'#83CDFD'}
              onPress={() => {
                props.navigation.goBack();
                setpopup(false);
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
            if (alert_sms == 'Please Enter Valid Phone Number') {
              setMy_Alert(false);
            } else {
              setMy_Alert(false);
              // props.navigation.goBack();
            }
          }}
        />
      ) : null}
      <DatePicker
        modal
        mode="time"
        open={showdatimeIos}
        date={cdate}
        onConfirm={date => {
          setshowdatimeIos(false);
          setCDate(date);
          setOrderTime(date);
        }}
        onCancel={() => {
          setshowdatime(false);
          setshowdatimeIos(false);
        }}
      />
      {loading ? <Loader /> : null}
    </View>
  );
};

export default BookTaxi;

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
  datePickerSelectInput: {
    height: 45,
    width: '100%',
    fontSize: Constant.textFontSize(15),
    borderColor: null,
    //  backgroundColor: '#fff',
    borderRadius: 10,
    color: '#CECECE',
  },
  searchResultsContainer: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    // height: 44,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    // fontSize: 15,
    flex: 1,
  },
  resultItem: {
    width: '96%',
    flexDirection: 'row',
    padding: 10,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderColor: '#c8c7cc',
    borderBottomWidth: 0.5,
  },
  dateIcon: {
    width: 22,
    height: 23,
    // marginRight:20
  },
  dropdownButton: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    height: 50,
    borderRadius: 7,
    width: '90%',
    marginHorizontal: 20,
    backgroundColor: '#fff',
  },
  inputContainer: {
    height: heightScale(130),
    borderRadius: widthScale(5),
    borderWidth: 0.5,
    borderColor: COLORS.primary_white,
    width: '90%',
    backgroundColor: '#ffffff',
    alignSelf: 'center',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 3,
    // justifyContent: 'center',
    // alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  textInput: {
    textAlign: 'left',
    fontSize: Constant.textFontSize(14),
    fontFamily: FONTS.regular,
    marginLeft: 5,
    color: '#1F191C',
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
    fontSize: Constant.textFontSize(11),
    fontWeight: '400',
    lineHeight: 20,
    color: '#1F191C',
  },
  uploadTxt: {
    fontSize: Constant.textFontSize(14),
    lineHeight: 20,
    color: 'black',
    fontWeight: '500',
    marginLeft: 3,
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
});
