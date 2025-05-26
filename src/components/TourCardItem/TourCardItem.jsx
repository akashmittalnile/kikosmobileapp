import {View, Text, Image} from 'react-native';
import React from 'react';
import {styles} from './TourCardItemStyle';
const TourCardItem = ({
  image_src = require('../../assets/images/Icons/clock.png'),
  title,
  value,
}) => {
  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <Image
        style={{width: 24, height: 24, resizeMode: 'stretch'}}
        source={image_src}
      />
      <Text style={styles.titleStyle}>{title}</Text>
      <Text style={styles.descStyle}>{value}</Text>
    </View>
  );
};

export default TourCardItem;
