import {StyleSheet, Image, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, SPACING} from '../theme/theme';
import {heightScale, widthScale} from '../../global/Utils';
import {useSelector, useDispatch} from 'react-redux';
import {saveUserProfile} from '../../redux/actions/user_action';
import Loader from '../../WebApi/Loader';
import MyAlert from '../../components/MyAlert';
import {profile, requestGetApi, requestPostApi} from '../../WebApi/Service';

const DrawerPic = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user_details);
  const ProfileDetail = useSelector(state => state.user.ProfileDetails);
  const [My_Alert, setMy_Alert] = useState(false);
  const [alert_sms, setalert_sms] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getprofile();
  }, []);
  const getprofile = async () => {
    // setLoading(true);
    const {responseJson, err} = await requestGetApi(
      profile,
      '',
      'GET',
      user.token,
    );
    // setLoading(false);
    if (err == null) {
      if (responseJson.status == true) {
        dispatch(saveUserProfile(responseJson.data));
      }
      // else {
      //   setalert_sms(responseJson.message);
      //   setMy_Alert(true);
      // }
    } else {
      // setalert_sms(err);
      // setMy_Alert(true);
    }
  };
  return (
    <>
      {user.userid != undefined ? (
        <View style={styles.ImageContainer}>
          <Image
            source={
              ProfileDetail?.profile != null && ProfileDetail?.profile != ''
                ? {uri: `${ProfileDetail?.profile}`}
                : require('../../assets/images/largeimages/dummy_profile.png')
            }
            style={styles.image}
          />
        </View>
      ) : (
        <View style={styles.ImageContainer}>
          <Image
            source={require('../../assets/images/largeimages/dummy_profile.png')}
            style={[styles.image, {borderRadius: 100}]}
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
    </>
  );
};

export default DrawerPic;

const styles = StyleSheet.create({
  ImageContainer: {
    height: heightScale(40),
    width: heightScale(40),
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  image: {
    height: heightScale(40),
    width: widthScale(40),
    borderRadius: 100,
  },
});
