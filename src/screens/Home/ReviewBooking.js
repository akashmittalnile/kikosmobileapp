import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Modal,
} from 'react-native';
import React, {useState, useEffect, useCallback, useMemo, useRef} from 'react';
import CustomHeader from '../../components/CustomeHeader';
import {dimensions} from '../../utility/Mycolors';
import images from '../../global/images';
import COLORS from '../../global/Colors';
import AntDesign from 'react-native-vector-icons';
import CustomButton from '../../components/CustomButton/CustomButton';
import CustomButtonRound from '../../components/CustomButton/CustomButtonRound';
import {ScrollView} from 'react-native-gesture-handler';
import {
  booking_tour,
  callback_request,
  requestPostApi,
  tour_details,
} from '../../WebApi/Service';
import {useSelector, useDispatch} from 'react-redux';
import Loader from '../../WebApi/Loader';
import MyAlert from '../../components/MyAlert';
import moment from 'moment';
import {Constant} from '../../global';
import MyText from '../../MyText/MyText';
import {FONTS, heightScale, widthScale} from '../../global/Utils';
import FastImage from 'react-native-fast-image';

const ReviewBooking = props => {
  const user = useSelector(state => state.user.user_details);
  const [My_Alert, setMy_Alert] = useState(false);
  const [alert_sms, setalert_sms] = useState('');
  const [loading, setLoading] = useState(false);
  const [popup, setpopup] = useState(false);
  const [tourdetails, setTourDetail] = useState(props?.route?.params?.TourData);
  const [selectedDate, setSelectedDate] = useState('');
  const [totaladultamount, setTotaladultamount] = useState(
    props?.route?.params?.TourData?.same_for_all != null
      ? props?.route?.params?.TourData?.same_for_all
      : props?.route?.params?.TourData?.age_11_price,
  );
  const [totalSeniorAmount, setTotalSeniorAmount] = useState(
    props?.route?.params?.TourData?.same_for_all != null
      ? props?.route?.params?.TourData?.same_for_all
      : props?.route?.params?.TourData?.age_60_price,
  );
  const [totalKidsAmount, setTotalKidsAmount] = useState(
    props?.route?.params?.TourData?.same_for_all != null
      ? props?.route?.params?.TourData?.same_for_all
      : props?.route?.params?.TourData?.under_10_age_price,
  );
  const [counter, setcounter] = useState(props?.route?.params?.counter);
  const [counter1, setcounter1] = useState(props?.route?.params?.counter1);
  const [counter2, setcounter2] = useState(props?.route?.params?.counter2);
  const [pickuptext, setPickUpText] = useState(
    props?.route?.params?.pickuptext,
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDates, setSelectedDates] = useState({});
  const [markedDates, setMarkedDates] = useState({});
  const data = [
    {
      id: 1,
      image: require('../../assets/images/largeimages/dummydetail.png'),
    },
    {
      id: 1,
      image: require('../../assets/images/largeimages/dummydetail.png'),
    },
    {
      id: 1,
      image: require('../../assets/images/largeimages/dummydetail.png'),
    },
  ];

  useEffect(() => {
    setSelectedDate(props?.route?.params?.selectedDate);

    // setTotaladultamount(props?.route?.params?.TourData?.age_11_price)
    // PostRqstFreeCallback(props?.route?.params?.TourData?.id);
  }, []);
  const TotalBillAmount = () => {
    let a = totaladultamount;
    let aa = counter;
    let b = totalSeniorAmount;
    let bb = counter1;
    let c = totalKidsAmount;
    let cc = counter2;
    const amt = a * aa + b * bb + c * cc;
    return amt;
  };
  const TotalBillwithTax = () => {
    let a = totaladultamount;
    let aa = counter;
    let b = totalSeniorAmount;
    let bb = counter1;
    let c = totalKidsAmount;
    let cc = counter2;
    let tax = tourdetails?.tax;
    const amountbooking = a * aa + b * bb + c * cc;
    const amt = ((a * aa + b * bb + c * cc) * tax) / 100;
    // const totalamttax =  amountbooking + amt;
    return amt;
  };
  const TotalBillAmountwithTax = () => {
    let a = totaladultamount;
    let aa = counter;
    let b = totalSeniorAmount;
    let bb = counter1;
    let c = totalKidsAmount;
    let cc = counter2;
    let tax = tourdetails?.tax;
    const amountbooking = a * aa + b * bb + c * cc;
    const amt = ((a * aa + b * bb + c * cc) * tax) / 100;
    const totalamttax = amountbooking + amt;
    return totalamttax;
  };

  // const BookTourApi = async id => {
  //   setLoading(true);
  //   let formdata = new FormData();
  //   formdata.append('tour_id', id);
  //   formdata.append('tour_type', '1'); /*1-Normal Tour, 2:Virtual tour */
  //   formdata.append('booking_date', selectedDate);
  //   formdata.append('no_adults', counter);
  //   formdata.append('no_senior_citizen', counter1);
  //   formdata.append('no_childerns', counter2);
  //   formdata.append('adults_amount', totaladultamount);
  //   formdata.append('senior_amount', totalSeniorAmount);
  //   formdata.append('childrens_amount', totalKidsAmount);
  //   const {responseJson, err} = await requestPostApi(
  //     booking_tour,
  //     formdata,
  //     'POST',
  //     user.token,
  //   );
  //   setLoading(false);
  //   if (err == null) {
  //     if (responseJson.status == true) {
  //       setpopup(true);
  //     } else {
  //       setalert_sms(responseJson.message);
  //       setMy_Alert(true);
  //     }
  //   } else {
  //     setalert_sms(err);
  //     setMy_Alert(true);
  //   }
  // };

  return (
    <View style={{flex: 1}}>
      <ScrollView>
        <CustomHeader
          backarrow={true}
          title={'Review Booking'}
          onBackPress={() => {
            props.navigation.goBack();
          }}
        />

        <Text
          style={[
            styles.uploadTxt,
            {fontWeight: '600', marginLeft: '5%', marginTop: 10},
          ]}>
          You’re Booking for!
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

          <View style={{marginLeft: 10, width: '80%'}}>
            <View style={{width: '85%'}}>
              <Text
                numberOfLines={2}
                style={[styles.uploadTxt, {fontWeight: '700'}]}>
                {tourdetails?.title}
              </Text>
            </View>
            <View style={{width: '80%'}}>
              <Text
                numberOfLines={2}
                style={[
                  styles.forAllTxt,
                  {color: COLORS.dark_grey, marginVertical: 5},
                ]}>
                {tourdetails?.name}
              </Text>
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
              <Text style={[styles.forAllTxt, {color: COLORS.dark_grey}]}>
                {' '}
                Duration {tourdetails?.duration} Hours
              </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                style={styles.imgStyle}
                source={require('../../assets/images/Icons/clock.png')}></Image>
              <Text style={[styles.forAllTxt, {color: COLORS.dark_grey}]}>
                {' '}
                {moment(selectedDate).format('LL')}
              </Text>
            </View>
          </View>
          <View style={{position: 'absolute', right: 10}}>
            <Image
              style={{width: 25, height: 25, resizeMode: 'stretch'}}
              source={require('../../assets/images/Icons/green-tick-circle.png')}
            />
          </View>
        </View>
        <Text
          style={[
            styles.uploadTxt,
            {fontWeight: '500', marginLeft: '5%', marginTop: 10},
          ]}>
          Pickup Location
        </Text>
        <View
          style={{
            marginTop: 10,
            height: heightScale(55),
            borderRadius: widthScale(5),
            borderWidth: 0.5,
            borderColor: COLORS.primary_white,
            width: '90%',
            backgroundColor: '#fff',
            alignSelf: 'center',
            flexDirection: 'row',
            shadowColor: '#000',
            shadowOffset: {width: 1, height: 1},
            shadowOpacity: 0.4,
            shadowRadius: 2,
            elevation: 3,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 10,
          }}>
          <Text
            style={{
              flex: 1,
              fontSize: Constant.textFontSize(13),
              fontFamily: FONTS.regular,
              marginLeft: 5,
              marginRight: 15,
              color: COLORS.Black,
            }}>
            {pickuptext}
          </Text>
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
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: '50%',
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
          <View style={{width: '30%'}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                style={{
                  width: Constant.textFontSize(16),
                  height: Constant.textFontSize(16),
                  resizeMode: 'stretch',
                }}
                source={require('../../assets/images/Icons/green_3-people.png')}></Image>
              <MyText text={counter} marginLeft={5} />
            </View>
          </View>

          <View style={{width: '30%'}}>
            <Text
              style={[
                styles.forAllTxt,
                {
                  color: COLORS.Primary_Blue,
                  fontWeight: '700',
                  fontSize: Constant.textFontSize(13),
                },
              ]}>
              ${totaladultamount * counter}
            </Text>
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
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: '50%',
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
              <Text style={[styles.forAllTxt, {color: '#8F93A0'}]}>
                Ages 60+
              </Text>
            </View>
          </View>
          <View style={{width: '30%'}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                style={{
                  width: Constant.textFontSize(16),
                  height: Constant.textFontSize(16),
                  resizeMode: 'stretch',
                }}
                source={require('../../assets/images/Icons/green_3-people.png')}></Image>
              <MyText text={counter1} marginLeft={5} />
            </View>
          </View>
          <View style={{width: '30%'}}>
            <Text
              style={[
                styles.forAllTxt,
                {
                  color: COLORS.Primary_Blue,
                  fontWeight: '700',
                  fontSize: Constant.textFontSize(13),
                },
              ]}>
              ${totalSeniorAmount * counter1}
            </Text>
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
            marginBottom: 5,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: '50%',
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
              <Text style={[styles.uploadTxt, {fontWeight: '600'}]}>Kids</Text>
              <Text style={[styles.forAllTxt, {color: '#8F93A0'}]}>
                Ages 10 & under
              </Text>
            </View>
          </View>
          <View style={{width: '30%'}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                style={{
                  width: Constant.textFontSize(16),
                  height: Constant.textFontSize(16),
                  resizeMode: 'stretch',
                }}
                source={require('../../assets/images/Icons/green_3-people.png')}></Image>
              <MyText text={counter2} marginLeft={5} />
            </View>
          </View>
          <View style={{width: '30%'}}>
            <Text
              style={[
                styles.forAllTxt,
                {
                  color: COLORS.Primary_Blue,
                  fontWeight: '700',
                  fontSize: Constant.textFontSize(13),
                },
              ]}>
              ${totalKidsAmount * counter2}
            </Text>
          </View>
        </View>
        <View style={styles.summaryContainer}>
          <View style={[styles.row, {marginBottom: 10}]}>
            <MyText
              text={`Subtotal`}
              fontSize={Constant.textFontSize(14)}
              fontFamily={FONTS.regular}
              textColor={'#455A64'}
              style={{}}
            />
            <MyText
              // text={`$${Number(cartListData?.sub_total).toFixed(2)}`}
              text={`${'$' + TotalBillAmount()}`}
              fontSize={Constant.textFontSize(14)}
              fontFamily={FONTS.regular}
              textColor={'#455A64'}
              fontWeight={'700'}
              style={{}}
            />
          </View>
          {/* <View style={[styles.row, { marginBottom: 10 }]}>
                    <MyText
                      text={`Discount`}
                      fontSize={Constant.textFontSize(14)}
                      fontFamily={FONTS.regular}
                      textColor={'#8F93A0'}
                      style={{}}
                    />
                    <MyText
                      text={`$${Number(cartListData?.discount).toFixed(2)}`}
                      // text={(cartListData?.data?.couponPrice > 0 ? `-$${Number(cartListData?.data?.couponPrice)?.toFixed(2)}` : '$' + 0)}
                      fontSize={Constant.textFontSize(14)}
                    fontFamily={FONTS.regular}
                      textColor={'#8F93A0'}
                      style={{}}
                    />
                  </View> */}
          {/* <View style={[styles.row, { marginBottom: 10 }]}>
                    <MyText
                      text={`Shipping Cost`}
                      fontSize={Constant.textFontSize(14)}
                      fontFamily={FONTS.regular}
                      textColor={'#8F93A0'}
                      style={{}}
                    />
                    <MyText
                      text={'$' + (cartListData?.shipping_cost || 0)}
                      fontSize={Constant.textFontSize(14)}
                      fontFamily={FONTS.regular}
                      textColor={'#8F93A0'}
                      style={{}}
                    />
                  </View> */}
          {/* <View style={[styles.row, {marginBottom: 10}]}>
            <MyText
              text={`Tax`}
              fontSize={Constant.textFontSize(14)}
              fontFamily={FONTS.regular}
              textColor={'#8F93A0'}
              style={{}}
            />
            <MyText
              text={`${Number(tourdetails?.tax)}%`}
              // text={cartListData?.data?.tax ? ('$' + Number(cartListData?.data?.tax)?.toFixed(2)) : ('$' + 0)}
              fontSize={Constant.textFontSize(14)}
              fontFamily={FONTS.regular}
              textColor={'#8F93A0'}
              fontWeight={'700'}
              style={{}}
            />
          </View> */}
          <View style={[styles.row, {marginBottom: 19}]}>
            <MyText
              text={`Tax Amount`}
              fontSize={Constant.textFontSize(14)}
              fontFamily={FONTS.regular}
              textColor={'#8F93A0'}
              style={{}}
            />
            <MyText
              text={`+$${Number(TotalBillwithTax().toFixed(2))}`}
              // text={cartListData?.data?.tax ? ('$' + Number(cartListData?.data?.tax)?.toFixed(2)) : ('$' + 0)}
              fontSize={Constant.textFontSize(14)}
              fontFamily={FONTS.regular}
              textColor={'#8F93A0'}
              fontWeight={'700'}
              style={{}}
            />
          </View>
          {/* <View style={[styles.row, { marginBottom: 19 }]}>
                    <MyText
                      text={`Shipping`}
                      fontSize={Constant.textFontSize(14)}
                     fontFamily={FONTS.regular}
                      textColor={'#455A64'}
                      style={{}}
                    />
                    <MyText
                      text={`$${Number(cartListData?.shipping).toFixed(2)}`}
                      fontSize={Constant.textFontSize(14)}
                      fontFamily={FONTS.regular}
                      textColor={'#455A64'}
                      style={{}}
                    />
                  </View> */}
          <View style={{borderColor: '#E0E0E0', borderBottomWidth: 1}} />
          {/* <Divider style={{ borderColor: '#E0E0E0' }} /> */}
          <View style={[styles.row, {marginTop: 14}]}>
            <MyText
              text={`Total`}
              fontSize={Constant.textFontSize(16)}
              fontFamily={FONTS.regular}
              textColor={'#455A64'}
              style={{}}
            />
            <MyText
              text={`$${Number(TotalBillAmountwithTax().toFixed(2))}`}
              // text={cartListData?.data?.totalPrice ? ('$' + Number(cartListData?.data?.totalPrice)?.toFixed(2)) : ('$' + 0)}
              fontSize={Constant.textFontSize(16)}
              fontFamily={FONTS.regular}
              textColor={COLORS.Primary_Blue}
              fontWeight={'700'}
              style={{}}
            />
          </View>
        </View>

        <CustomButtonRound
          stle={{width: '90%'}}
          txtStyle={{
            color: '#fff',
            fontSize: Constant.textFontSize(16),
            fontWeight: '700',
          }}
          backgroundColor={COLORS.Primary_Blue}
          title={'Pay $' + `${Number(TotalBillAmountwithTax().toFixed(2))}`}
          onPress={() => {
            // setpopup(true)
            props.navigation.navigate('PurchaseReview', {
              type: 'reviewbooking',
              amount: Number(TotalBillAmountwithTax().toFixed(2)),
              tax: TotalBillwithTax(),
              TourData: props?.route?.params?.TourData,
              bookid: props?.route?.params?.TourData?.id,
              selectdate: selectedDate,
              no_adult: props?.route?.params?.counter,
              no_senior_citizen: props?.route?.params?.counter1,
              no_childerns: props?.route?.params?.counter2,
              adults_amount: totaladultamount,
              senior_amount: totalSeniorAmount,
              childrens_amount: totalKidsAmount,
              pickuptext: props?.route?.params?.pickuptext,
            });
            // BookTourApi(props?.route?.params?.TourData?.id);
          }}
        />
        <CustomButtonRound
          stle={{width: '90%'}}
          txtStyle={{
            color: '#000',
            fontSize: Constant.textFontSize(14),
            fontWeight: '400',
          }}
          backgroundColor={'#FFF'}
          title={'Cancellation Policy'}
          onPress={() => {
            setModalVisible(true);
          }}
        />
        <View style={{height: 20}} />
      </ScrollView>

      {popup ? (
        <View
          style={{
            position: 'absolute',
            width: '100%',
            height: dimensions.SCREEN_HEIGHT,
            backgroundColor: COLORS.Black,
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
            <View
              style={{
                width: '80%',
                justifyContent: 'center',
                alignItems: 'center',
                marginHorizontal: 40,
              }}>
              <Text
                numberOfLines={3}
                style={{
                  color: '#000',

                  marginTop: 20,
                  fontSize: Constant.textFontSize(20),
                  fontWeight: '600',
                  textAlign: 'center',
                }}>
                Your booking for {tourdetails?.title} is successfully submitted
              </Text>
            </View>

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
            <Text
              style={{
                color: '#000',
                textAlign: 'center',
                marginTop: 10,
                fontSize: Constant.textFontSize(13),
                fontWeight: '400',
              }}>
              Allow me and my team, to take you on a private tour of your life,
              while visiting beautiful O’ahu.
            </Text>

            <CustomButton
              title={'Close'}
              borderColor={'#83CDFD'}
              onPress={() => {
                props.navigation.navigate('HomeStack', {
                  screen: 'HomeScreen',
                  params: {},
                });
                // props.navigation.navigate('BookDetails');
                setpopup(false);
              }}
              backgroundColor={COLORS.Primary_Blue}
            />
          </View>
        </View>
      ) : null}
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
              width: dimensions.SCREEN_WIDTH,
              backgroundColor: '#FBFBFB',
              position: 'absolute',
              bottom: 0,
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              borderTopColor: COLORS.Primary_Blue,
              borderTopWidth: 2,
              paddingBottom: 40,
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
                    fontSize: Constant.textFontSize(14),
                    textAlign: 'center',
                  },
                ]}>
                {props?.route?.params?.TourData?.cancellation_policy}
              </Text>
            </View>

            <CustomButton
              borderColor={COLORS.border_blue}
              txtStyle={{color: COLORS.White, fontWeight: '400'}}
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
    </View>
  );
};

export default ReviewBooking;

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
  summaryContainer: {
    width: '90%',
    marginHorizontal: 20,
    padding: 12,
    paddingRight: 15,
    paddingTop: 15,
    paddingBottom: 22,
    borderRadius: 10,
    marginTop: 6,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 5,
    shadowOpacity: 0.05,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  forAllTxt: {
    fontSize: Constant.textFontSize(12),
    fontWeight: '400',
    lineHeight: 20,
    color: '#1F191C',
  },
  uploadTxt: {
    fontSize: Constant.textFontSize(16),
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
