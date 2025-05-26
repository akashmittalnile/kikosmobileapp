import {StyleSheet, View} from 'react-native';
import {heightScale, myHeight, myWidth, widthScale} from '../../global/Utils';
import COLORS from '../../global/Colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:COLORS.White,
    width:myWidth,
    height:myHeight
  },
  imageStyle: {
    height: '100%',
    width: '100%',
    resizeMode: 'stretch',
  },
  imgContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width:myWidth,
    height:myHeight
  },
  bottomLogoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 'auto',
    bottom: 30,
    gap: 8,
  },
  bbblogoStyle: {
    height: heightScale(70),
    width: widthScale(72),
  },
});
