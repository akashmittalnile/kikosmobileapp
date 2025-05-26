import {View, Text,Image} from 'react-native';
import React, {useEffect} from 'react';
import {styles} from './Splash.style';
import CustomFastImage from '../../components/FastImage/CustomFastImage';
import images from '../../global/images';

const Splash = props => {
  let {navigation} = props;
  useEffect(() => {
    // setTimeout(() => {
    //   navigation.navigate('AuthRoute');
    // }, 2000);
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Image style={styles.imageStyle} source={images.splash}></Image>   
           </View>
     
    </View>
  );
};

export default Splash;
