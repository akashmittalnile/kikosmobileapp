//import : react components
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from 'react-native';
//import : custom components
import CustomeHeader from '../../components/CustomeHeader';
import MyText from '../../MyText/MyText';
import CustomButton from '../../components/CustomButton/CustomButton';
//import : third parties
//import : utils
import {COLORS, Constant} from '../../global';
import {
  booking_tour,
  bookingPhotoBooth,
  requestPostApi,
} from '../../WebApi/Service';
import {dimensions} from '../../utility/Mycolors';
import images from '../../global/images';
//import : styles
import {styles} from './PaymentProcessingStyle';
//import : modal
//import : redux
import {useSelector} from 'react-redux';
import moment from 'moment';

const PaymentProcessing = ({navigation, route}) => {
  //variables
  const {data} = route.params;
  const user = useSelector(state => state.user.user_details);
  //hook : states
  const [loading, setLoading] = useState(false);
  //hook : modal states
  const [popup, setpopup] = useState(false);
  const [showDetailSuccess, setShowDetailSuccess] = useState(false);
  const [bookingId, setBookingId] = useState('');
  const [alert_sms, setalert_sms] = useState('');
  const [My_Alert, setMy_Alert] = useState(false);

  //function : nav func
  const gotoConfirmTour = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'ConfirmedTour'}],
    });
  };
  const gotoMyVirtualTour = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'MyVirtualTour'}],
    });
  };
  const gotoTotalPurchase = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'TotalPurchasedScreen'}],
    });
  };
  const gotoMyTour = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'MyTour'}],
    });
  };

  //function : imp func
  const closeHandle = () => {
    if (data.type == 'audiopurchase') {
      gotoMyVirtualTour();
    } else if (data?.type == 'photobooth') {
      gotoTotalPurchase();
    } else {
      gotoMyTour();
    }
  };
  //function : serv func
  const bookPhotoBoothApi = async () => {
    setLoading(true);
    let formdata = new FormData();
    formdata.append('photo_booth_id', data.bookingdata.tour_id);
    formdata.append('tour_type', '3');
    formdata.append('booking_date', moment(new Date()).format('YYYY-MM-DD'));
    formdata.append('amount', parseFloat(data.bookingdata.amount).toFixed(2));
    formdata.append('tax', data.bookingdata.tax);
    formdata.append('transaction_id', data?.url?.transactionId);
    const {responseJson, err} = await requestPostApi(
      bookingPhotoBooth,
      formdata,
      'POST',
      user.token,
    );
    console.log('RESPONSE:::::', responseJson, err);
    setLoading(false);
    if (err == null) {
      if (responseJson.status == true) {
        setBookingId(responseJson?.booking_id);
        setShowDetailSuccess(true);
      } else {
        setalert_sms(responseJson.message);
        setMy_Alert(true);
      }
    } else {
      setalert_sms(err);
      setMy_Alert(true);
    }
    setLoading(false);
  };
  const bookTourApi = async () => {
    setLoading(true);
    try {
      // setApiCountCheck(apiCountCheck + 1);
      let formdata = new FormData();
      formdata.append(
        'tour_id',
        data?.type == 'reviewbooking'
          ? data?.bookingdata?.bookid
          : data?.bookingdata?.tour_id,
      );
      formdata.append(
        'tour_type',
        data?.type == 'reviewbooking' ? '1' : '2',
      ); /*1-Normal Tour, 2:Virtual tour */
      formdata.append(
        'booking_date',
        data?.type == 'reviewbooking'
          ? data?.bookingdata?.selectdate
          : moment(new Date()).format('YYYY-MM-DD'),
      );
      formdata.append(
        'no_adults',
        data?.type == 'reviewbooking' ? data?.bookingdata?.no_adult : '',
      );
      formdata.append(
        'no_senior_citizen',
        data?.type == 'reviewbooking'
          ? data?.bookingdata?.no_senior_citizen
          : '',
      );
      formdata.append(
        'no_childerns',
        data?.type == 'reviewbooking' ? data?.bookingdata?.no_childerns : '',
      );
      formdata.append(
        'adults_amount',
        data?.type == 'reviewbooking' ? data?.bookingdata?.adults_amount : '',
      );
      formdata.append(
        'senior_amount',
        data?.type == 'reviewbooking' ? data?.bookingdata?.senior_amount : '',
      );
      formdata.append(
        'childrens_amount',
        data?.type == 'reviewbooking'
          ? data?.bookingdata?.childrens_amount
          : '',
      );
      formdata.append(
        'amount',
        data?.type == 'reviewbooking'
          ? parseFloat(data?.bookingdata?.amount).toFixed(2)
          : parseFloat(data?.bookingdata?.amount).toFixed(2),
      );
      formdata.append('tax', parseFloat(data.bookingdata.tax).toFixed(2));
      formdata.append('transaction_id', data?.url?.transactionId);
      formdata.append(
        'pickup_location',
        data?.type == 'reviewbooking' ? data?.bookingdata?.pickuptext : '',
      );
      console.log('FORMDATA:::::', formdata);
      const {responseJson, err} = await requestPostApi(
        booking_tour,
        formdata,
        'POST',
        user.token,
      );
      console.log('RESPONSE:::::', responseJson, err);
      if (err == null) {
        if (responseJson.status == true) {
          if (data?.type == 'reviewbooking') {
            setLoading(false);
            setpopup(true);
          } else {
            setLoading(false);
            setBookingId(responseJson?.booking_id);
            setShowDetailSuccess(true);
          }
        } else {
          setLoading(false);
          setalert_sms(responseJson.message);
          setMy_Alert(true);
        }
      } else {
        setLoading(false);
        setalert_sms(err);
        setMy_Alert(true);
      }
    } catch (error) {
      console.error('error in bookTourApi', error);
    }
    setLoading(false);
  };
  //hook : useEffect
  useEffect(() => {
    if (data.type === 'photobooth') {
      bookPhotoBoothApi();
    } else {
      bookTourApi();
    }

    return () => {};
  }, []);

  //ui
  return (
    <View style={styles.container}>
      <CustomeHeader
        backarrow={true}
        title={'Payment'}
        onBackPress={() => {
          navigation.goBack();
        }}
      />
      <View style={styles.mainView}>
        <ActivityIndicator
          animating={loading}
          color={COLORS.default.Primary_Blue}
          size={'large'}
        />
        <MyText
          text={'Payment Processing ...'}
          fontSize={14}
          marginVertical={20}
        />
      </View>
      <SuccessPopUp
        show={popup}
        tourdata={data.bookingdata.TourData}
        closePress={() => {
          setpopup(false);
          gotoConfirmTour();
        }}
      />
      <DetailSuccessPopUp
        show={showDetailSuccess}
        bookingId={bookingId}
        type={data.type}
        closePress={() => {
          setShowDetailSuccess(false);
          closeHandle();
        }}
      />
    </View>
  );
};

export default PaymentProcessing;

const SuccessPopUp = ({show, tourdata, closePress = () => {}}) => {
  return (
    <>
      {show ? (
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
                Your booking for {tourdata?.title} is successfully submitted
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
              onPress={() => closePress()}
              backgroundColor={COLORS.default.Primary_Blue}
            />
          </View>
        </View>
      ) : null}
    </>
  );
};

const DetailSuccessPopUp = ({show, type, bookingId, closePress = () => {}}) => {
  return (
    <>
      {show ? (
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
            <View
              style={{
                width: '80%',
                justifyContent: 'center',
                alignItems: 'center',
                marginHorizontal: 40,
              }}>
              <Text
                numberOfLines={2}
                style={{
                  color: '#000',
                  marginTop: 20,
                  fontSize: Constant.textFontSize(20),
                  fontWeight: '600',
                  textAlign: 'center',
                }}>
                {type != 'photobooth'
                  ? 'Virtual Tour Purchased Successfully'
                  : 'Photo Booth Purchased Successfully'}
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
              Order Id : {bookingId}
            </Text>

            <CustomButton
              title={'Close'}
              borderColor={'#83CDFD'}
              onPress={() => closePress()}
              backgroundColor={COLORS.default.Primary_Blue}
            />
          </View>
        </View>
      ) : null}
    </>
  );
};
