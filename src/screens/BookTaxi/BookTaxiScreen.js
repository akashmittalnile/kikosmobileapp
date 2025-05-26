import React, {useState, useEffect} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  RefreshControl,
  View,
  Platform,
  Linking,
} from 'react-native';
import HomeHeaderComponent from '../../components/HomeHeaderComponent';
import {Mycolors, dimensions} from '../../utility/Mycolors';
import {FONTS} from '../../global/Utils';
import images from '../../global/images';
import COLORS from '../../global/Colors';
import Loader from '../../WebApi/Loader';
import MyAlert from '../../components/MyAlert';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import CustomButton from '../../components/CustomButton/CustomButton';
import {
  get_tax_booking_list,
  get_virtual_tour,
  requestGetApi,
  requestPostApi,
  tour_details,
} from '../../WebApi/Service';
import {useSelector, useDispatch} from 'react-redux';
//import : third parties
import DatePicker from 'react-native-date-picker';
import {Constant} from '../../global';
import {useNavigation} from '@react-navigation/native';

const BookTaxiScreen = props => {
  //variables
  const navigation = useNavigation();
  const user = useSelector(state => state.user.user_details);
  //hook : states
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [My_Alert, setMy_Alert] = useState(false);
  const [alert_sms, setalert_sms] = useState('');
  const [loading, setLoading] = useState(false);
  const [datalist, setDataList] = useState([]);
  const [orderDate, setOrderDate] = useState('');
  const [showda, setshowda] = useState(false);
  const [showdaios, setshowdaios] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      getBookTaxi();
    });
    return unsubscribe;
  }, []);
  //function : imp func
  const onRefresh = async () => {
    setRefreshing(true);
    await getBookTaxi();
    setRefreshing(false);
  };
  const objToQueryString = obj => {
    const keyValuePairs = [];
    for (const key in obj) {
      keyValuePairs.push(
        encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]),
      );
    }
    return keyValuePairs.length == 0 ? '' : '?' + keyValuePairs.join('&');
  };

  const getBookTaxi = async (sTime, isdate = false) => {
    const date =
      moment(sTime).format('L') != '' && isdate != false
        ? moment(sTime).format('L')
        : '';
    const inputData = {};

    if (date != '' && isdate == true) {
      inputData.date = date;
    }
    const outputString = objToQueryString(inputData);
    setLoading(true);
    const endPoint = get_tax_booking_list + outputString;

    const {responseJson, err} = await requestGetApi(
      endPoint,
      '',
      'GET',
      user.userid != undefined ? user.token : '',
    );
    setLoading(false);
    if (err == null) {
      if (responseJson.status == true) {
        setDataList(responseJson.data);
      } else {
        setalert_sms(responseJson.message);
        setMy_Alert(true);
      }
    } else if (err == null) {
      setalert_sms(err);
      setMy_Alert(true);
    }
  };

  const dialCall = num => {
    let phoneNumber = '';

    if (Platform.OS === 'android') {
      phoneNumber = 'tel:' + '+1' + num;
    } else {
      phoneNumber = 'tel:' + '+1' + num;
      // phoneNumber = 'telprompt:${' + num + '}';
    }
    Linking.openURL(phoneNumber);
  };
  return (
    <View style={{backgroundColor: COLORS.White, flex: 1}}>
      <HomeHeaderComponent
        icon1={require('../../assets/images/Icons/firstline2.png')}
        press1={() => {
          props.navigation.openDrawer();
        }}
        press2={() => {
          props.navigation.navigate('Notification');
        }}
      />
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: dimensions.SCREEN_WIDTH * 1,
          // marginTop:-40,flex:1
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: dimensions.SCREEN_WIDTH * 1,
            marginTop: datalist?.length > 0 ? 60 : -80,
          }}>
          <View style={[styles.calCantainer, {marginTop: -50}]}>
            <TouchableOpacity
              onPress={() => {
                if (Platform.OS != 'android') {
                  setshowdaios(true);
                } else {
                  setshowda(true);
                }
              }}
              style={styles.container}>
              <Text style={styles.dateText}>
                {orderDate
                  ? moment(orderDate).format('LL')
                  : 'Search Book Date'}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  if (Platform.OS != 'android') {
                    setshowdaios(true);
                  } else {
                    setshowda(true);
                  }
                }}
                style={{}}>
                <Image
                  resizeMode="contain"
                  style={styles.calendar}
                  source={images.calendar}
                />
              </TouchableOpacity>
            </TouchableOpacity>
            {/* <TouchableOpacity
              onPress={() => {
                if (Platform.OS != 'android') {
                  setshowdaios(true);
                } else {
                  setshowda(true);
                }
              }}
              style={styles.scontainer}>
              <Image
                source={images.fillter}
                style={{
                  height: Constant.textFontSize(24),
                  width: Constant.textFontSize(24),
                }}
              />
            </TouchableOpacity> */}
          </View>

          <View style={{}}>
            {Platform.OS == 'ios' ? (
              <></>
            ) : showda ? (
              <View>
                <DateTimePicker
                  value={new Date()}
                  mode="date"
                  // is24Hour={true}
                  display="spinner"
                  dateFormat="YYYY-MM-DD"
                  // minimumDate={orderendDate != "" ? new Date(moment(orderendDate).format("YYYY-MM-DD")) : new Date() }
                  // maximumDate={new Date()}
                  onChange={(event, sTime) => {
                    setshowda(false);
                    setOrderDate(sTime);
                    getBookTaxi(sTime, true);
                  }}
                />
              </View>
            ) : null}
          </View>
          <View style={styles.btncontainer}>
            <Text style={styles.txt}>Taxi Booking Requests</Text>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                props.navigation.navigate('BookTaxi');
              }}>
              <View
                style={{
                  width: 50,
                  // alignSelf: 'center',
                  alignItems: 'center',
                  height: 50,
                  borderRadius: 50 / 2,
                  justifyContent: 'center',
                  borderWidth: 1,
                  borderColor: 'rgba(228, 228, 228, 1)',
                }}>
                <Text style={styles.btnTxt}>Book Taxi</Text>
              </View>
            </TouchableOpacity>
          </View>
          {datalist.length > 0 ? (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 10,
                marginBottom: 300,
              }}>
              <FlatList
                showsHorizontalScrollIndicator={false}
                data={datalist}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}) => {
                  return (
                    <>
                      <View style={styles.cardConainer}>
                        <View style={styles.btnContainer1}>
                          <View style={styles.imgContainer}>
                            <Image
                              style={styles.img}
                              source={
                                item?.user_profile != ''
                                  ? {uri: `${item?.user_profile}`}
                                  : require('../../assets/images/largeimages/dummy_profile.png')
                              }
                            />
                          </View>
                          <Text numberOfLines={1} style={styles.titleTxt}>
                            {item?.user_name}
                          </Text>
                          <TouchableOpacity
                            style={styles.callContainer}
                            onPress={() => {
                              dialCall('(808)206-2205');
                            }}>
                            <Image source={images.callicon} />
                          </TouchableOpacity>
                        </View>

                        <View style={styles.line}></View>
                        <View style={styles.locationContainer}>
                          <View
                            style={{
                              flexDirection: 'row',
                              width: '100%',
                              gap: 7,
                            }}>
                            <Image source={images.location} />

                            <Text style={styles.pickuplocationTxt}>
                              Pickup Location
                            </Text>
                          </View>
                          <View
                            style={{
                              width: '95%',
                              justifyContent: 'center',
                              alignItems: 'flex-start',
                              marginLeft: 40,
                            }}>
                            <Text style={styles.location}>
                              {item?.pickup_location}
                            </Text>
                          </View>
                        </View>
                        <View style={styles.locationContainer}>
                          <View
                            style={{
                              flexDirection: 'row',
                              width: '100%',
                              gap: 7,
                            }}>
                            <Image
                              style={{tintColor: '#3DA1E3'}}
                              source={images.location}
                            />
                            <Text style={styles.dropoffLocation}>
                              Drop Off Location
                            </Text>
                          </View>

                          <View
                            style={{
                              width: '95%',
                              justifyContent: 'center',
                              alignItems: 'flex-start',
                              marginLeft: 40,
                            }}>
                            <Text style={styles.location}>
                              {item?.drop_location}
                            </Text>
                          </View>
                        </View>
                        <View style={styles.hotelTxtContainer}>
                          <View style={{width: '40%'}}>
                            <Text style={styles.hotelTxt}>Hotel</Text>
                            <Text numberOfLines={2} style={styles.hotelName}>
                              {item?.hotel_name}
                            </Text>
                          </View>
                          <View style={{width: '60%', alignItems: 'flex-end'}}>
                            <Text style={styles.hotelTxt}>Date & Time</Text>
                            <Text numberOfLines={2} style={styles.hotelName}>
                              {item?.booking_time}
                            </Text>
                          </View>
                        </View>
                        <View style={[styles.line, {marginTop: 18}]}></View>
                        <View style={styles.bookingIdContainer}>
                          <Text style={styles.bookingIdTxt}>Booking ID:</Text>
                          <Text style={styles.bookingIdN}>
                            {item?.booking_id}
                          </Text>
                          {/* <Image
                            resizeMode="contain"
                            source={images.document}
                            style={{marginLeft: 7}}
                          /> */}
                        </View>
                      </View>
                    </>
                  );
                }}
              />
            </View>
          ) : (
            <>
              <View style={{marginTop: 40}}>
                <View style={{height: 350, width: 350, alignSelf: 'center'}}>
                  <Image
                    resizeMode="stretch"
                    source={require('../../assets/images/largeimages/taxi.png')}
                    style={{
                      height: '100%',
                      width: '100%',
                      alignSelf: 'center',
                    }}
                  />
                </View>
                <Text
                  style={{
                    color: '#000000',
                    alignSelf: 'center',
                    marginTop: 45,
                    fontSize: Constant.textFontSize(20),
                    fontWeight: '600',
                    textAlign: 'center',
                  }}>
                  No data found
                </Text>
              </View>
            </>
          )}
        </View>
      </View>
      <DatePicker
        modal
        mode="date"
        open={showdaios}
        date={date}
        onConfirm={date => {
          setshowdaios(false);
          setDate(date);
          setOrderDate(date);
          getBookTaxi(date, true);
        }}
        onCancel={() => {
          setshowda(false);
          setshowdaios(false);
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

export default BookTaxiScreen;

const styles = StyleSheet.create({
  calCantainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    width: '89%',
    alignItems: 'center',
    justifyContent: 'center',
    // marginHorizontal:20
  },
  container: {
    height: 55,
    backgroundColor: '#FFFFFF',
    flex: 1,
    marginTop: 70,
    // marginLeft: 10,
    borderRadius: 6,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  scontainer: {
    height: 55,
    width: 55,
    backgroundColor: '#3DA1E3',
    marginTop: 70,
    marginLeft: 10,
    borderRadius: 55 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  dateText: {
    padding: 10,
    color: COLORS.dark_grey,
    fontSize: Constant.textFontSize(12),
    fontWeight: 'bold',
    fontFamily: FONTS.regular,
  },
  calendar: {
    marginRight: 10,
    height: 30,
    width: 30,
    tintColor: COLORS.dark_grey,
  },
  btncontainer: {
    width: '89%',
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: '#EAEDF7',
    height: 60,
    marginTop: 20,
    justifyContent: 'space-between',
    // padding: 10,
    // flex:1
  },

  txt: {
    fontSize: Constant.textFontSize(15),
    fontWeight: '600',
    color: '#000000',
    // fontFamily: FONTS.regular,
    // marginLeft: 12,
    lineHeight: 20,
  },
  btn: {
    height: 60,
    width: 60,
    backgroundColor: '#3DA1E3',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 60 / 2,
    borderWidth: 5,
    borderColor: '#83CDFD',
  },
  btnTxt: {
    fontSize: Constant.textFontSize(11),
    fontWeight: '400',
    color: '#fff',
    textAlign: 'center',
    fontFamily: FONTS.alloyInk,
  },
  cardConainer: {
    flex: 1,
    // height: 285,
    width: dimensions.SCREEN_WIDTH * 0.89,
    marginHorizontal: 10,
    backgroundColor: '#FFFFFF',
    marginTop: 1,
    justifyContent: 'center',
    // alignItems:'center',
    borderRadius: 10,
    elevation: 3,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
  },
  btnContainer1: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
  },
  imgContainer: {
    height: 40,
    width: 40,
    borderRadius: 99,
    marginTop: 2,
  },
  img: {
    height: 37,
    width: 37,
    borderRadius: 100,
    resizeMode: 'contain',
  },
  callContainer: {
    height: Constant.textFontSize(30),
    width: Constant.textFontSize(30),
    backgroundColor: '#3DA1E3',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleTxt: {
    flex: 1,
    marginLeft: 5,
    fontSize: Constant.textFontSize(14),
    fontWeight: '500',
    lineHeight: 20,
    color: '#000',
    fontFamily: FONTS.regular,
  },
  line: {
    height: 0.3,
    backgroundColor: '#000',
    marginTop: 10,
  },
  locationContainer: {
    width: '90%',

    // flexDirection: 'row',
    marginLeft: 15,
    marginTop: 10,
    alignItems: 'center',
    gap: 5,
  },
  pickuplocationTxt: {
    fontSize: Constant.textFontSize(14),
    fontWeight: '800',
    fontFamily: FONTS.regular,
    color: '#000',
  },
  location: {
    fontSize: Constant.textFontSize(13),
    fontWeight: '400',
    color: COLORS.dark_grey,
    fontFamily: FONTS.regular,
  },
  dropoffLocation: {
    fontSize: Constant.textFontSize(13),
    fontWeight: '800',
    fontFamily: FONTS.regular,
    color: '#3DA1E3',
  },
  hotelTxtContainer: {
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 10,
    marginTop: 20,
    justifyContent: 'space-between',
    width: '100%',
  },
  hotelTxt: {
    fontSize: Constant.textFontSize(14),
    fontWeight: '800',
    fontFamily: FONTS.regular,
    color: '#1F191C',
  },
  hotelName: {
    fontSize: Constant.textFontSize(13),
    fontWeight: '400',
    fontFamily: FONTS.regular,
    color: COLORS.dark_grey,
  },
  bookingIdContainer: {
    flexDirection: 'row',
    marginLeft: 20,
    marginTop: 10,
    alignItems: 'center',
    marginBottom: 18,
  },
  bookingIdTxt: {
    fontSize: Constant.textFontSize(14),
    fontWeight: '800',
    fontFamily: FONTS.regular,
    color: '#505667',
  },
  bookingIdN: {
    color: COLORS.dark_grey,
    fontSize: Constant.textFontSize(14),
    fontWeight: '400',
    fontFamily: FONTS.regular,
  },
});
