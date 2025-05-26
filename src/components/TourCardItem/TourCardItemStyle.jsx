import {StyleSheet} from 'react-native';
import {COLORS, Constant} from '../../global';
export const styles = StyleSheet.create({
  titleStyle: {
    fontSize: Constant.textFontSize(14),
    color: COLORS.default.Black,
    marginVertical: 5,
  },
  descStyle: {
    fontSize: Constant.textFontSize(18),
    color: COLORS.default.Primary_Blue,
  },
});
