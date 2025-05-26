import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {Dimensions, Platform} from 'react-native';
export function checkPlatForm() {
  return Platform.OS;
}
export const myWidth = Dimensions.get('window').width;
export const myHeight = Dimensions.get('window').height;

const standardWidth = 375.0;
const standardHeight = 812.0;

export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/;
export var EmailReg =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export function widthScale(dimension) {
  return (dimension / standardWidth) * myWidth;
}
export const GOOGLE_API_KEY = `AIzaSyBGY9oosi2-AXKw0yQSO4_0NjudOEPnGmM`;
export function heightScale(dimension) {
  return (dimension / standardHeight) * myHeight;
}
export const textFontSize = value => {
  return RFValue(value);
};
export const FONTS = {
  bold: 'OpenSans-Bold',
  regular: 'OpenSans-Regular',
  light: 'OpenSans-Light',
  medium: 'OpenSans-Medium',
  semibold: 'OpenSans-SemiBold',
  alloyInk: 'aAlloyInk',
};
export const FONTS_SIZE = {
  h1: widthScale(20),
  h2: widthScale(18),
  h3: widthScale(16),
  h4: widthScale(14),
  body3: widthScale(12),
  body4: widthScale(10),
  body5: widthScale(8),
};
