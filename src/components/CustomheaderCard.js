import React from 'react';
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {FONTS} from '../global/Utils';
import {Constant} from '../global';

const CustomheaderCard = ({
  title,
  number,
  imageUrl,
  middleView,
  pressGo,
  onPress,
  images,
}) => {
  return (
    <View style={styles.cardContainer}>
      <View
        style={{
          marginTop: 0,
          justifyContent: 'center',
          width: 200,
          marginLeft: 20,
        }}>
        <Text style={styles.title}>{title}</Text>
        {number && <Text style={styles.number}>{number}</Text>}
        {middleView}
        <TouchableOpacity style={styles.btn} onPress={pressGo}>
          <View
            style={{
              width: 42,
              // alignSelf: 'center',
              alignItems: 'center',
              height: 42,
              borderRadius: 42 / 2,
              justifyContent: 'center',
              borderWidth: 1,
              borderColor: 'rgba(228, 228, 228, 1)',
            }}>
              <Image style={{height:28,width:28}} source={require('../assets/images/Icons/arrow-right_white.png')}/>
            {/* <Text style={styles.btnTxt}>Go</Text> */}
          </View>
        </TouchableOpacity>
      </View>

      <Image source={imageUrl} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    height: 132,
    width: '95%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    elevation: 7,
    position: 'absolute',
    marginTop: '15%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 18,
  },
  image: {
    height: 99,
    width: 169,
    resizeMode: 'contain',
    marginTop: 10,
  },
  title: {
    fontSize: Constant.textFontSize(16),
    fontWeight: '400',
    fontFamily: FONTS.regular,
    color: '#000',
  },
  number: {
    fontSize: Constant.textFontSize(16),
    fontWeight: '700',
    color: '#3DA1E3',
    lineHeight: 20,
    letterSpacing: 0.1,
    marginTop: 5,
  },
  btn: {
    height: 52,
    width: 52,
    backgroundColor: '#3DA1E3',
    borderRadius: 52 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
    borderWidth: 6,
    borderColor: '#83CDFD',
  },
  btnTxt: {
    fontSize: Constant.textFontSize(14),
    fontWeight: '400',
    color: 'white',
  },
});

export default CustomheaderCard;
