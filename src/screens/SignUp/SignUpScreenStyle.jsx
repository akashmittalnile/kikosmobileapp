import {StyleSheet} from 'react-native';
import {FONTS, heightScale, widthScale} from '../../global/Utils';
import COLORS from '../../global/Colors';
import {Constant} from '../../global';

const styles = StyleSheet.create({
  topImgContainer: {
    flex: 0.4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: heightScale(170),
    width: widthScale(236),
    resizeMode: 'contain',
  },
  forgotTxt: {
    fontSize: Constant.textFontSize(13),
    fontWeight: '400',
    color: COLORS.Primary_Blue,
    // fontFamily: FONTS.regular,
    alignSelf: 'center',
  },
  container: {
    flex: 0.9,
    backgroundColor: '#ffff',

    bottom: 0,
    height: '49%',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    width: '100%',
  },
  loginTxt: {
    alignSelf: 'center',
    color: COLORS.Primary_Blue,
    marginTop: widthScale(20),
    fontSize: Constant.textFontSize(14),
    fontWeight: '700',
    fontFamily: FONTS.bold,
  },
  SignupTxtContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    gap: 5,
    bottom: 10,
  },
  txtStyle: {
    fontSize: Constant.textFontSize(14),
    fontFamily: FONTS.regular,
    color: COLORS.grey,
    fontWeight: '600',
  },
  signup: {
    fontSize: Constant.textFontSize(14),
    fontFamily: FONTS.regular,
    fontWeight: '600',
    color: COLORS.Primary_Green,
  },
  forgotContainer: {
    alignSelf: 'center',
    // marginRight: 20,
    marginTop: 10,
  },
  underlineStyleBase: {
    width: 45,
    height: 45,
    borderWidth: 0.8,
    borderBottomWidth: 1,
    color: '#000000',
  },

  underlineStyleHighLighted: {
    borderColor: '#3DA1E3',
  },
});

export default styles;
