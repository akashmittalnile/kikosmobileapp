import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ImageBackground,
  Image,
} from 'react-native';
import React, {useCallback, useState, useEffect} from 'react';
import CustomHeader from '../../components/CustomeHeader';
import {dimensions} from '../../utility/Mycolors';
import images from '../../global/images';
import {FONTS} from '../../global/Utils';
import COLORS from '../../global/Colors';
import AntDesign from 'react-native-vector-icons';
import {AudioPlayer} from 'react-native-simple-audio-player';
import CustomButtonRound from '../../components/CustomButton/CustomButtonRound';
import {Constant} from '../../global';
import {
  confirmed_tour,
  get_virtual_tour,
  requestGetApi,
  requestPostApi,
  virtual_listing,
} from '../../WebApi/Service';
import Loader from '../../WebApi/Loader';
import MyAlert from '../../components/MyAlert';
import {useSelector, useDispatch} from 'react-redux';

const ConfirmedTourScreen = props => {
  const user = useSelector(state => state.user.user_details);
  const [My_Alert, setMy_Alert] = useState(false);
  const [alert_sms, setalert_sms] = useState('');
  const [loading, setLoading] = useState(false);
  const [DATA2, setDATA2] = useState([
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
    'Sun',
  ]);
  const [audio, setAudio] = useState('');
  const [Data, setDATA] = useState([]);

  useEffect(() => {
    getConfirmedTour();
  }, []);

  const getConfirmedTour = async () => {
    setLoading(true);
    // let formdata = new FormData();
    // formdata.append('status', '');
    const data = {
      user_id: user?.userid,
    };
    const {responseJson, err} = await requestGetApi(
      virtual_listing,
      data,
      'GET',
      user.token,
    );
    setLoading(false);
    if (err == null) {
      if (responseJson.status == true) {
        setDATA(responseJson.data);
      } else {
        setalert_sms(responseJson.message);
        setMy_Alert(true);
      }
    } else {
      setalert_sms(err);
      setMy_Alert(true);
    }
  };
  return (
    <View style={{backgroundColor: COLORS.White, flex: 1}}>
      <CustomHeader
        backarrow={true}
        title={'Virtual Tour Purchased'}
        onBackPress={() => {
          props.navigation.goBack();
        }}
        onNotificationPress={() => {
          props.navigation.navigate('Notification');
        }}
      />
      {Data.length > 0 ? (
        <View style={{marginTop: 10, marginBottom: 80}}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={Data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => {
              return (
                <>
                  <View
                    style={styles.touchableOpacity}
                    // onPress={() => {
                    //   props.navigation.navigate('');
                    // }}
                  >
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
                              color: '#000',
                              fontWeight: '700',
                              fontSize: Constant.textFontSize(15),
                              lineHeight: 20,
                            }}>
                            {item?.name}
                          </Text>

                          <Text
                            style={{
                              color: '#3DA1E3',
                              fontWeight: '700',
                              fontSize: Constant.textFontSize(15),
                            }}>
                            Purchase at ${item?.price}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View
                      style={{height: 200, width: '100%', alignSelf: 'center'}}>
                      <ImageBackground
                        style={[styles.imageBackground]}
                        resizeMode="stretch"
                        source={{uri: `${item?.thumbnail}`}}
                      />
                    </View>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1,
                      }}>
                      <View
                        style={{
                          top: 2,
                          width: dimensions.SCREEN_WIDTH * 0.95,
                          paddingVertical: 10,
                          // borderRadius: 20,
                          borderBottomLeftRadius: 20,
                          borderBottomRightRadius: 20,
                          backgroundColor: 'rgba(61, 161, 227, 0.9)',
                          justifyContent: 'center',
                          alignSelf: 'center',
                          shadowColor: '#000',
                          // shadowOffset: {width: 0, height: 3},
                          shadowRadius: 1,
                          shadowOpacity: 0.03,
                          // elevation: 3,
                        }}>
                        <AudioPlayer url={item?.audio} />
                      </View>
                    </View>

                    {/* <CustomButtonRound
                    stle={{
                      height: 42,
                      width: 160,
                      alignItems: 'center',
                      justifyContent: 'center',
                      alignSelf: 'center',
                      borderRadius: 50,
                      marginTop: 15,
                      marginBottom: 15,
                    }}
                    txtStyle={{
                      color: '#fff',
                      fontSize: Constant.textFontSize(14),
                      fontWeight: '400',
                    }}
                    backgroundColor={COLORS.Primary_Blue}
                    title={'Resume Playing'}
                    onPress={() => {}}
                  /> */}
                  </View>
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
    </View>
  );
};

export default ConfirmedTourScreen;

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
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    overflow: 'hidden',
  },
});
