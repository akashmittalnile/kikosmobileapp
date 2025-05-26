//import : react components
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
//import : custom components
import HomeHeaderComponent from '../../components/HomeHeaderComponent';
import Loader from '../../WebApi/Loader';
import MyAlert from '../../components/MyAlert';
//import : third parties
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
//import : utils
import {dimensions} from '../../utility/Mycolors';
import {home, requestGetApi} from '../../WebApi/Service';
import COLORS from '../../global/Colors';
import {FONTS} from '../../global/Utils';
import {Constant} from '../../global';
//import : redux

const HomeScreen = props => {
  //hook : states
  const [DATA, setDATA] = useState([]);
  const [My_Alert, setMy_Alert] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [alert_sms, setalert_sms] = useState('');
  const [loading, setLoading] = useState(false);
  //function : imp func
  const onRefresh = async () => {
    setRefreshing(true);
    await getHome();
    setRefreshing(false);
  };
  //function : nav func
  const getHome = async () => {
    setLoading(true);
    const {responseJson, err} = await requestGetApi(home, '', 'GET', '');
    setLoading(false);
    if (err == null) {
      if (responseJson.status == true) {
        setDATA(responseJson.data);
      } else {
        setalert_sms(responseJson.message);
        setMy_Alert(true);
      }
    } else if (err == null) {
      setalert_sms(err);
      setMy_Alert(true);
    }
  };
  //hook : useEffect
  useEffect(() => {
    props.navigation.closeDrawer();
    const unsubscribe = props.navigation.addListener('focus', () => {
      getHome();
    });
    return unsubscribe;
  }, []);
  //UI
  return (
    <View style={{flex: 1}}>
      <HomeHeaderComponent
        icon1={require('../../assets/images/Icons/firstline2.png')}
        press1={() => {
          props.navigation.openDrawer();
        }}
        press2={() => {
          props.navigation.navigate('Notification');
        }}
      />
      <View style={{top: -60, marginBottom: 60}}>
        <ScrollView
          style={{height: '100%'}}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <FastImage
            resizeMode="stretch"
            style={{
              width: (dimensions.SCREEN_WIDTH * 95) / 100,
              height: 270,

              justifyContent: 'flex-end',
              alignSelf: 'center',
              borderRadius: 15,

              // overflow: 'hidden',
            }}
            source={require('../../assets/images/largeimages/Rectangle.png')}>
            <View style={{flex: 1, justifyContent: 'flex-end'}}>
              <LinearGradient
                style={{
                  width: '100%',
                  justifyContent: 'flex-end',
                  borderBottomLeftRadius: 15,
                  borderBottomRightRadius: 15,
                  padding: 10,
                }}
                colors={[
                  'rgba(61, 161, 227, 0.58)',
                  'rgba(61, 161, 227, 0.58)',
                ]}>
                <Text
                  numberOfLines={1}
                  style={{
                    fontSize: Constant.textFontSize(14),
                    backgroundColor: 'transparent',
                    color: '#fff',
                    fontWeight: '600',
                    alignSelf: 'flex-end',
                  }}>
                  +1 (808)206-2205
                </Text>
                <Text
                  numberOfLines={1}
                  style={{
                    backgroundColor: 'transparent',
                    fontSize: Constant.textFontSize(14),
                    color: '#fff',
                    fontWeight: '600',
                    alignSelf: 'flex-end',
                  }}>
                  YOUR GUIDE TO ADVENTURE ON O'AHU
                </Text>
              </LinearGradient>
            </View>
          </FastImage>
          <View style={{width: '100%', marginLeft: 20, marginVertical: 15}}>
            <Text
              style={{
                fontSize: Constant.textFontSize(18),
                color: '#000',
                fontWeight: '600',
                marginBottom: 0,
              }}>
              Aloha!
            </Text>
            <Text
              style={{
                fontSize: Constant.textFontSize(14),
                color: '#000',
                fontWeight: '500',
                width: '95%',
              }}>
              You are about to experience the best place on Earth, Hawai’i no ka
              oi. Private group tours and comfortable seating.
            </Text>
          </View>

          <View
            style={{flex: 1, marginTop: 10, height: '100%', marginBottom: 30}}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              data={DATA}
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
                        marginBottom: 20,
                        margin: 2,
                        shadowColor: '#000',
                        shadowOffset: {width: 0, height: 3},
                        shadowOpacity: 0.5,
                        shadowRadius: 2,
                        elevation: 3,
                        overflow: 'hidden',
                      }}>
                      <TouchableOpacity
                        onPress={() => {
                          props.navigation.navigate('BookDetails', {
                            tourId: item.id,
                            // CalendarList:calendatData
                          });
                          // styles = {flex: 1};
                        }}>
                        <FastImage
                          style={{
                            width: '100%',
                            height: 300,
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
                                <View style={{width: '70%'}}>
                                  <Text
                                    numberOfLines={2}
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
                                      fontSize: Constant.textFontSize(14),
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
                                        fontSize: Constant.textFontSize(12),
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
                    </View>
                  </>
                );
              }}
            />
          </View>
        </ScrollView>
      </View>
      {My_Alert ? (
        <MyAlert
          sms={alert_sms}
          okPress={() => {
            setMy_Alert(false);
          }}
        />
      ) : null}
      {loading ? <Loader /> : null}
      {/* </View> */}
    </View>
  );
};

export default HomeScreen;
