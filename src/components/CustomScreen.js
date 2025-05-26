import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {COLORS, Constant} from '../global';

const CustomScreen = ({image, title, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={{width: '20%'}}>
        <Image source={image} style={styles.image} />
      </View>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    marginBottom: 10,
  },
  image: {
    width: Constant.textFontSize(20),
    height: Constant.textFontSize(20),
    marginRight: Constant.textFontSize(20) / 2,
  },
  title: {
    width: '75%',
    fontSize: Constant.textFontSize(14),
    color: COLORS.default.Black,
  },
});

export default CustomScreen;
