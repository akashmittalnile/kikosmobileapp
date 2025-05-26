import {StyleSheet} from 'react-native';
import COLORS from '../../global/Colors';
import {Constant} from '../../global';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  blurView: {
    flex: 1,
  },
  mainView: {
    backgroundColor: COLORS.White,
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: '10%',
  },
  forgotTxt: {
    fontSize: Constant.textFontSize(14),
    fontWeight: '400',
    color: COLORS.Primary_Blue,
    alignSelf: 'center',
  },
});
