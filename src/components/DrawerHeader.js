import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import React from 'react';
import COLORS from '../global/Colors';
import DrawerPic from '../navigation/Drawer/DrawerPic';
import {FONTS, FONTS_SIZE, heightScale, widthScale} from '../global/Utils';
import {useSelector, useDispatch} from 'react-redux';
import {Constant} from '../global';

const DrawerHeader = ({onPressprofile}, props) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user_details);
  return (
    <View style={styles.container}>
      {user.userid != null ? (
        <View style={styles.subContainer}>
          <DrawerPic />

          <TouchableOpacity onPress={onPressprofile} style={{width: 170}}>
            <Text numberOfLines={2} style={styles.headerText}>
              {user.fullname}
            </Text>
            <Text
              style={[
                styles.headerText,
                {fontSize: Constant.textFontSize(14), color: '#3DA1E3'},
              ]}>
              View Profile
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.subContainer}>
          <View style={styles.ImageContainer}>
            <Image
              source={require('../assets/images/largeimages/dummy_profile.png')}
              style={styles.image}
            />
          </View>

          <TouchableOpacity onPress={onPressprofile}>
            <Text
              style={[
                styles.headerText,
                {
                  fontSize: Constant.textFontSize(14),
                  color: '#3DA1E3',
                  fontWeight: '500',
                },
              ]}>
              Login / Signup
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* <TouchableOpacity style={styles.Btn}>
        <Text style={styles.BtnTxt}>Edit</Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default DrawerHeader;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: COLORS.Primary_Blue,
    // height: widthScale(120),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: widthScale(15),
  },
  subContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: widthScale(15),
  },
  headerText: {
    fontSize: Constant.textFontSize(16),
    color: '#1F191C',
    fontWeight: '600',
    // fontFamily: FONTS.regular,
  },
  ImageContainer: {
    height: heightScale(40),
    width: widthScale(40),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    // overflow: 'hidden',
  },
  image: {
    borderRadius: 100,
    height: heightScale(40),
    width: widthScale(40),
  },
  Btn: {
    backgroundColor: COLORS.Primary_Green,
    width: widthScale(50),
    height: heightScale(25),
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  BtnTxt: {
    color: COLORS.light_white,
    fontWeight: '600',
    fontFamily: FONTS.regular,
  },
});
