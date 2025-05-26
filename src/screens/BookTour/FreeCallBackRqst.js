import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
  Modal,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import CustomHeader from '../../components/CustomeHeader';
import {dimensions} from '../../utility/Mycolors';
import images from '../../global/images';
import COLORS from '../../global/Colors';
import {FONTS} from '../../global/Utils';
import CustomButton from '../../components/CustomButton/CustomButton';
import {useSelector, useDispatch} from 'react-redux';
import {
  Photo_BoothPurchase_Listing,
  free_callback_request,
  home,
  photo_booth_listing,
  requestGetApi,
  requestPostApi,
} from '../../WebApi/Service';
import {Constant} from '../../global';
//import : third party
import FastImage from 'react-native-fast-image';
import DatePicker from 'react-native-date-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';
import Loader from '../../WebApi/Loader';
import MyAlert from '../../components/MyAlert';

const FreeCallBackRqst = props => {
  const user = useSelector(state => state.user.user_details);
  const [My_Alert, setMy_Alert] = useState(false);
  const [alert_sms, setalert_sms] = useState('');
  const [loading, setLoading] = useState(false);
  const [callbackdata, setCallBackdata] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [orderDate, setOrderDate] = useState('');
  const [showda, setshowda] = useState(false);
  const [showdaios, setshowdaios] = useState(false);
  const [date, setDate] = useState(new Date());
  const [markedDates, setMarkedDates] = useState({});
  const data = [
    {
      id: 1,
      image: require('../../assets/images/largeimages/dummydetail.png'),
    },
    {
      id: 2,
    },
    {
      id: 3,
    },
    {
      id: 4,
    },
    {
      id: 5,
    },
  ];

  useEffect(() => {
    GetFreeCallbaclRqst();
  }, []);

  const objToQueryString = obj => {
    const keyValuePairs = [];
    for (const key in obj) {
      keyValuePairs.push(
        encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]),
      );
    }
    return keyValuePairs.length == 0 ? '' : '?' + keyValuePairs.join('&');
  };
  const GetFreeCallbaclRqst = async (sTime, isdate = false) => {
    const date =
      moment(sTime).format('YYYY-MM-DD') != '' && isdate != false
        ? moment(sTime).format('YYYY-MM-DD')
        : '';
    const inputData = {};

    if (date != '' && isdate == true) {
      inputData.date = date;
    }
    const outputString = objToQueryString(inputData);
    setLoading(true);
    const endPoint = free_callback_request + outputString;

    const {responseJson, err} = await requestGetApi(
      endPoint,
      '',
      'GET',
      user.token,
    );
    if (err == null) {
      if (responseJson.status == true) {
        setCallBackdata(responseJson.data);
        setLoading(false);
      } else {
        setLoading(false);
        setalert_sms(responseJson.message);
        setMy_Alert(true);
      }
    } else if (err == null) {
      setLoading(false);
      setalert_sms(err);
      setMy_Alert(true);
    }
  };

  return (
    <View style={{backgroundColor: COLORS.Primary_Blue, flex: 1}}>
      <View style={{backgroundColor: '#EAEDF7', flex: 1}}>
        <CustomHeader
          backarrow={true}
          title={'Free Call Back Requests'}
          onBackPress={() => {
            props.navigation.goBack();
          }}
        />
        <View style={styles.calCantainer}>
          <TouchableOpacity
            onPress={() => {
              if (Platform.OS != 'android') {
                setshowdaios(!showdaios);
              } else {
                setshowda(!showda);
              }
            }}
            style={styles.container}>
            <Text style={styles.dateText}>
              {orderDate ? moment(orderDate).format('LL') : 'MM/DD/YYYY'}
            </Text>
            <TouchableOpacity
              onPress={() => {
                if (Platform.OS != 'android') {
                  setshowdaios(!showdaios);
                } else {
                  setshowda(!showda);
                }
              }}>
              <Image style={styles.calendar} source={images.calendar} />
            </TouchableOpacity>
          </TouchableOpacity>
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
                  // dateRef(sTime);
                  setshowda(false);
                  setOrderDate(sTime);
                  GetFreeCallbaclRqst(sTime, true);
                }}
              />
            </View>
          ) : null}
        </View>
        {callbackdata.length > 0 ? (
          <View style={{justifyContent: 'center', flex: 1, marginTop: 20}}>
            <FlatList
              data={callbackdata}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) => {
                return (
                  <View
                    // onPress={() => {props.navigation.navigate('BookDetails', {
                    //   tourId: item?.tour_id,
                    // });}}
                    style={{
                      alignSelf: 'center',
                      alignItems: 'center',
                      marginBottom: 15,
                      width: '90%',
                      backgroundColor: '#fff',
                      borderRadius: 10,
                      shadowColor: '#000',
                      shadowOffset: {width: 3, height: 0},
                      shadowOpacity: 0.4,
                      shadowRadius: 10,
                      elevation: 3,
                      // padding: 3,
                      paddingBottom: 10,
                    }}>
                    <View
                      style={{
                        alignSelf: 'center',
                        alignItems: 'center',
                        // top: -10,
                        width: '100%',
                      }}>
                      <View
                        style={{
                          width: '100%',
                          height: 200,
                          borderTopLeftRadius: 10,
                          borderTopRightRadius: 10,
                        }}>
                        <FastImage
                          resizeMode="stretch"
                          style={{
                            width: '100%',
                            height: '100%',
                            borderTopLeftRadius: 10,
                            borderTopRightRadius: 10,
                          }}
                          source={{uri: `${item?.images}`}}
                        />
                      </View>

                      <View
                        style={{
                          padding: 5,
                          width: '95%',
                          marginTop: 10,
                          justifyContent: 'center',
                          alignItems: 'flex-start',
                        }}>
                        <Text
                          numberOfLines={2}
                          style={[styles.uploadTxt, {fontWeight: '600'}]}>
                          {item?.tour_name}
                        </Text>
                        {/* <Text numberOfLines={2} style={[styles.forAllTxt, {color: '#8F93A0'}]}>{item?.tour_name}
                      </Text> */}
                        <Text
                          numberOfLines={2}
                          style={[styles.forAllTxt, {color: '#000'}]}>
                          Requested By:{' '}
                          <Text
                            numberOfLines={2}
                            style={[styles.forAllTxt, {color: '#8F93A0'}]}>
                            {item?.name}
                          </Text>
                        </Text>
                        <Text
                          numberOfLines={2}
                          style={[styles.forAllTxt, {color: '#000'}]}>
                          Tour Query:{' '}
                          <Text
                            numberOfLines={2}
                            style={[styles.forAllTxt, {color: '#8F93A0'}]}>
                            {item?.note}
                          </Text>
                        </Text>
                        {/* <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Image
                          style={{width: 12, height: 12, resizeMode: 'stretch'}}
                          source={require('../../assets/images/Icons/clock.png')}></Image>
                        <Text style={[styles.forAllTxt, {color: '#8F93A0'}]}>
                          {' '}
                          Duration: {item?.duration} Hours
                        </Text>
                      </View> */}
                        <View style={{}}>
                          <Text
                            style={[
                              styles.uploadTxt,
                              {
                                fontWeight: '400',
                                fontSize: Constant.textFontSize(14),
                              },
                            ]}>
                            Date:{' '}
                            <Text
                              style={[styles.forAllTxt, {color: '#8F93A0'}]}>
                              {' '}
                              {item?.date}
                            </Text>
                          </Text>
                        </View>
                      </View>
                      <View style={{width: '30%'}}></View>
                    </View>
                    {/* <View
                    style={{
                      //   flexDirection: 'row',
                      justifyContent: 'flex-start',
                      alignItems: 'flex-start',
                      marginTop: 15,
                      width: '95%',
                    }}>
                    <View style={{flexDirection:'row'}}> 
                      <Text
                        style={[
                          styles.uploadTxt,
                          {
                            fontWeight: '400',
                            fontSize: Constant.textFontSize(14),
                            
                          },
                        ]}>
                        Date:
                      </Text>
                      <Text style={[styles.forAllTxt, {color: '#8F93A0'}]}> {item?.date}
                      </Text>
                    </View>
                  </View> */}
                  </View>
                );
              }}
            />
          </View>
        ) : (
          <View
            style={{
              marginTop: 40,
              width: '95%',
              justifyContent: 'center',
              marginHorizontal: 10,
            }}>
            <View style={{height: 200, width: 200, alignSelf: 'center'}}>
              <Image
                resizeMode="stretch"
                source={images.nodatafound}
                style={{height: '100%', width: '100%', alignSelf: 'center'}}
              />
            </View>
            <Text
              style={{
                color: '#000',
                alignSelf: 'center',
                marginTop: 25,
                fontSize: Constant.textFontSize(20),
                fontWeight: '600',
                textAlign: 'center',
              }}>
              No Data Found
            </Text>
          </View>
        )}
      </View>
      <Modal
        transparent={true}
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            margin: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
          <View
            style={{
              height: (dimensions.SCREEN_HEIGHT * 35) / 100,
              width: dimensions.SCREEN_WIDTH,
              backgroundColor: '#FBFBFB',
              position: 'absolute',
              bottom: 0,
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              borderTopColor: COLORS.Primary_Blue,
              borderTopWidth: 2,
            }}>
            <Text
              style={[
                styles.uploadTxt,
                {
                  fontWeight: '600',
                  fontSize: Constant.textFontSize(20),
                  textAlign: 'center',
                  marginTop: 24,
                },
              ]}>
              Cancellation Policy
            </Text>
            <View style={{marginHorizontal: 20}}>
              <Text
                style={[
                  styles.uploadTxt,
                  {
                    fontWeight: '400',
                    marginTop: 20,
                    color: '#1F191C',
                    fontSize: Constant.textFontSize(13),
                    textAlign: 'center',
                  },
                ]}>
                Customers will receive a full refund or credit with 24 hours
                notice of cancellation. Customers will also receive a full
                refund or credit in case of operator cancellation due to weather
                or other unforeseen circumstances. Contact us by phone to cancel
                or inquire about a cancellation. No- shows will be charged the
                full price.
              </Text>
            </View>

            <CustomButton
              borderColor={'#83CDFD'}
              txtStyle={{
                color: '#fff',
                fontSize: Constant.textFontSize(16),
                fontWeight: '400',
              }}
              backgroundColor={COLORS.Primary_Blue}
              title={'Close'}
              onPress={() => {
                setModalVisible(false);
              }}
            />
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
      <DatePicker
        modal
        mode="date"
        open={showdaios}
        date={date}
        onConfirm={date => {
          // setshowda(false);
          setshowdaios(false);
          setDate(date);
          setOrderDate(date);
          GetFreeCallbaclRqst(date, true);
        }}
        onCancel={() => {
          setshowdaios(false);
          setshowda(false);
        }}
      />
    </View>
  );
};

export default FreeCallBackRqst;

const styles = StyleSheet.create({
  cardContainer: {
    marginTop: 20,
  },
  imageContainer: {
    height: (Dimensions.get('screen').width * 25) / 100,
    width: (Dimensions.get('screen').width * 70) / 100,
  },
  calCantainer: {
    marginTop: -50,
    flexDirection: 'row',
    alignItems: 'center',
    width: '93%',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  container: {
    height: 50,
    width: '95%',
    marginHorizontal: 10,
    backgroundColor: '#FFFFFF',
    //   flex: 1,
    marginTop: 70,
    marginLeft: 10,
    borderRadius: 6,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  dateText: {
    padding: 10,
    color: COLORS.dark_grey,
    fontSize: Constant.textFontSize(14),
    fontWeight: '400',
    fontFamily: FONTS.regular,
  },
  calendar: {
    marginRight: 10,
    height: 30,
    width: 30,
    tintColor: COLORS.dark_grey,
  },
  scontainer: {
    height: 40,
    width: 100,
    backgroundColor: '#ffffff',
    marginTop: 70,
    marginLeft: 10,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookingIdContainer: {
    width: '95%',
    flexDirection: 'row',
    // marginLeft: 20,
    marginTop: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bookingIdTxt: {
    fontSize: Constant.textFontSize(14),
    fontWeight: '400',
    fontFamily: FONTS.regular,
    color: '#505667',
  },
  bookingIdN: {
    color: '#CECECE',
    fontSize: Constant.textFontSize(14),
    fontWeight: '400',
    fontFamily: FONTS.regular,
  },
  line: {
    height: 1,
    backgroundColor: '#E7EAF1',
    marginTop: 10,
    width: '100%',
    // padding:20
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
    fontSize: Constant.textFontSize(14),
    fontWeight: '400',
    lineHeight: 25,
    color: '#1F191C',
  },
  uploadTxt: {
    fontSize: Constant.textFontSize(16),
    fontWeight: '700',
    lineHeight: 20,
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
});
