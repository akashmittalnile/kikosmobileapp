import COLORS from '../../global/Colors';
import {StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.Black + '66',
  },
  blurView: {
    flex: 0.6,
  },
  mainView: {
    padding: 20,
    margin: 20,
    borderRadius: 20,
    backgroundColor: COLORS.White,
  },
  imagecontainer:{
    justifyContent:'center',
    alignItems:'center'
  }
});
