//import : react components
import React, {useState} from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Modal,
  Keyboard,
} from 'react-native';
//import : custom components
import OTPArea from '../../components/OTPArea/OTPArea';
import CustomButton from '../../components/CustomButton/CustomButton';
import Loader from '../../WebApi/Loader';
//import : third parties
import Toast from 'react-native-toast-message';
//import : utils
import COLORS from '../../global/Colors';
import {Constant, MyIcon} from '../../global';
import {
  Signup_mail_otp,
  requestPostApi,
  send_otp,
  verify_otp,
} from '../../WebApi/Service';
//import : styles
import {styles} from './OtpVerificationStyle';

const OtpVerification = ({
  visible,
  username,
  setVisibility,
  codeInfo,
  nextFunction = () => {},
}) => {
  //hook : states

  const [codeDetail, setCodeDetail] = useState({});
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  //function :
  const closeModal = () => {
    setVisibility(false);
  };
  const clearState = () => {
    setOtp('');
  };
  //function : imp func
  const onShowHandle = () => {
    clearState();
    setCodeDetail(codeInfo);
  };
  const validation = () => {
    if (otp.trim().length < 4) {
      Toast.show({
        type: 'error',
        text2: 'Please enter OTP',
      });
    } else if (otp != codeDetail.code) {
      Toast.show({
        type: 'error',
        text2: 'Please enter valid OTP',
      });
    } else return true;
  };
  //function : serv func
  const VerifyOtpApi = async () => {
    if (validation()) {
      setLoading(true);
      let formdata = new FormData();
      formdata.append('email', codeDetail.email);
      formdata.append('otp', otp);
      const {responseJson, err} = await requestPostApi(
        verify_otp,
        formdata,
        'POST',
        '',
      );
      setLoading(false);
      if (err == null) {
        if (responseJson.status == true) {
          closeModal();
          clearState();
          nextFunction(responseJson);
        } else {
          //   setModalVisibleSendOtp(false);
          //   setState('');
          //   setalert_sms(responseJson.message);
          //   setMy_Alert(true);
        }
      } else if (err == null) {
        // setModalVisibleSendOtp(false);
        // setState('');
        // setalert_sms(err);
        // setMy_Alert(true);
      }
    }
  };
  const resendOtp = async () => {
    setLoading(true);
    let formdata = new FormData();
    formdata.append('fullname', username);
    formdata.append('email', codeDetail.email);
    const {responseJson, err} = await requestPostApi(
      Signup_mail_otp,
      formdata,
      'POST',
      '',
    );
    console.debug(responseJson);
    setLoading(false);
    if (err == null) {
      if (responseJson.status == true) {
        Toast.show({
          type: 'info',
          text1: 'OTP Resent Successfully',
        });
        setCodeDetail(responseJson);
      } else {
      }
    } else if (err == null) {
    } else {
    }
  };
  //UI
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onShow={onShowHandle}
      onRequestClose={() => closeModal()}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.blurView}
            onPress={() => Keyboard.dismiss()}
          />
          <View style={styles.mainView}>
            <TouchableOpacity
              style={{
                alignSelf: 'flex-end',
                backgroundColor: 'grey',
                borderRadius: 100,
              }}
              onPress={() => closeModal()}>
              <MyIcon.AntDesign
                name="closecircle"
                size={Constant.textFontSize(26)}
              />
            </TouchableOpacity>
            <Text
              style={{
                color: '#000',
                marginTop: 30,
                fontSize: Constant.textFontSize(16),
                fontWeight: '700',
                textAlign: 'center',
              }}>
              Verification required
            </Text>
            <Text
              style={{
                color: '#000',
                textAlign: 'center',
                marginTop: 10,
                fontSize: Constant.textFontSize(14),
                fontWeight: '400',
                lineHeight: 25,
              }}>
              To continue, complete this verification step. We've send a One
              Time Password (OTP) to the email{' '}
              <Text
                style={{
                  color: '#000',
                  textDecorationLine: 'underline',
                  fontSize: Constant.textFontSize(14),
                  fontWeight: '400',
                  alignSelf: 'center',
                }}>
                {codeDetail?.email}
              </Text>
              . Please enter it below.
            </Text>
            <OTPArea value={otp} setValue={setOtp} />
            <TouchableOpacity
              style={styles.forgotContainer}
              onPress={() => {
                resendOtp();
                clearState();
              }}>
              <Text style={[styles.forgotTxt, {marginTop: 10}]}>
                Resend OTP
              </Text>
            </TouchableOpacity>

            <CustomButton
              title={'Verify'}
              borderColor={COLORS.border_blue}
              onPress={() => VerifyOtpApi()}
              backgroundColor={COLORS.Primary_Blue}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
      <Toast />
      {loading ? <Loader /> : null}
    </Modal>
  );
};

export default OtpVerification;
