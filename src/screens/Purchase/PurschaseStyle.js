import {StyleSheet} from 'react-native';
import COLORS from '../../global/Colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.White,
  },
  mainView: {
    padding: 20,
  },
  debitCardView: {
    backgroundColor: COLORS.light_white,
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: COLORS.grey,
  },
  insideTextView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  buttonView: {
    backgroundColor: COLORS.red,
    alignSelf: 'flex-start',
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 100,
  },
  itemsStyle: {
    flexDirection: 'row',
    marginVertical: 5,
    justifyContent: 'space-between',
  },
  paymentMethodsView: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: COLORS.BORDER_GREY,
    backgroundColor: COLORS.light_white,
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    height:65,
    width:'95%'
  },
  couponViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
    borderRadius: 20,
    borderWidth: 0.5,
    backgroundColor: COLORS.light_white,
    borderColor: COLORS.BORDER_GREY,
  },
  applyButtonStyle: {
    backgroundColor: COLORS.red,
    padding: 10,
    marginRight: 1,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  couponHeaderView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});