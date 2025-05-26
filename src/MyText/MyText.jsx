import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {COLORS, Constant} from '../global';

const MyText = ({
  text,
  fontSize = 14,
  textColor = COLORS.default.Black,
  textAlign,
  marginLeft,
  numberOfLines,
  width,
  marginVertical,
  alignSelf,
fontFamily,
fontWeight
}) => {
  const styles = StyleSheet.create({
    textStyle: {
      color: textColor,
      fontSize: Constant.textFontSize(fontSize),
      textAlign: textAlign,
      marginLeft,
      width,
      marginVertical,
      alignSelf,
      fontFamily,
      fontWeight
    },
  });
  return (
    <Text numberOfLines={numberOfLines} style={styles.textStyle}>
      {text}
    </Text>
  );
};

export default MyText;
