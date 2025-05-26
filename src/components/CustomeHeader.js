import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import images from '../global/images';
import {FONTS} from '../global/Utils';
import COLORS from '../global/Colors';
import {Constant} from '../global';

const CustomeHeader = ({
  title,
  showNotification,
  onNotificationPress,
  onBackPress,
  backarrow = false,
}) => {
  return (
    <View style={styles.container}>
      {backarrow ? (
        <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
          <Image source={images.arrowleft} style={styles.arrowIcon} />
        </TouchableOpacity>
      ) : (
        <View style={styles.backButton}></View>
      )}

      <View style={styles.titleContainer}>
        <Text numberOfLines={1} style={styles.title}>
          {title}
        </Text>
      </View>
      <View style={{flex: 0.1}}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    height: 80,
    borderBottomRightRadius: 20,
    backgroundColor: COLORS.Primary_Blue,
    borderBottomLeftRadius: 20,
  },
  backButton: {
    padding: 10,
  },
  arrowIcon: {
    width: 25,
    height: 25,
    tintColor: 'white', // You can customize the color of the arrow icon
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    fontFamily: FONTS.alloyInk,
  },
  title: {
    color: 'white',
    fontSize: Constant.textFontSize(15),
    fontFamily: FONTS.alloyInk,
    textAlign: 'center',
  },
  notificationButton: {
    padding: 10,
  },
  notificationIcon: {
    width: 20,
    height: 20,
    tintColor: 'white', // You can customize the color of the notification icon
  },
});

export default CustomeHeader;
