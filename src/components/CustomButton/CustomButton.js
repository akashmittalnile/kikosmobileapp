import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import React from 'react';
import COLORS from '../../global/Colors';
import {FONTS, FONTS_SIZE} from '../../global/Utils';
import {Constant} from '../../global';

const CustomButton = React.memo(props => {
  let {
    title,
    onPress,
    backgroundColor,
    borderColor,
    txtStyle,
    iconimg,
    imagestyle,
  } = props;
  return (
    <TouchableOpacity
      style={[styles.container, {backgroundColor}, {borderColor}]}
      onPress={onPress ? onPress : () => {}}>
      <View style={styles.innercontainer}>
        <Image style={imagestyle} source={iconimg} />
        <Text style={[styles.title, {...txtStyle}]}> {title} </Text>
      </View>
    </TouchableOpacity>
  );
});

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    height: 118,
    width: 118,
    borderRadius: 118 / 2,
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
    borderWidth: 6,
  },
  innercontainer: {
    height: 108,
    width: 108,
    borderRadius: 108 / 2,
    alignSelf: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(228, 228, 228, 1)',
  },
  title: {
    fontSize: Constant.textFontSize(15),
    color: COLORS.light_white,
    fontWeight: '400',
    fontFamily: FONTS.alloyInk,
    textAlign: 'center',
  },
});
