import React, {useState} from 'react';
import {View, Text, Modal, TouchableOpacity, StyleSheet} from 'react-native';
import COLORS from '../../global/Colors';
import {myHeight} from '../../global/Utils';

const SignupModal = React.memo(props => {
  let {onPress, children, isVisiable, containrStyle} = props;
  return (
    <Modal animationType="slide" transparent={true} visible={isVisiable}>
      <View style={styles.modalContainer}>
        <TouchableOpacity
          style={styles.blurView}
          onPress={() => {
            onPress();
          }}
        />

        <View style={[styles.mainView, {...containrStyle}]}>{children}</View>
      </View>
    </Modal>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  blurView: {
    flex: 1,
  },
  mainView: {
    padding: 20,
    backgroundColor: COLORS.light_white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: myHeight * 0.3,
    bottom: 0,
    position: 'absolute',
    width: '100%',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
});

export default SignupModal;
