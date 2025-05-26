//import : react components
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  RefreshControl,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
//import : custom components
import CustomHeader from '../../components/CustomeHeader';
import Loader from '../../WebApi/Loader';
import MyAlert from '../../components/MyAlert';
//import : third parties
import Toast from 'react-native-toast-message';
//import : utils
import COLORS from '../../global/Colors';
import {FONTS, heightScale} from '../../global/Utils';
import images from '../../global/images';
import {Constant} from '../../global';
import {
  clear_notifications,
  get_notifications,
  requestPostApi,
} from '../../WebApi/Service';
//import : redux
import {useSelector} from 'react-redux';

const Notification = props => {
  //variables
  const user = useSelector(state => state.user.user_details);
  const focused = useIsFocused();
  //hook : states
  const [refreshing, setRefreshing] = React.useState(false);
  const [My_Alert, setMy_Alert] = useState(false);
  const [alert_sms, setalert_sms] = useState('');
  const [loading, setLoading] = useState(false);
  const [DATA, setDATA] = useState([]);
  //function : imp func
  const onRefresh = async () => {
    setRefreshing(true);
    await getNotifications();
    setRefreshing(false);
  };

  //function : serv func
  const getNotifications = async () => {
    setLoading(true);
    let formdata = new FormData();
    formdata.append('user_id', user?.userid != undefined ? user?.userid : '');
    formdata.append('is_read', 1);
    const {responseJson, err} = await requestPostApi(
      get_notifications,
      formdata,
      'POST',
      '',
    );
    console.log('ggdfggffgfg', responseJson);
    if (err == null) {
      if (responseJson.status == true) {
        setDATA(responseJson.data.notifications);
      } else {
        setalert_sms(responseJson.message);
        setMy_Alert(true);
      }
    } else if (err == null) {
      setalert_sms(err);
      setMy_Alert(true);
    }
    setLoading(false);
  };

  const ClearNotification = async () => {
    setLoading(true);
    let formdata = new FormData();
    formdata.append('clear', 1);
    formdata.append('user_id', user?.userid != undefined ? user?.userid : '');
    const {responseJson, err} = await requestPostApi(
      clear_notifications,
      formdata,
      'POST',
      user.token,
    );
    if (err == null) {
      if (responseJson.status == true) {
        Toast.show({type: 'info', text1: responseJson.message});
        getNotifications();

        setLoading(false);
      } else {
        setalert_sms(responseJson.message);
        setMy_Alert(true);
        setLoading(false);
      }
    } else {
      setLoading(false);
      setalert_sms(err);
      setMy_Alert(true);
    }
  };

  //hooks useEffect
  useEffect(() => {
    getNotifications();
  }, [focused]);
  //UI
  return (
    <View style={styles.mainContainer}>
      <CustomHeader
        backarrow={true}
        title={'Notificationsð'}
        onBackPress={() => {
          props.navigation.goBack();
        }}
      />
      <ScrollView
        style={styles.mainView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}>
        {DATA?.length > 1 ? (
          <TouchableOpacity
            onPress={() => {
              ClearNotification();
            }}
            style={{
              justifyContent: 'center',
              alignItems: 'flex-end',
              width: '100%',
              paddingTop: 10,
            }}>
            <Text
              style={{
                color: COLORS.Primary_Blue,
                fontSize: Constant.textFontSize(15),
                textAlign: 'center',
                fontFamily: FONTS.bold,
              }}>
              Clear All
            </Text>
          </TouchableOpacity>
        ) : null}
        <View
          style={{
            width: '100%',
            alignSelf: 'center',
            marginTop: 6,
            paddingHorizontal: 10,
          }}>
          {DATA?.length > 0 ? (
            DATA?.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={{
                    width: '100%',
                    alignSelf: 'center',
                    backgroundColor: '#fff',
                    borderRadius: 10,
                    marginVertical: 10,
                  }}>
                  <View style={styles.container}>
                    <Image
                      source={images.notificationbell}
                      style={{height: 70, width: 70}}
                    />
                    <View style={{width: '70%'}}>
                      <Text style={styles.text}>{item?.notification}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })
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
                No Notifications
              </Text>
            </View>
          )}
          <View style={{height: 40}} />
        </View>
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

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  mainView: {
    padding: 20,
  },
  container: {
    // backgroundColor: COLORS.primary_white,
    height: heightScale(120),
    alignSelf: 'center',
    // marginTop: 20,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    gap: 10,
  },
  text: {
    fontSize: Constant.textFontSize(12),
    fontFamily: FONTS.regular,
    color: COLORS.grey,
  },
  txt: {
    fontSize: Constant.textFontSize(11),
    fontFamily: FONTS.regular,
    color: '#CECECE',
    fontWeight: '400',
  },
});

export default Notification;
