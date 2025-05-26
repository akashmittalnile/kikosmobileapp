import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {Constant} from '../global';

const CustomCard = ({title, countvalue}) => {
  return (
    <TouchableOpacity style={styles.cardContainer}>
      <ImageBackground
        resizeMode="stretch"
        source={require('../assets/images/largeimages/1.png')}
        style={styles.backgroundImage}
        blurRadius={10} // Adjust blur intensity as needed
      >
        <View style={styles.cardContent}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{countvalue}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 257,
    // aspectRatio: 13 / 7, // You can adjust the aspect ratio based on your design
    borderRadius: 30,
    overflow: 'hidden',
    marginVertical: 10,
  },
  backgroundImage: {
    flex: 1,
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
  },
  cardContent: {
    // justifyContent:'center',
    // alignItems:'center',
    backgroundColor: 'transparent',
    padding: 16,
    // backgroundColor: 'rgba(0, 0, 0, 0.3)', // Adjust the background color and opacity
  },
  title: {
    fontSize: Constant.textFontSize(12),
    lineHeight: 20,
    color: 'white',
    fontWeight: '400',
  },
  description: {
    fontSize: Constant.textFontSize(16),
    color: '#3DA1E3',
    // color: 'white',
  },
});

export default CustomCard;
