//import : react components
import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  RefreshControl,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
//import : custom components
import HomeHeaderComponent from '../../components/HomeHeaderComponent';
import Loader from '../../WebApi/Loader';
import CustomheaderCard from '../../components/CustomheaderCard';
import MyAlert from '../../components/MyAlert';
import CustomButtonRound from '../../components/CustomButton/CustomButtonRound';
//import : third parties
import {ScrollView} from 'react-native-virtualized-view';
import DropDownPicker from 'react-native-dropdown-picker';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import FastImage from 'react-native-fast-image';
import DatePicker from 'react-native-date-picker';
//import : utils
import COLORS from '../../global/Colors';
import images from '../../global/images';
import {dimensions} from '../../utility/Mycolors';
import {FONTS, heightScale} from '../../global/Utils';
import {Constant, MyIcon} from '../../global';
import {
  getAPI,
  get_count,
  get_virtual_tour,
  requestPostApi,
} from '../../WebApi/Service';
//import : styles
//import : modal
//import : redux
import {useSelector} from 'react-redux';

const Audio = props => {
  //variables
  const user = useSelector(state => state.user.user_details);
  //hook : states
  const [date, setDate] = useState(new Date());
  const [valueState, setValueState] = useState('New');
  const [openState, setopenState] = useState(false);
  const [modlevisual, setmodlevisual] = useState(false);
  const [My_Alert, setMy_Alert] = useState(false);
  const [alert_sms, setalert_sms] = useState('');
  const [loading, setLoading] = useState(false);
  const [virtualdata, setVirtualData] = useState([]);
  const [orderDate, setOrderDate] = useState('');
  const [showda, setshowda] = useState(false);
  const [showdaios, setshowdaios] = useState(false);
  const [purchasedVTCount, setPurchasedVTCount] = useState('');
  const [refreshing, setRefreshing] = React.useState(false);
  //function : imp func
  const onRefresh = async () => {
    setRefreshing(true);
    await getVirtualTour();
    await getCount();
    setRefreshing(false);
  };
  //function : serv func
  const getCount = async () => {
    try {
      const {response, status} = await getAPI(get_count, user.token);
      if (status) {
        setPurchasedVTCount(response.virtual_tour_count);
      }
    } catch (error) {
      console.error('error in getCount', error);
    }
  };

  const getVirtualTour = async () => {
    setmodlevisual(false);
    setLoading(true);
    let formdata = new FormData();
    formdata.append('user_id', user.userid != undefined ? user?.userid : '');
    formdata.append(
      'popular_tour',
      valueState != '' && valueState != 'New' ? 1 : '',
    );
    formdata.append(
      'new_tour',
      valueState != '' && valueState != 'Most Popular' ? 1 : '',
    );
    const {responseJson, err} = await requestPostApi(
      get_virtual_tour,
      formdata,
      'POST',
      '',
    );
    if (err == null) {
      if (responseJson.status == true) {
        setLoading(false);
        setVirtualData(responseJson.data);
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
  //hook : useEffect
  useEffect(() => {
    getVirtualTour();
    getCount();
  }, []);
  //UI
  return (
    <View style={{backgroundColor: COLORS.White, height: '100%'}}>
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
      <>
        {user.userid == undefined ? (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
              top: 40,
            }}>
            <ScrollView
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }>
              <View
                style={{
                  flexDirection: 'row',
                  marginHorizontal: 10,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backgroundColor: COLORS.Primary_Blue,
                  padding: 10,
                  borderRadius: 10,
                  // marginTop: 85,
                  width: '93%',
                  zIndex: -999,
                  padding: 10,
                }}>
                <View>
                  <Text style={styles.price}>Must try</Text>
                </View>

                <TouchableOpacity
                  style={{
                    // width: '30%',
                    zIndex: 100,
                    borderColor: 'white',
                    backgroundColor: 'white',
                    borderRadius: 5,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 10,
                  }}
                  onPress={() => {
                    setmodlevisual(true);
                  }}>
                  <Text
                    style={{
                      color: '#000',
                      fontSize: Constant.textFontSize(14),
                      fontFamily: FONTS.regular,
                      marginRight: 10,
                    }}>
                    {valueState != '' ? valueState : 'New'}
                  </Text>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <MyIcon.AntDesign
                      name="down"
                      size={20}
                      color={COLORS.Black}
                    />
                  </View>
                </TouchableOpacity>
              </View>
              {virtualdata.length > 0 ? (
                <View style={{marginTop: 20, marginBottom: 70}}>
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    data={virtualdata}
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
                              props.navigation.navigate('AudioDetails', {
                                virtualId: item?.id,
                              });
                            }}>
                            <FastImage
                              resizeMode="stretch"
                              style={styles.imageBackground}
                              // resizeMode="stretch"
                              source={{uri: `${item?.thumbnail}`}}>
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
                                {item?.purchased != 1 ? (
                                  <Text
                                    style={{
                                      backgroundColor: 'transparent',
                                      color: 'rgba(255, 255, 255, 1)',
                                      fontWeight: '700',
                                      fontSize: Constant.textFontSize(14),
                                      fontFamily: FONTS.bold,
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
                                    alignItems: 'flex-start',
                                    justifyContent: 'center',
                                    paddingTop: 6,
                                    paddingBottom: 14,
                                    paddingHorizontal: 23,
                                    // backgroundColor: 'transparent',
                                  }}>
                                  <View
                                    style={{
                                      justifyContent: 'center',
                                      // alignItems: 'flex-start',
                                      flexDirection: 'row',
                                    }}>
                                    <View
                                      style={{
                                        justifyContent: 'center',
                                        height: 50,
                                        width: 60,
                                        alignItems: 'center',
                                        marginLeft: 0,
                                      }}>
                                      <Image
                                        style={{
                                          height: 37,
                                          width: 37,
                                          alignSelf: 'center',
                                        }}
                                        source={require('../../assets/images/Icons/headphone_white.png')}
                                      />
                                    </View>
                                    <View
                                      style={{
                                        justifyContent: 'center',
                                        width: '90%',
                                        paddingRight: 10,
                                      }}>
                                      <Text
                                        numberOfLines={2}
                                        style={{
                                          backgroundColor: 'transparent',
                                          color: '#FFFFFF',
                                          fontWeight: '700',
                                          fontSize: Constant.textFontSize(15),
                                        }}>
                                        {item?.name}
                                      </Text>
                                    </View>
                                  </View>
                                  <Text
                                    numberOfLines={1}
                                    style={{
                                      backgroundColor: 'transparent',
                                      color: '#FFFFFF',
                                      fontWeight: '400',
                                      fontSize: Constant.textFontSize(13),
                                      lineHeight: 18,
                                    }}>
                                    {item?.description}
                                  </Text>
                                  {/* <View
                                  style={{
                                    backgroundColor: 'rgba(255, 255, 255, 1)',
                                    paddingHorizontal: 10,
                                    paddingVertical: 5,
                                    borderRadius: 5,
                                    marginTop: 10,
                                  }}>
                                  <Text
                                    style={{
                                      color: '#3DA1E3',
                                      fontWeight: '400',
                                      fontSize: Constant.textFontSize(12),
                                      lineHeight: 20,
                                    }}>
                                    TOTAL DURATION MORE THAN {item?.minute}{' '}
                                    MINUTES
                                  </Text>
                                </View> */}
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
                    flex: 1,
                  }}>
                  <View style={{height: 200, width: 200, alignSelf: 'center'}}>
                    <Image
                      resizeMode="stretch"
                      source={images.nodatafound}
                      style={{
                        height: '100%',
                        width: '100%',
                        alignSelf: 'center',
                      }}
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
            </ScrollView>
          </View>
        ) : (
          <View
            style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
            <View style={{top: -120}}>
              <CustomheaderCard
                title={'My Virtual Tours'}
                number={`${purchasedVTCount}`}
                imageUrl={images.groupImg}
                pressGo={() => {
                  props.navigation.navigate('MyVirtualTour');
                }}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: 10,
                backgroundColor: COLORS.Primary_Blue,
                padding: 10,
                borderRadius: 10,
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: COLORS.Primary_Blue,
                marginTop: 85,
                width: '93%',
                zIndex: -999,
                padding: 10,
              }}>
              <View>
                <Text style={styles.price}>Must try</Text>
              </View>

              <TouchableOpacity
                style={{
                  // width: '30%',
                  zIndex: 100,
                  borderColor: 'white',
                  backgroundColor: 'white',
                  borderRadius: 5,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 10,
                }}
                onPress={() => {
                  setmodlevisual(true);
                }}>
                <Text
                  style={{
                    color: '#000',
                    fontSize: Constant.textFontSize(14),
                    fontFamily: FONTS.regular,
                    marginRight: 10,
                  }}>
                  {valueState != '' ? valueState : 'New'}
                </Text>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <MyIcon.AntDesign
                    name="down"
                    size={20}
                    color={COLORS.Black}
                  />
                </View>
              </TouchableOpacity>
            </View>
            {/* <View style={[styles.calCantainer, {marginTop: 25}]}>
              <View style={styles.container}>
                <Text style={styles.dateText}>
                  {orderDate
                    ? moment(orderDate).format('LL')
                    : moment().format('LL')}
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
              </View>
              <TouchableOpacity
                onPress={() => {
                  if (Platform.OS != 'android') {
                    setshowdaios(!showdaios);
                  } else {
                    setshowda(!showda);
                  }
                }}
                style={styles.scontainer}>
                <Image source={images.fillter} />
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
                    maximumDate={new Date()}
                    onChange={(event, sTime) => {
                      setshowda(false);
                      setOrderDate(sTime);
                      getVirtualTour(sTime, true);
                    }}
                  />
                </View>
              ) : null}
            </View> */}
            {virtualdata.length > 0 ? (
              <View style={{marginTop: 20, flex: 1}}>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={virtualdata}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({item, index}) => {
                    return (
                      <>
                        <TouchableOpacity
                          style={styles.touchableOpacity}
                          onPress={() => {
                            props.navigation.navigate('AudioDetails', {
                              virtualId: item?.id,
                            });
                          }}>
                          <FastImage
                            resizeMode="stretch"
                            style={styles.imageBackground}
                            // resizeMode="stretch"
                            source={{uri: `${item?.thumbnail}`}}>
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
                              {item?.purchased != 1 ? (
                                <Text
                                  style={{
                                    backgroundColor: 'transparent',
                                    color: 'rgba(255, 255, 255, 1)',
                                    fontWeight: '700',
                                    fontSize: Constant.textFontSize(14),
                                    fontFamily: FONTS.bold,
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
                                  alignItems: 'flex-start',
                                  justifyContent: 'center',
                                  paddingTop: 6,
                                  paddingBottom: 14,
                                  paddingHorizontal: 23,
                                  // backgroundColor: 'transparent',
                                }}>
                                <View
                                  style={{
                                    justifyContent: 'center',
                                    // alignItems: 'flex-start',
                                    flexDirection: 'row',
                                  }}>
                                  <View
                                    style={{
                                      justifyContent: 'center',
                                      height: 50,
                                      width: 60,
                                      alignItems: 'center',
                                      marginLeft: 0,
                                    }}>
                                    <Image
                                      style={{
                                        height: 37,
                                        width: 37,
                                        alignSelf: 'center',
                                      }}
                                      source={require('../../assets/images/Icons/headphone_white.png')}
                                    />
                                  </View>
                                  <View
                                    style={{
                                      justifyContent: 'center',
                                      width: '90%',
                                      paddingRight: 10,
                                    }}>
                                    <Text
                                      numberOfLines={2}
                                      style={{
                                        backgroundColor: 'transparent',
                                        color: '#FFFFFF',
                                        fontWeight: '700',
                                        fontSize: Constant.textFontSize(15),
                                      }}>
                                      {item?.name}
                                    </Text>
                                  </View>
                                </View>
                                {/* <Text
                                  numberOfLines={1}
                                  style={{
                                    backgroundColor: 'transparent',
                                    color: '#FFFFFF',
                                    fontWeight: '400',
                                    fontSize: Constant.textFontSize(13),
                                    lineHeight: 18,
                                  }}>
                                  {item?.description}
                                </Text> */}
                                {/* <View
                                  style={{
                                    backgroundColor: 'rgba(255, 255, 255, 1)',
                                    paddingHorizontal: 10,
                                    paddingVertical: 5,
                                    borderRadius: 5,
                                    marginTop: 10,
                                  }}>
                                  <Text
                                    style={{
                                      color: '#3DA1E3',
                                      fontWeight: '400',
                                      fontSize: Constant.textFontSize(12),
                                      lineHeight: 20,
                                    }}>
                                    TOTAL DURATION MORE THAN {item?.minute}{' '}
                                    MINUTES
                                  </Text>
                                </View> */}
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
                  flex: 1,
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
        )}
      </>
      <Modal
        isVisible={modlevisual}
        swipeDirection="down"
        onSwipeComplete={e => {
          setmodlevisual(false);
        }}
        scrollTo={() => {}}
        scrollOffset={1}
        onBackdropPress={() => setmodlevisual(false)}
        propagateSwipe={true}
        coverScreen={false}
        backdropColor="transparent"
        style={{
          justifyContent: 'flex-end',
          margin: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}>
        <View
          style={{
            backgroundColor: '#fff',
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            padding: 10,
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 10,
            }}>
            <Text
              style={{
                color: '#000',
                fontSize: Constant.textFontSize(24),
                fontFamily: FONTS.semibold,
              }}>
              Select filter
            </Text>
          </View>

          <View
            style={{
              width: '100%',
              zIndex: 100,
              padding: 4,
            }}>
            <DropDownPicker
              items={[
                {label: 'Most Popular', value: 'Most Popular'},
                {label: 'New', value: 'New'},
              ]}
              listParentContainerStyle={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingLeft: 22,
                zIndex: 100,
              }}
              listParentLabelStyle={{
                fontWeight: '400',
                fontSize: Constant.textFontSize(15),
                zIndex: 100,
              }}
              listItemLabelStyle={{zIndex: 100}}
              placeholder="New"
              placeholderTextColor={'#B2B7B9'}
              containerStyle={{height: 50, paddingLeft: 4, zIndex: 100}}
              dropDownDirection="BOTTOM"
              bottomOffset={100}
              listItemContainerStyle={{
                zIndex: 100,
              }}
              itemStyle={{justifyContent: 'flex-start', zIndex: 100}}
              textStyle={{
                fontSize: Constant.textFontSize(14),
                zIndex: 100,
              }}
              open={openState}
              setOpen={setopenState}
              value={valueState}
              setValue={setValueState}
              scrollViewProps={{
                decelerationRate: 'medium',
                ScrollView: '#ffcc00',
                zIndex: 100,
              }}
              onChangeValue={values => {
                setValueState(values);
              }}
              onChangeText={item => {
                setValueState(item);
              }}
              defaultValue={null}
              dropDownContainerStyle={{
                // backgroundColor: 'white',
                borderColor: 'transparent',
                // borderBottomLeftRadius:15,
                // borderWidth: 0.1,
                shadowColor: '#000000',
                shadowOffset: {
                  width: 0,
                  height: 3,
                },
                shadowRadius: 5,
                shadowOpacity: 1.0,
                elevation: 5,
                zIndex: 999,
                // borderColor: "#8F93A0",
                borderRadius: 15,
                marginTop: 6,
              }}
              style={{
                // borderColor: 'white',
                // backgroundColor: 'white',
                borderRadius: 5,
                zIndex: 100,
                paddingLeft: 20,
              }}
            />
          </View>
          <View style={{height: 80}} />
          <CustomButtonRound
            stle={{width: '90%'}}
            txtStyle={{
              color: '#fff',
              fontSize: Constant.textFontSize(14),
              fontWeight: '400',
            }}
            backgroundColor={COLORS.Primary_Blue}
            title={'Apply'}
            onPress={() => {
              if (valueState != '') {
                getVirtualTour();
              }
            }}
          />
          <View style={{height: 20}} />
        </View>
      </Modal>

      <DatePicker
        modal
        mode="date"
        open={showdaios}
        date={date}
        onConfirm={date => {
          setshowdaios(false);
          setDate(date);
          setOrderDate(date);
          getVirtualTour(sTime, true);
        }}
        onCancel={() => {
          setshowdaios(false);
          setshowda(false);
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

export default Audio;

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
  price: {
    fontSize: Constant.textFontSize(16),
    fontWeight: '700',
    fontFamily: 'regular',
    color: COLORS.White,
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
    borderRadius: 20,
    alignSelf: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 3,
    marginBottom: 20,
  },
  imageBackground: {
    width: '100%',
    height: 290,
    // resizeMode: 'stretch',
    justifyContent: 'flex-end',
    borderRadius: 20,

    overflow: 'hidden',
  },
});
