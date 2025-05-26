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

const CustomheaderCard1 = ({
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
      <View style={{marginTop: 40, marginLeft: 20}}>
        <Text style={styles.title}>{title}</Text>
        {number && <Text style={styles.number}>{number}</Text>}
        {middleView}
        {/* <TouchableOpacity style={styles.btn} onPress={pressGo}>
          <Text style={styles.btnTxt}>Go</Text>
        </TouchableOpacity> */}
      </View>

      <Image source={imageUrl} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    height: 125,
    width: '93%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    elevation: 7,
    position: 'absolute',
    marginTop: '15%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  image: {
    height: 99,
    width: 169,
    resizeMode: 'contain',
    marginTop: 10,
  },
  title: {
    fontSize: Constant.textFontSize(14),
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
    height: 35,
    width: 80,
    backgroundColor: '#3DA1E3',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 7,
  },
  btnTxt: {
    fontSize: Constant.textFontSize(14),
    fontWeight: '400',
    color: 'white',
  },
});

export default CustomheaderCard1;
