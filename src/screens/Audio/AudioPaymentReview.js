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
import FastImage from 'react-native-fast-image';
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
import {FONTS} from '../../global/Utils';

const AudioPaymentReview = props => {
  const user = useSelector(state => state.user.user_details);
  const [My_Alert, setMy_Alert] = useState(false);
  const [alert_sms, setalert_sms] = useState('');
  const [loading, setLoading] = useState(false);
  const [popup, setpopup] = useState(false);
  const [tourdetails, setTourDetail] = useState(props?.route?.params?.TourData);

  const [modalVisible, setModalVisible] = useState(false);

  const TotalBillwithTax = () => {
    let a = tourdetails?.price;
    let tax = tourdetails?.tax;
    const amt = (a * tax) / 100;
    return parseFloat(amt).toFixed(2);
  };
  const TotalBillAmountwithTax = () => {
    let a = tourdetails?.price;
    let tax = tourdetails?.tax;
    const amt = (a * tax) / 100;
    const totalamttax = a + Number(parseFloat(amt).toFixed(2));
    return totalamttax;
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView>
        <CustomHeader
          backarrow={true}
          title={'Payment Detail'}
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
              style={{
                width: Constant.textFontSize(80),
                height: Constant.textFontSize(100),
                resizeMode: 'stretch',
                borderRadius: 5,
              }}
              source={{uri: `${tourdetails?.thumbnail}`}}
            />
          </View>

          <View style={{marginLeft: 10, width: '80%'}}>
            <View style={{width: '85%'}}>
              <Text
                numberOfLines={2}
                style={[styles.uploadTxt, {fontWeight: '700'}]}>
                {tourdetails?.name}
              </Text>
            </View>
            <View style={{width: '78%'}}>
              <Text
                numberOfLines={2}
                style={[
                  styles.forAllTxt,
                  {color: COLORS.dark_grey, marginVertical: 5},
                ]}>
                {tourdetails?.short_description}
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
                Duration: {tourdetails?.duration} Hours
              </Text>
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                style={styles.imgStyle}
                source={require('../../assets/images/Icons/clock.png')}></Image>
              <Text style={[styles.forAllTxt, {color: COLORS.dark_grey}]}>
                {' '}
                {tourdetails?.uploaded_date}
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
              text={`${'$' + parseFloat(tourdetails?.price).toFixed(2)}`}
              fontSize={Constant.textFontSize(14)}
              fontFamily={FONTS.regular}
              textColor={'#455A64'}
              fontWeight={'700'}
              style={{}}
            />
          </View>

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
              text={`+$${TotalBillwithTax()}`}
              // text={cartListData?.data?.tax ? ('$' + Number(cartListData?.data?.tax)?.toFixed(2)) : ('$' + 0)}
              fontSize={Constant.textFontSize(14)}
              fontFamily={FONTS.regular}
              textColor={'#8F93A0'}
              fontWeight={'700'}
              style={{}}
            />
          </View>

          <View style={{borderColor: '#E0E0E0', borderBottomWidth: 1}} />

          <View style={[styles.row, {marginTop: 14}]}>
            <MyText
              text={`Total`}
              fontSize={Constant.textFontSize(16)}
              fontFamily={FONTS.regular}
              textColor={COLORS.Primary_Blue}
              style={{}}
            />
            <MyText
              text={`$${TotalBillAmountwithTax()}`}
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
          title={'Pay $' + `${TotalBillAmountwithTax()}`}
          onPress={() => {
            props.navigation.navigate('PurchaseReview', {
              type: 'audiopurchase',
              amount: `${TotalBillAmountwithTax()}`,
              tour_id: tourdetails?.id,
              tax: TotalBillwithTax(),
            });
          }}
        />
        {tourdetails?.cancellation_policy != '' ? (
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
        ) : null}
        <View style={{height: 20}} />
      </ScrollView>

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

export default AudioPaymentReview;

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
