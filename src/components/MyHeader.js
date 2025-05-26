import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {FONTS, FONTS_SIZE, widthScale} from '../global/Utils';
import COLORS from '../global/Colors';
import images from '../global/images';
import {Constant} from '../global';
const MyHeader = ({navigation, title, onPress, image}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress ? onPress : () => {}}>
        <Image source={images.arrowleft} style={{width: 30, height: 15}} />
      </TouchableOpacity>
      <Text style={styles.title}>{title} </Text>
      <TouchableOpacity></TouchableOpacity>
    </View>
  );
};

export default MyHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // height: heightScale(90),
    // backgroundColor: COLORS.Primary_Blue,
    padding: 15,
  },
  title: {
    fontSize: Constant.textFontSize(16),
    color: '#000',
    fontWeight: '600',
    fontFamily: FONTS.alloyInk,
  },
});
