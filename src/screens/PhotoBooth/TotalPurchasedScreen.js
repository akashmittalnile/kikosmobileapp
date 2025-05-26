//import : react components
import React, {useState, useEffect} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
//import : custom components
import CustomHeader from '../../components/CustomeHeader';
import CustomheaderCard1 from '../../components/CustomheaderCard1';
import Loader from '../../WebApi/Loader';
import MyAlert from '../../components/MyAlert';
//import : third parties
import LinearGradient from 'react-native-linear-gradient';
import DateTimePicker from '@react-native-community/datetimepicker';
import FastImage from 'react-native-fast-image';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
//import : utils
import images from '../../global/images';
import {FONTS} from '../../global/Utils';
import {dimensions} from '../../utility/Mycolors';
import COLORS from '../../global/Colors';
import {Photo_BoothPurchase_Listing, requestGetApi} from '../../WebApi/Service';
import {Constant} from '../../global';
//import : redux
import {useSelector} from 'react-redux';

const TotalPurchasedScreen = props => {
  //variables
  const user = useSelector(state => state.user.user_details);
  //hook : states
  const [My_Alert, setMy_Alert] = useState(false);
  const [alert_sms, setalert_sms] = useState('');
  const [loading, setLoading] = useState(false);
  const [DATA2, setDATA] = useState([]);
  const [counts, SetCounts] = useState('');
  const [orderDate, setOrderDate] = useState('');
  const [showda, setshowda] = useState(false);
  const [showdaios, setshowdaios] = useState(false);
  const [date, setDate] = useState(new Date());

  const objToQueryString = obj => {
    const keyValuePairs = [];
    for (const key in obj) {
      keyValuePairs.push(
        encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]),
      );
    }
    return keyValuePairs.length == 0 ? '' : '?' + keyValuePairs.join('&');
  };
  //function : serv func
  const GetPhotoBooth = async (sTime, isdate = false) => {
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
    const endPoint = Photo_BoothPurchase_Listing + outputString;
    const {responseJson, err} = await requestGetApi(
      endPoint,
      '',
      'GET',
      user.token,
    );
    if (err == null) {
      if (responseJson.status == true) {
        setLoading(false);
        setDATA(responseJson.data);
        SetCounts(responseJson);
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

  //hook : useEffect
  useEffect(() => {
    GetPhotoBooth();
  }, []);
  //UI
  return (
    <View style={{backgroundColor: COLORS.White, flex: 1}}>
      <CustomHeader
        backarrow={true}
        title={'Photo Booth'}
        onBackPress={() => {
          props.navigation.goBack();
        }}
      />
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 78,
          }}>
          <CustomheaderCard1
            title={'Total purchased'}
            imageUrl={images.frame}
            middleView={
              <View style={styles.hrcontainer}>
                <Image
                  style={{height: 15, width: 15, tintColor: '#CECECE'}}
                  source={images.gallaryicon}
                />
                <Text style={styles.titleTxt}>
                  {counts?.total_purchase_image} Photos
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
                  {counts?.total_purchase_video} Videos
                </Text>
              </View>
            }
          />
        </View>

        <View style={{...styles.calCantainer, marginTop: '15%'}}>
          {/* <TouchableOpacity
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
          </TouchableOpacity> */}
        </View>
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
              maximumDate={new Date()}
              onChange={(event, sTime) => {
                // dateRef(sTime);
                setshowda(false);
                setOrderDate(sTime);
                GetPhotoBooth(sTime, true);
              }}
            />
          </View>
        ) : null}
      </View>

      {DATA2.length > 0 ? (
        <View style={{marginTop: 20, flex: 1, alignSelf: 'center'}}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={DATA2}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => {
              return (
                <>
                  <TouchableOpacity
                    style={styles.touchableOpacity}
                    onPress={() => {
                      props.navigation.navigate('PhotoBoothPurchased', {
                        PhotoId: item?.booth_id,
                      });
                    }}>
                    <FastImage
                      resizeMode="stretch"
                      style={styles.imageBackground}
                      // source={{uri :"http://100.21.178.252/public/upload/photo-booth/IMG_20240118_073235_6515.jpg"}}
                      source={{uri: `${item?.image}`}}>
                      <LinearGradient
                        style={{
                          borderRadius: 5,
                          paddingHorizontal: 10,
                          paddingVertical: 5,
                          position: 'absolute',
                          right: 10,
                          top: 15,
                          flex: 1,
                        }}
                        colors={[
                          'rgba(76, 186, 8, 0.66)',
                          'rgba(76, 186, 8, 0.66)',
                        ]}>
                        <View style={{flexDirection: 'row'}}>
                          <Image
                            style={{
                              marginLeft: 10,
                              height: 15,
                              width: 15,
                              marginTop: 2,
                            }}
                            source={images.gallaryicon}
                          />
                          <Text
                            style={[
                              styles.titleTxt,
                              {marginLeft: 10, color: '#fff'},
                            ]}>
                            {item?.image_count} Photos
                          </Text>
                          <Image
                            style={{
                              marginLeft: 10,
                              height: 15,
                              width: 15,
                              marginTop: 2,
                            }}
                            source={images.gallaryvideoicon}
                          />
                          <Text
                            style={[
                              styles.titleTxt,
                              {marginLeft: 10, color: '#fff'},
                            ]}>
                            {item?.video_count} Videos
                          </Text>
                        </View>
                      </LinearGradient>
                      <LinearGradient
                        style={{
                          width: '100%',
                          justifyContent: 'flex-end',
                          borderBottomLeftRadius: 20,
                          borderBottomRightRadius: 20,
                          padding: 10,
                        }}
                        colors={[
                          'rgba(61, 161, 227, 0.8)',
                          'rgba(61, 161, 227, 0.8)',
                        ]}>
                        <View
                          style={{
                            padding: 12,
                            paddingHorizontal: 20,
                            backgroundColor: 'transparent',
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              width: '100%',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                            }}>
                            <View
                              style={{
                                width: '53%',
                                justifyContent: 'center',
                              }}>
                              <Text
                                numberOfLines={2}
                                style={{
                                  backgroundColor: 'transparent',
                                  color: '#FFFFFF',
                                  fontWeight: '700',
                                  fontSize: Constant.textFontSize(16),
                                  lineHeight: 20,
                                }}>
                                {item?.title}
                              </Text>
                            </View>

                            <LinearGradient
                              style={{
                                height: 30,
                                borderRadius: 5,
                                paddingHorizontal: 10,
                                paddingVertical: 5,
                              }}
                              colors={[
                                'rgba(76, 186, 8, 0.66)',
                                'rgba(76, 186, 8, 0.66)',
                              ]}>
                              <Text
                                style={{
                                  backgroundColor: 'transparent',
                                  color: '#fff',
                                  fontWeight: '700',
                                  fontSize: Constant.textFontSize(14),
                                  alignSelf: 'center',
                                }}>
                                Purchased
                              </Text>
                            </LinearGradient>
                          </View>
                        </View>
                      </LinearGradient>
                    </FastImage>
                  </TouchableOpacity>
                </>
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
          GetPhotoBooth(date, true);
        }}
        onCancel={() => {
          setshowdaios(false);
          setshowda(false);
        }}
      />
    </View>
  );
};

export default TotalPurchasedScreen;

const styles = StyleSheet.create({
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
  calCantainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    width: '97%',
    alignItems: 'center',
    justifyContent: 'center',
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
  scontainer: {
    height: 50,
    width: 60,
    backgroundColor: '#3DA1E3',
    marginTop: 70,
    marginLeft: 10,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
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
  touchableOpacity: {
    width: (dimensions.SCREEN_WIDTH * 95) / 100,
    height: 300,
    borderRadius: 20,
    alignSelf: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 3,
    marginBottom: 20,
    overflow: 'hidden',
  },
  imageBackground: {
    width: '100%',
    height: 300,
    resizeMode: 'stretch',
    justifyContent: 'flex-end',
    alignSelf: 'center',
    borderRadius: 20,
  },
});
