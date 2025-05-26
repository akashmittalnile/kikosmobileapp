//import : react components
import React, {useState, useEffect} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  RefreshControl,
  TouchableOpacity,
  Platform,
} from 'react-native';
//import : custom components
import HomeHeaderComponent from '../../components/HomeHeaderComponent';
import CustomheaderCard from '../../components/CustomheaderCard';
import MyAlert from '../../components/MyAlert';
import CustomButton from '../../components/CustomButton/CustomButton';
import Loader from '../../WebApi/Loader';
//import : third parties
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
//import : utils
import {Constant} from '../../global';
import images from '../../global/images';
import {FONTS, heightScale} from '../../global/Utils';
import {dimensions} from '../../utility/Mycolors';
import COLORS from '../../global/Colors';
import {photo_booth_listing, requestPostApi} from '../../WebApi/Service';
//import : redux
import {onLogoutUser} from '../../redux/actions/user_action';
import {useSelector, useDispatch} from 'react-redux';

const PhotoBoothScreen = props => {
  //variables
  const user = useSelector(state => state.user.user_details);
  const dispatch = useDispatch();
  //hook : states
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [My_Alert, setMy_Alert] = useState(false);
  const [alert_sms, setalert_sms] = useState('');
  const [loading, setLoading] = useState(false);
  const [orderDate, setOrderDate] = useState('');
  const [showda, setshowda] = useState(false);
  const [showdaios, setshowdaios] = useState(false);
  const [DATA, setDATA] = useState([]);
  const [counts, SetCounts] = useState('');
  const [refreshing, setRefreshing] = React.useState(false);
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
    const endPoint = photo_booth_listing + outputString;
    const {responseJson, err} = await requestPostApi(
      endPoint,
      '',
      'POST',
      user.userid != undefined ? user.token : '',
    );
    setLoading(false);

    if (err == null) {
      if (responseJson.status == true) {
        setDATA(responseJson.data);
        SetCounts(responseJson);
      } else {
        setalert_sms(responseJson.message);
        setMy_Alert(true);
      }
    } else if (err == null) {
      setalert_sms(err);
      setMy_Alert(true);
    }
  };
  //function : imp func
  const onRefresh = async () => {
    setRefreshing(true);
    await GetPhotoBooth();
    await setOrderDate('');
    setRefreshing(false);
  };
  //hook : useEffect
  useEffect(() => {
    GetPhotoBooth();
    setOrderDate('');
  }, []);
  //UI
  return (
    <View style={{backgroundColor: COLORS.White, flex: 1}}>
      <HomeHeaderComponent
        stylecontainer={{
          height:
            user?.userid != undefined ? heightScale(140) : heightScale(90),
        }}
        icon1={require('../../assets/images/Icons/firstline2.png')}
        press1={() => {
          props.navigation.openDrawer();
        }}
        press2={() => {
          props.navigation.navigate('Notification');
        }}
      />
      {user.userid != undefined ? (
        <>
          <View style={{top: -120}}>
            <CustomheaderCard
              title={'Total purchased'}
              imageUrl={images.frame}
              pressGo={() => {
                props.navigation.navigate('TotalPurchasedScreen');
              }}
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

          <View style={[styles.calCantainer, {marginTop: '15%'}]}>
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
                <Image
                  resizeMode="contain"
                  style={styles.calendar}
                  source={images.calendar}
                />
              </TouchableOpacity>
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
          {DATA.length > 0 ? (
            <View style={{marginTop: 20, flex: 2}}>
              <FlatList
                showsHorizontalScrollIndicator={false}
                data={DATA}
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
                      <TouchableOpacity
                        style={styles.touchableOpacity}
                        onPress={() => {
                          props.navigation.navigate('PhotoBoothPurchased', {
                            PhotoId: item?.id,
                          });
                        }}>
                        <FastImage
                          style={styles.imageBackground}
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
                                <Text
                                  numberOfLines={2}
                                  style={{
                                    width: '50%',
                                    backgroundColor: 'transparent',
                                    color: '#FFFFFF',
                                    fontWeight: '700',
                                    fontSize: Constant.textFontSize(16),
                                    lineHeight: 20,
                                  }}>
                                  {item?.tour_name}
                                </Text>
                                <LinearGradient
                                  style={{
                                    borderRadius: 5,
                                    paddingHorizontal: 10,
                                    paddingVertical: 5,
                                  }}
                                  colors={[
                                    'rgba(76, 186, 8, 0.66)',
                                    'rgba(76, 186, 8, 0.66)',
                                  ]}>
                                  {item?.Purchased != 1 ? (
                                    <Text
                                      style={{
                                        backgroundColor: 'transparent',
                                        color: '#fff',
                                        fontWeight: '700',
                                        fontSize: Constant.textFontSize(12),
                                        alignSelf: 'center',
                                      }}>
                                      Purchase at ${item?.price}
                                    </Text>
                                  ) : (
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
                                  )}
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
        </>
      ) : (
        <View style={{marginTop: 40}}>
          <View
            style={{
              height: Constant.myWidth / 2,
              width: Constant.myWidth / 2,
              alignSelf: 'center',
            }}>
            <Image
              resizeMode="stretch"
              source={require('../../assets/images/largeimages/photoboothwithloginicon.png')}
              style={{height: '100%', width: '100%', alignSelf: 'center'}}
            />
          </View>
          <Text
            style={{
              color: '#000',
              alignSelf: 'center',
              marginTop: 45,
              width: '70%',
              fontSize: Constant.textFontSize(16),
              fontWeight: '600',
              textAlign: 'center',
            }}>
            To access photo booth you need a account
          </Text>
          <CustomButton
            borderColor={'#83CDFD'}
            title={'Login / Signup'}
            onPress={() => {
              AsyncStorage.clear();
              dispatch(onLogoutUser());
            }}
            backgroundColor={COLORS.Primary_Blue}
          />
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

export default PhotoBoothScreen;

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
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    width: '97%',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 1,
  },
  container: {
    height: 50,
    backgroundColor: '#FFFFFF',
    flex: 1,
    marginTop: 70,
    marginLeft: 10,
    borderRadius: 6,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  scontainer: {
    height: 60,
    width: 60,
    borderRadius: 60 / 2,
    backgroundColor: '#3DA1E3',
    marginTop: 70,
    marginLeft: 10,

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
    shadowRadius: 2,
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.2,
    elevation: 3,
    marginBottom: 20,
    overflow: 'hidden',
  },
  imageBackground: {
    width: '100%',
    height: 300,
    justifyContent: 'flex-end',
    alignSelf: 'center',
    borderRadius: 20,
  },
});
