import React, {useRef, useState} from 'react';
import {View, Text} from 'react-native';
import {COLORS, Constant} from '../../global';
import PhoneInput from 'react-native-phone-number-input';
const PhoneTextInput = ({
  value,
  countryCode,
  setCountryCode,
  countrySymbol = 'US',
  setCountrySymbol,
  setValue,
  placeholder,
}) => {
  //variables
  const phoneInput = useRef(null);
  //UI
  return (
    <View
      style={{
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 2,
        borderRadius: 5,
        backgroundColor: COLORS.default.light_white,
      }}>
      <PhoneInput
        ref={phoneInput}
        value={value}
        placeholder={placeholder}
        defaultValue={countryCode}
        defaultCode={`${countrySymbol}`}
        layout="first"
        onChangeText={text => {
          setValue(text);
        }}
        codeTextStyle={{
          fontSize: Constant.textFontSize(14),
        }}
        onChangeFormattedText={text => {}}
        onChangeCountry={country => {
          setCountryCode(`+${country.callingCode[0]}`);
          setCountrySymbol(country.cca2);
        }}
        textContainerStyle={{
          borderRadius: 5,
          backgroundColor: COLORS.default.light_white,
        }}
        textInputStyle={{
          borderRadius: 5,
        }}
        textInputProps={{
          value: value,
          placeholderTextColor: COLORS.default.dark_grey,
          style: {
            borderRadius: 5,
            fontSize: Constant.textFontSize(14),
            color: COLORS.default.Black,
            flex: 1,
          },
        }}
        containerStyle={{
          width: '100%',
          borderRadius: 5,
          backgroundColor: COLORS.default.light_white,
        }}
        withDarkTheme
        withShadow
      />
    </View>
  );
};

export default PhoneTextInput;
