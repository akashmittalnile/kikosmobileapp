import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import React from 'react';
import COLORS from '../../global/Colors';
import {FONTS, FONTS_SIZE} from '../../global/Utils';
import {Constant} from '../../global';
// import { Image } from 'react-native-reanimated/lib/typescript/Animated';

const CustomButtonRound = React.memo(props => {
  let {
    title,
    onPress,
    backgroundColor,
    borderColor,
    txtStyle,
    iconimg,
    imagestyle,
    stle,
  } = props;
  return (
    <TouchableOpacity
      style={[styles.container, {backgroundColor}, {borderColor}, {...stle}]}
      onPress={onPress ? onPress : () => {}}>
      <Image style={imagestyle} source={iconimg} />
      <Text style={[styles.title, {...txtStyle}]}> {title} </Text>
    </TouchableOpacity>
  );
});

export default CustomButtonRound;

const styles = StyleSheet.create({
  container: {
    height: 60,
    width: '95%',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 15,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {width: 3, height: 3},
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 3,
    margin: 4,
  },
  title: {
    fontSize: Constant.textFontSize(14),
    color: COLORS.light_white,
    fontWeight: '400',
    fontFamily: FONTS.medium,
    textAlign: 'center',
  },
});
