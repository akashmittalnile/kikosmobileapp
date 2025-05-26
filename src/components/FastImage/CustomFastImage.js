import {View, Text} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import images from '../../global/images';

const CustomFastImage = React.memo(props => {
  let {img, containerStyle, resizeMode, imageStyle} = props;
  return (
    <View>
      <FastImage source={img} style={imageStyle} resizeMode={resizeMode} />
    </View>
  );
});

export default CustomFastImage;
