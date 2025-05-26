//import : react components
import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
//import : custom components
import CustomHeader from '../../components/CustomeHeader';
import CustomButtonRound from '../../components/CustomButton/CustomButtonRound';
import Loader from '../../WebApi/Loader';
import MyAlert from '../../components/MyAlert';
//import : third parties
import FastImage from 'react-native-fast-image';
import MapView, {Marker, Polyline} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {ScrollView} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AudioPlayer} from 'react-native-simple-audio-player';
//import : utils
import {Constant} from '../../global';
import {dimensions} from '../../utility/Mycolors';
import {FONTS} from '../../global/Utils';
import COLORS from '../../global/Colors';
import {requestPostApi, virtual_tour_stop_detail} from '../../WebApi/Service';
//import : redux
import {useSelector, useDispatch} from 'react-redux';
import {onLogoutUser} from '../../redux/actions/user_action';
import {GoogleApiKey} from '../../WebApi/GoogleApiKey';

const GOOGLE_MAPS_APIKEY = GoogleApiKey;

const AudioDetails = props => {
  //variables
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user_details);
  //hook : states
  const [My_Alert, setMy_Alert] = useState(false);
  const [alert_sms, setalert_sms] = useState('');
  const [loading, setLoading] = useState(false);
  const [tourDetail, setTourDetail] = useState('');
  const [audio, setAudio] = useState('');
  const [refreshing, setRefreshing] = React.useState(false);
  //function : imp func
  const onRefresh = async () => {
    setRefreshing(true);
    await PostVirtualTourDetails(props?.route?.params?.virtualId);
    setRefreshing(false);
  };
  //hook : useEffect

  useEffect(() => {
    PostVirtualTourDetails(props?.route?.params?.virtualId);
  }, []);
  //function : nav func
  const gotoFullScreenMap = data =>
    props.navigation.navigate('FullScreenMap', {data});

  const PostVirtualTourDetails = async id => {
    setLoading(true);
    let formdata = new FormData();
    formdata.append('id', id);
    formdata.append('user_id', user?.userid != undefined ? user?.userid : '');
    const {responseJson, err} = await requestPostApi(
      virtual_tour_stop_detail,
      formdata,
      'POST',
      '',
    );
    console.log('Virtual Tour Detail Response: ', responseJson);
    if (err == null) {
      if (responseJson.status == true) {
        setLoading(false);
        setTourDetail(responseJson?.data);
        if (responseJson?.data?.purchased == 1) {
          setAudio(responseJson?.data?.audio);
        } else {
          setAudio(responseJson?.data?.trial_audio);
        }

        // var allimgs = [];

        // for (let i = 1; i <= responseJson.data.images.length; i++) {
        //   allimgs.push({img: responseJson.data.images[i - 1]});
        // }
        // setAllImg(allimgs);
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
  };

  //UI
  return (
    <View style={{backgroundColor: COLORS.White, flex: 1}}>
      <CustomHeader
        backarrow={true}
        title={'Virtual Tour Detail'}
        onBackPress={() => {
          props.navigation.goBack();
        }}
        onNotificationPress={() => {
          props.navigation.navigate('Notification');
        }}
      />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: 270,
              width: (dimensions.SCREEN_WIDTH * 95) / 100,
              borderRadius: 20,
              alignSelf: 'center',
              backgroundColor: '#fff',
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 3},
              shadowOpacity: 0.5,
              shadowRadius: 20,
              elevation: 3,
              marginTop: 15,

              // flex: 1,
            }}>
            {audio != '' ? (
              <View
                style={{
                  marginTop: 20,
                  width: (dimensions.SCREEN_WIDTH * 85) / 100,
                  alignSelf: 'center',
                }}>
                <Text
                  numberOfLines={2}
                  style={{
                    fontSize: Constant.textFontSize(14),
                    color: '#1F191C',
                    fontWeight: '700',
                    textAlign: 'center',
                  }}>
                  {tourDetail?.name}
                </Text>

                <Text
                  style={{
                    fontSize: Constant.textFontSize(12),
                    color: COLORS.dark_grey,
                    fontWeight: '400',
                    textAlign: 'center',
                    marginTop: 10,
                    marginBottom: 15,
                  }}>
                  Take You On A Virtual Tour Of Your Life, While Visiting
                  Beautiful O’ahu.
                </Text>
              </View>
            ) : null}
            <View
              style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
              <View
                style={{
                  top: 12,
                  width: dimensions.SCREEN_WIDTH * 0.95,
                  paddingVertical: 10,
                  borderRadius: 20,
                  backgroundColor: 'rgba(61, 161, 227, 0.9)',
                  justifyContent: 'center',
                  alignSelf: 'center',
                  shadowColor: '#000',
                  // shadowOffset: {width: 0, height: 3},
                  shadowRadius: 1,
                  shadowOpacity: 0.03,
                  // elevation: 3,
                }}>
                <AudioPlayer url={audio} repeatOnComponent={true} />
              </View>
            </View>
          </View>

          {tourDetail?.region?.length > 0 && (
            <TouchableOpacity
              style={{
                margin: 10,
                marginTop: 20,
                borderRadius: 20,
              }}
              onPress={() => {
                if (tourDetail?.purchased == 1) {
                  gotoFullScreenMap(tourDetail);
                }
              }}>
              <MapView
                // mapType={Platform.OS == "android" ? "terrain" : "standard"}
                region={{
                  latitude: tourDetail?.origin[0]?.lat
                    ? parseFloat(tourDetail?.origin[0]?.lat)
                    : parseFloat(0),
                  longitude: tourDetail?.origin[0]?.lng
                    ? parseFloat(tourDetail?.origin[0]?.lng)
                    : parseFloat(0),
                  latitudeDelta: 0.4,
                  longitudeDelta: 0.4,
                }}
                style={{
                  height: 200,
                  width: '100%',
                }}>
                <Marker
                  pinColor="orange"
                  coordinate={{
                    longitude: tourDetail?.origin[0]?.lng
                      ? parseFloat(tourDetail?.origin[0]?.lng)
                      : parseFloat(0),
                    latitude: tourDetail?.origin[0]?.lat
                      ? parseFloat(tourDetail?.origin[0]?.lat)
                      : parseFloat(0),
                  }}
                />
                <Marker
                  pinColor="green"
                  coordinate={{
                    longitude:
                      tourDetail?.destination[0]?.lng != null
                        ? parseFloat(tourDetail?.destination[0]?.lng)
                        : parseFloat(0),
                    latitude:
                      tourDetail?.destination[0]?.lat != null
                        ? parseFloat(tourDetail?.destination[0]?.lat)
                        : parseFloat(0),
                  }}
                />
                <MapViewDirections
                  origin={{
                    longitude: tourDetail?.origin[0]?.lng
                      ? parseFloat(tourDetail?.origin[0]?.lng)
                      : parseFloat(0),
                    latitude: tourDetail?.origin[0]?.lat
                      ? parseFloat(tourDetail?.origin[0]?.lat)
                      : parseFloat(0),
                  }}
                  destination={{
                    longitude:
                      tourDetail?.destination[0]?.lng != null
                        ? parseFloat(tourDetail?.destination[0]?.lng)
                        : parseFloat(0),
                    latitude:
                      tourDetail?.destination[0]?.lat != null
                        ? parseFloat(tourDetail?.destination[0]?.lat)
                        : parseFloat(0),
                  }}
                  apikey={GOOGLE_MAPS_APIKEY}
                  strokeWidth={4}
                  strokeColor="blue"
                />
                {/* <Polyline
                  coordinates={[
                    {
                      longitude: parseFloat(
                        tourDetail?.region[tourDetail?.region?.length - 1]
                          ?.longitude,
                      ),
                      latitude: parseFloat(
                        tourDetail?.region[tourDetail?.region?.length - 1]
                          ?.latitude,
                      ),
                    },
                    
                    { 
                      longitude: tourDetail?.destination[0]?.lng != null
                        ? parseFloat(tourDetail?.destination[0]?.lng)
                        : parseFloat(0),
                      latitude: tourDetail?.destination[0]?.lat != null
                        ? parseFloat(tourDetail?.destination[0]?.lat)
                        : parseFloat(0),
                    },
                    {
                      longitude: tourDetail?.origin[0]?.lng
                        ? parseFloat(tourDetail?.origin[0]?.lng)
                        : parseFloat(0),
                      latitude: tourDetail?.origin[0]?.lat
                        ? parseFloat(tourDetail?.origin[0]?.lat)
                        : parseFloat(0),
                    },
                  ]}
                  strokeWidth={4}
                  strokeColor="blue"
                  geodesic={true}
                  
                /> */}
                {tourDetail?.region?.map((marker, index) => {
                  return (
                    <>
                      <Marker
                        key={index}
                        coordinate={{
                          longitude: parseFloat(marker.longitude),
                          latitude: parseFloat(marker.latitude),
                        }}>
                        <View
                          style={{
                            borderWidth: 2,
                            borderColor: COLORS.White,
                            backgroundColor: COLORS.red,
                            height: 20,
                            width: 20,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 100,
                          }}>
                          <Text
                            style={{
                              fontSize: Constant.textFontSize(10),
                              color: 'white',
                              fontWeight: '600',
                              alignSelf: 'center',
                            }}>
                            {index + 1}
                          </Text>
                        </View>
                      </Marker>
                      <MapViewDirections
                        origin={tourDetail?.region[index]}
                        destination={tourDetail?.region[index - 1]}
                        apikey={GOOGLE_MAPS_APIKEY}
                        strokeWidth={4}
                        strokeColor="blue"
                      />
                      {/* <Polyline
                        coordinates={tourDetail.region}
                        strokeWidth={4}
                        strokeColor="blue"
                      /> */}
                    </>
                  );
                })}
              </MapView>
            </TouchableOpacity>
          )}

          <View style={{marginTop: 20}}>
            <>
              <View style={styles.touchableOpacity}>
                <View style={{height: 200, width: '100%', alignSelf: 'center'}}>
                  <FastImage
                    style={styles.imageBackground}
                    resizeMode="stretch"
                    source={{uri: `${tourDetail?.thumbnail}`}}
                  />
                </View>

                <View style={{padding: 15}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: '100%',
                      justifyContent: 'space-between',
                    }}>
                    <View style={{width: '100%'}}>
                      <Text
                        style={{
                          fontSize: Constant.textFontSize(14),
                          lineHeight: 25,
                          marginBottom: 10,
                          color: '#000',
                        }}>
                        {tourDetail?.description}
                      </Text>

                      <Text
                        style={{
                          color: '#3DA1E3',
                          fontWeight: '700',
                          fontSize: Constant.textFontSize(13),
                          marginVertical: 10,
                        }}>
                        {tourDetail?.purchased != 1 ? 'Purchase' : 'Purchased'}{' '}
                        at ${tourDetail?.price}
                        {tourDetail?.purchased == 1 &&
                          ` - On ${tourDetail?.purchase_date}`}
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'flex-start',
                          alignItems: 'center',
                          marginTop: 6,
                        }}>
                        <View
                          style={{
                            justifyContent: 'centr',
                            alignItems: 'center',
                          }}>
                          <Image
                            style={{height: 20, width: 20}}
                            resizeMode="contain"
                            source={require('../../assets/images/Icons/greenplayicon.png')}
                          />
                        </View>
                        <Text
                          style={{
                            color: '#8F93A0',
                            fontWeight: '400',
                            fontSize: Constant.textFontSize(14),
                            lineHeight: 20,
                            marginLeft: 6,
                            width: '90%',
                          }}>
                          TOTAL DURATION MORE THAN {tourDetail?.duration} HOURS
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'flex-start',
                          alignItems: 'center',
                          marginVertical: 10,
                        }}>
                        <View
                          style={{
                            justifyContent: 'centr',
                            alignItems: 'center',
                          }}>
                          <Image
                            style={{height: 20, width: 20}}
                            resizeMode="contain"
                            source={require('../../assets/images/Icons/greenUploadicon.png')}
                          />
                        </View>
                        <Text
                          style={{
                            color: '#8F93A0',
                            fontWeight: '400',
                            fontSize: Constant.textFontSize(14),
                            lineHeight: 20,
                            marginLeft: 6,
                            width: '90%',
                          }}>
                          Uploaded date: {tourDetail?.uploaded_date}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'flex-start',
                          alignItems: 'center',
                        }}>
                        <View
                          style={{
                            justifyContent: 'centr',
                            alignItems: 'center',
                          }}>
                          <Image
                            style={{height: 20, width: 20}}
                            resizeMode="contain"
                            source={require('../../assets/images/Icons/greendollar-circle.png')}
                          />
                        </View>
                        <Text
                          style={{
                            color: '#8F93A0',
                            fontWeight: '400',
                            fontSize: Constant.textFontSize(14),
                            lineHeight: 20,
                            marginLeft: 6,
                          }}>
                          Purchased Audio By {tourDetail?.user_count} Users
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </>
            {/* <FlatList
              showsHorizontalScrollIndicator={false}
              data={tourDetail}
              renderItem={({item, index}) => {
                return (
                  
                );
              }}
            /> */}
          </View>
          {user.userid == undefined ? (
            <CustomButtonRound
              txtStyle={{
                color: '#fff',
                fontSize: Constant.textFontSize(14),
                fontWeight: '400',
              }}
              backgroundColor={COLORS.Primary_Blue}
              title={'Login / Signup'}
              onPress={() => {
                AsyncStorage.clear();
                dispatch(onLogoutUser());
              }}
            />
          ) : (
            <>
              {tourDetail?.purchased != 1 ? (
                <CustomButtonRound
                  txtStyle={{
                    color: '#fff',
                    fontSize: Constant.textFontSize(14),
                    fontWeight: '400',
                  }}
                  backgroundColor={COLORS.Primary_Blue}
                  title={'Purchase Audio'}
                  onPress={() => {
                    props.navigation.navigate('AudioPaymentReview', {
                      type: 'audiopurchase',
                      TourData: tourDetail,
                    });
                    // props.navigation.navigate('PurchaseReview', {
                    //   type: 'audiopurchase',
                    //   amount: tourDetail?.price,
                    //   tour_id: tourDetail?.id,
                    // });
                  }}
                />
              ) : null}
            </>
          )}

          <View style={{height: 20}} />
        </>
      </ScrollView>
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

export default AudioDetails;

const styles = StyleSheet.create({
  cardContainer: {
    height: 125,
    width: 350,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    alignSelf: 'center',
    overflow: 'hidden',
    position: 'absolute',
    top: '12%',
    elevation: 7,
  },

  calCantainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    width: '97%',
    alignItems: 'center',
    justifyContent: 'center',
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
    tintColor: '#CECECE',
  },
  touchableOpacity: {
    width: (dimensions.SCREEN_WIDTH * 95) / 100,
    borderRadius: 20,
    alignSelf: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowRadius: 2,
    shadowOpacity: 0.2,
    elevation: 3,
    marginBottom: 20,
  },
  imageBackground: {
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
    justifyContent: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
});
