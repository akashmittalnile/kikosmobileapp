import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React from 'react';
import {FONTS, FONTS_SIZE, heightScale, widthScale} from '../../global/Utils';
import COLORS from '../../global/Colors';
import {Constant} from '../../global';

const CustomTextInput = React.memo(props => {
  let {
    inputRef,
    placeholder,
    onChangeText,
    leftView,
    rightView,
    placeholderTextColor = COLORS.Black,
    editable = true,
    selectTextOnFocus = true,
    secureTextEntry = false,
    multiline = false,
    onPress,
    value,
    numberOfLines,
    style,
  } = props;
  return (
    <View style={{overflow: 'hidden', paddingBottom: 5}}>
      <TouchableOpacity
        onPress={() => {
          onPress ? onPress() : null;
        }}
        style={[styles.inputContainer, {...style}]}>
        {leftView}
        <TextInput
          numberOfLines={numberOfLines}
          value={value}
          ref={inputRef}
          onChangeText={onChangeText}
          placeholderTextColor={COLORS.dark_grey}
          placeholder={placeholder}
          style={styles.textInput}
          editable={editable}
          secureTextEntry={secureTextEntry}
          selectTextOnFocus={selectTextOnFocus}
          multiline={multiline}
        />
        {rightView}
      </TouchableOpacity>
    </View>
  );
});

export default CustomTextInput;

const styles = StyleSheet.create({
  inputContainer: {
    height: heightScale(55),
    borderRadius: widthScale(5),
    borderWidth: 0.5,
    borderColor: COLORS.primary_white,
    width: '90%',
    backgroundColor: '#fff',
    alignSelf: 'center',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  textInput: {
    flex: 1,
    fontSize: Constant.textFontSize(13),
    fontFamily: FONTS.regular,
    marginLeft: 5,
    marginRight: 15,
    color: COLORS.Black,
  },
});
