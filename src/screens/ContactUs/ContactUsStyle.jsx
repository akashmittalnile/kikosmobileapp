import {StyleSheet} from 'react-native';
import {COLORS, Constant} from '../../global';
export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.White,
    flex: 1,
  },
  mainView: {
    padding: 15,
  },
  elevatedView: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {width: 3, height: 0},
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 3,
    padding: 15,
    marginBottom: 15,
  },
  headingText: {
    color: '#000',
    fontWeight: '700',
    fontSize: Constant.textFontSize(16),
  },
  subHeadingText: {
    color: '#1F191C',
    fontWeight: '500',
    fontSize: Constant.textFontSize(14),
    lineHeight: 24,
    marginTop: 10,
  },
  flexRowView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '90%',
    marginVertical: 10,
  },
  secondaryText: {
    color: '#1F191C',
    fontWeight: '400',
    fontSize: Constant.textFontSize(14),
    lineHeight: 20,
    marginLeft: 10,
  },
  noteView: {
    backgroundColor: '#EAEDF7',
    paddingHorizontal: 15,
    padding: 10,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  noteText: {
    color: '#1F191C',
    fontWeight: '400',
    fontSize: Constant.textFontSize(12),
  },
});
