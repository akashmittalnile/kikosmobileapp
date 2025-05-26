//import : react components
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  RefreshControl,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
//import : custom components
import HomeHeaderComponent from '../../components/HomeHeaderComponent';
import Loader from '../../WebApi/Loader';
import MyAlert from '../../components/MyAlert';
import CustomButtonRound from '../../components/CustomButton/CustomButtonRound';
//import : third parties
import DropDownPicker from 'react-native-dropdown-picker';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import FastImage from 'react-native-fast-image';
//import : utils
import {dimensions} from '../../utility/Mycolors';
import COLORS from '../../global/Colors';
import images from '../../global/images';
import {get_book_tour, requestPostApi} from '../../WebApi/Service';
import {FONTS} from '../../global/Utils';
import {Constant, MyIcon} from '../../global';
//import : styles
//import : modal
//import : redux
import {useSelector} from 'react-redux';

const BookTour = props => {
  //variables
  const user = useSelector(state => state.user.user_details);
  //hook : states
  const [alert_sms, setalert_sms] = useState('');
  const [horizontalData, setHorizontalData] = useState([]);
  console.log('horizontalData', horizontalData);
  const [popularData, setPopularData] = useState([]);
  const [tourCountValue, setTourCountValue] = useState('');
  const [valueState, setValueState] = useState('New');
  //hook : modal states
  const [loading, setLoading] = useState(false);
  const [My_Alert, setMy_Alert] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [modlevisual, setmodlevisual] = useState(false);
  const [openState, setopenState] = useState(false);
  //function : imp func
  const onRefresh = async () => {
    setRefreshing(true);
    await GetBookTourApi();
    setRefreshing(false);
  };
  //function : serv func
  const GetBookTourApi = async () => {
    setmodlevisual(false);
    setLoading(true);
    let formdata = new FormData();
    formdata.append('user_id', user?.userid != undefined ? user?.userid : '');
    formdata.append(
      'popular_tour',
      valueState != '' && valueState != 'New' ? 1 : '',
    );
    formdata.append(
      'new_tour',
      valueState != '' && valueState != 'Most Popular' ? 1 : '',
    );
    const {responseJson, err} = await requestPostApi(
      get_book_tour,
      formdata,
      'POST',
      '',
    );
    if (err == null) {
      if (responseJson.status == true) {
        setLoading(false);
        setHorizontalData(responseJson.data);
        setTourCountValue(responseJson);
        setPopularData(responseJson.popular_tour);
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
    setLoading(false);
  };
  //hook : useEffect
  useEffect(() => {
    GetBookTourApi();
    return () => {};
  }, []);

  //UI
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
      <View style={{top: -60, backgroundColor: 'transparent', height: '100%'}}>
        <ScrollView
          nestedScrollEnabled={true}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          style={{showsverticalscrollindicator: false}}>
          <View style={{flex: 1, height: '100%'}}>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={horizontalData}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) => {
                return (
                  <>
                    <TouchableOpacity
                      key={index}
                      style={{
                        width: (dimensions.SCREEN_WIDTH * 90) / 100,
                        borderRadius: 20,
                        alignSelf: 'center',
                        backgroundColor: '#fff',
                        shadowColor: '#000',
                        shadowRadius: 2,
                        shadowOpacity: 0.2,
                        height: 300,
                        shadowColor: '#000',
                        shadowOffset: {width: 0, height: 3},
                        shadowOpacity: 0.5,
                        shadowRadius: 20,
                        elevation: 3,
                        marginHorizontal: 10,
                      }}
                      onPress={() => {
                        props.navigation.navigate('BookDetails', {
                          tourId: item?.id,
                        });
                      }}>
                      <FastImage
                        style={{
                          width: '100%',
                          height: 300,
                          resizeMode: 'stretch',
                          justifyContent: 'flex-end',
                          borderRadius: 20,
                          overflow: 'hidden',
                        }}
                        // resizeMode="stretch"
                        source={{uri: `${item?.images}`}}>
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
                          <Text
                            style={{
                              backgroundColor: 'transparent',
                              color: 'rgba(255, 255, 255, 1)',
                              fontWeight: '700',
                              fontSize: Constant.textFontSize(14),
                              fontFamily: FONTS.bold,
                            }}>
                            {item?.same_for_all != null
                              ? 'US$' + item?.same_for_all
                              : 'US$' +
                                item?.under_10_age_price +
                                ' – US$' +
                                item?.age_11_price}
                          </Text>
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
                              <View style={{width: '70%'}}>
                                <Text
                                  numberOfLines={1}
                                  style={{
                                    backgroundColor: 'transparent',
                                    color: '#FFFFFF',
                                    fontWeight: '700',
                                    fontSize: Constant.textFontSize(16),
                                  }}>
                                  {item?.title}
                                </Text>
                                {/* <Text
                                  numberOfLines={2}
                                  style={{
                                    backgroundColor: 'transparent',
                                    color: '#FFFFFF',
                                    fontWeight: '400',
                                    fontSize: Constant.textFontSize(13),
                                    lineHeight: 18,
                                  }}>
                                  {item?.name} • {item?.duration} Hours
                                </Text> */}
                              </View>

                              <TouchableOpacity
                                style={{
                                  width: 55,
                                  height: 55,
                                  borderRadius: 55 / 2,
                                  backgroundColor: COLORS.Primary_Blue,
                                  justifyContent: 'center',
                                  borderWidth: 6,
                                  borderColor: 'rgba(131, 205, 253, 1)',
                                }}
                                onPress={() => {
                                  props.navigation.navigate('BookDetails', {
                                    tourId: item.id,
                                  });
                                }}>
                                <View
                                  style={{
                                    width: 45,
                                    alignSelf: 'center',
                                    height: 45,
                                    borderRadius: 45 / 2,
                                    justifyContent: 'center',
                                    borderWidth: 1,
                                    borderColor: 'rgba(228, 228, 228, 1)',
                                  }}>
                                  <Text
                                    style={{
                                      backgroundColor: 'transparent',
                                      color: '#fff',
                                      fontWeight: '600',
                                      fontSize: Constant.textFontSize(13),
                                      alignSelf: 'center',
                                    }}>
                                    View
                                  </Text>
                                </View>
                              </TouchableOpacity>
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

          {user.userid != undefined ? (
            <View style={{marginTop: 10}}>
              <ScrollView horizontal={true}>
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity
                    onPress={() => {
                      props.navigation.navigate('ConfirmedTour');
                    }}
                    style={styles.bannercardContainer}>
                    <ImageBackground
                      resizeMode="stretch"
                      source={require('../../assets/images/largeimages/banner1.png')}
                      style={styles.backgroundImage}
                      // blurRadius={10} // Adjust blur intensity as needed
                    >
                      <LinearGradient
                        // style={{flex: 1}}
                        colors={['#23356F61', '#23356F61', '#23356F61']}
                        start={{x: 1, y: 1}}
                        end={{x: 0.5, y: 0.5}}
                        style={styles.cardContent}>
                        <Text style={styles.title}> My Tour Bookings</Text>
                        <Text style={styles.description}>
                          {tourCountValue?.confirmed_tour}
                        </Text>
                      </LinearGradient>
                    </ImageBackground>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      props.navigation.navigate('FreeCallBackRqst');
                    }}
                    style={styles.bannercardContainer}>
                    <ImageBackground
                      resizeMode="stretch"
                      source={require('../../assets/images/largeimages/banner1.png')}
                      style={styles.backgroundImage}
                      // blurRadius={10} // Adjust blur intensity as needed
                    >
                      <LinearGradient
                        // style={{flex: 1}}
                        colors={['#23356F61', '#23356F61', '#23356F61']}
                        start={{x: 1, y: 1}}
                        end={{x: 0.5, y: 0.5}}
                        style={styles.cardContent}>
                        <Text style={styles.title}>
                          Free Call Back Requests
                        </Text>
                        <Text style={styles.description}>
                          {tourCountValue?.free_callback_request}
                        </Text>
                      </LinearGradient>
                    </ImageBackground>
                  </TouchableOpacity>
                </View>
              </ScrollView>
              {/* <FlatList
             horizontal
             showsHorizontalScrollIndicator={false}
             data={DATA}
             keyExtractor={(item, index) => index.toString()}
             // style={{marginRight:10}}
             renderItem={({item, index}) => {
               return (
                 <>
                   <TouchableOpacity
                     onPress={() => {
                       onpressConfirmedtour(item?.id);
                     }}
                     style={styles.bannercardContainer}>
                     <ImageBackground
                       resizeMode="stretch"
                       source={require('../../assets/images/largeimages/banner1.png')}
                       style={styles.backgroundImage}
                       // blurRadius={10} // Adjust blur intensity as needed
                     >
                       <LinearGradient
                         // style={{flex: 1}}
                         colors={['#23356F61', '#23356F61', '#23356F61']}
                         start={{x: 1, y: 1}}
                         end={{x: 0.5, y: 0.5}}
                         style={styles.cardContent}>
                         <Text style={styles.title}>{item.title}</Text>
                         <Text style={styles.description}>{tourCountValue?.confirmed_tour}</Text>
                       </LinearGradient>
                     </ImageBackground>
                   </TouchableOpacity>
                 </>
               );
             }}
           /> */}
            </View>
          ) : null}

          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 10,
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 15,
              backgroundColor: COLORS.Primary_Blue,
              padding: 10,
              borderRadius: 10,
              // flex: 1,
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
                <MyIcon.AntDesign name="down" size={20} color={COLORS.Black} />
              </View>
            </TouchableOpacity>
          </View>
          {popularData.length > 0 ? (
            <View style={{marginTop: 20, flex: 1, paddingBottom: 70}}>
              <FlatList
                showsHorizontalScrollIndicator={false}
                data={popularData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}) => {
                  return (
                    <>
                      <View
                        style={{
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
                        }}>
                        <TouchableOpacity
                          onPress={() => {
                            props.navigation.navigate('BookDetails', {
                              tourId: item?.id,
                              // CalendarList:calendatData
                            });
                          }}>
                          <FastImage
                            style={{
                              width: '100%',
                              height: 300,
                              resizeMode: 'stretch',
                              justifyContent: 'flex-end',
                              borderRadius: 20,

                              overflow: 'hidden',
                            }}
                            source={{uri: `${item?.images}`}}>
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
                              <Text
                                style={{
                                  backgroundColor: 'transparent',
                                  color: 'rgba(255, 255, 255, 1)',
                                  fontWeight: '700',
                                  fontSize: Constant.textFontSize(14),
                                  fontFamily: FONTS.bold,
                                }}>
                                {item?.same_for_all != null
                                  ? 'US$' + item?.same_for_all
                                  : 'US$' +
                                    item?.under_10_age_price +
                                    ' – US$' +
                                    item?.age_11_price}
                              </Text>
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
                                  <View style={{width: '100%'}}>
                                    <Text
                                      numberOfLines={3}
                                      style={{
                                        backgroundColor: 'transparent',
                                        color: '#FFFFFF',
                                        fontWeight: '700',
                                        fontSize: Constant.textFontSize(16),
                                        marginBottom: 10,
                                      }}>
                                      {item?.title}
                                    </Text>
                                    {/* <Text
                                      numberOfLines={2}
                                      style={{
                                        backgroundColor: 'transparent',
                                        color: '#FFFFFF',
                                        fontWeight: '400',
                                        fontSize: Constant.textFontSize(13),
                                        lineHeight: 18,
                                      }}>
                                      {item?.name}
                                    </Text> */}
                                  </View>
                                </View>
                              </View>
                            </LinearGradient>
                          </FastImage>
                        </TouchableOpacity>
                      </View>
                    </>
                  );
                }}
              />
            </View>
          ) : (
            <View
              style={{
                marginTop: 20,
                width: '95%',
                justifyContent: 'center',
                marginHorizontal: 10,
              }}>
              <View style={{height: 100, width: 100, alignSelf: 'center'}}>
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
                  marginTop: 15,
                  fontSize: Constant.textFontSize(16),
                  fontWeight: '600',
                  textAlign: 'center',
                }}>
                No Data Found
              </Text>
            </View>
          )}
        </ScrollView>
      </View>

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
                GetBookTourApi();
              }
            }}
          />
          <View style={{height: 20}} />
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

export default BookTour;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#E8ECF2',
    backgroundColor: '#EAEDF7',
  },
  cardContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  bannercardContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 257,
    height: 90,
    marginHorizontal: 10,
    // aspectRatio: 13 / 7, // You can adjust the aspect ratio based on your design
    borderRadius: 20,
    overflow: 'hidden',
    marginVertical: 10,
  },
  backgroundImage: {
    flex: 1,
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
    // alignItems:'center',
    // backgroundColor:'transparent',
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.2)', // Adjust the background color and opacity
  },
  title: {
    fontSize: Constant.textFontSize(14),
    lineHeight: 20,
    color: 'white',
    fontWeight: '400',
  },
  description: {
    fontSize: Constant.textFontSize(16),
    color: COLORS.White,
    fontWeight: '700',
    // color: 'white',
  },
  price: {
    fontSize: Constant.textFontSize(16),
    fontWeight: '700',
    fontFamily: 'regular',
    color: COLORS.White,
  },
});
