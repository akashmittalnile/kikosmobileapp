import {View} from 'react-native';
import React from 'react';
import {COLORS} from '../../global';

const Hr = ({height, width}) => {
  return (
    <View
      style={{
        height: height,
        width: width,
        backgroundColor: COLORS.dark_grey,
      }}
    />
  );
};

export default Hr;
