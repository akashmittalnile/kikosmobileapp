//import : react components
import React, {useState, useEffect} from 'react';
import {
  Image,
  Text,
  View,
  RefreshControl,
  TouchableOpacity,
  Linking,
  Platform,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
//import : custom components
import CustomHeader from '../../components/CustomeHeader';
import Loader from '../../WebApi/Loader';
//import : utils
import {contact_us, getAPI} from '../../WebApi/Service';
//import : styles
import {styles} from './ContactUsStyle';
import {useIsFocused} from '@react-navigation/core';
//import : redux

const ContactUs = props => {
  //variables
  const isFocused = useIsFocused();
  //hook : states
  const [contactInfo, setContactInfo] = useState({});
  //hook : modal states
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  //function : imp func
  const dialCall = num => {
    let phoneNumber = '';
    if (Platform.OS === 'android') {
      phoneNumber = 'tel:' + '+1' + num;
    } else {
      phoneNumber = 'tel:' + '+1' + num;
    }
    Linking.openURL(phoneNumber);
  };
  const sendEmail = myMail => {
    Linking.openURL(`mailto:${myMail}`);
  };
  const onRefresh = async () => {
    setRefreshing(true);
    await getContactUs();
    setRefreshing(false);
  };
  //function : serv func
  const getContactUs = async () => {
    setLoading(true);
    try {
      const {response, status} = await getAPI(contact_us);
      if (status) {
        setContactInfo(response.data);
      }
    } catch (error) {
      console.error('error in getContactUs', error);
    }
    setLoading(false);
  };
  //hook : useEffect
  useEffect(() => {
    getContactUs();
    return () => {};
  }, [isFocused]);
  //UI
  return (
    <View style={styles.container}>
      <CustomHeader
        backarrow={true}
        title={'Contact Us'}
        onBackPress={() => {
          props.navigation.goBack();
        }}
      />
      <ScrollView
        style={styles.mainView}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.elevatedView}>
          <Text style={styles.headingText}>
            {contactInfo.country_code} {contactInfo.contact_num}
          </Text>
          <Text style={styles.subHeadingText}>{contactInfo.description}</Text>
        </View>
        <View style={styles.elevatedView}>
          <Text style={styles.headingText}>
            {contactInfo?.additional_information?.title}
          </Text>
          <View style={styles.flexRowView}>
            <Image
              source={require('../../assets/images/Icons/location_black.png')}
              style={{height: 25, width: 25}}
            />
            <Text style={styles.secondaryText}>
              {contactInfo?.additional_information?.location}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => {
              dialCall(contactInfo?.additional_information?.number);
            }}
            style={styles.flexRowView}>
            <Image
              source={require('../../assets/images/Icons/call_icon_black.png')}
              style={{height: 25, width: 25}}
            />
            <Text style={styles.secondaryText}>
              +1 {contactInfo?.additional_information?.number}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              sendEmail(contactInfo?.additional_information?.email);
            }}
            style={styles.flexRowView}>
            <Image
              source={require('../../assets/images/Icons/sms_black.png')}
              style={{height: 25, width: 25}}
            />
            <Text style={styles.secondaryText}>
              {contactInfo?.additional_information?.email}
            </Text>
          </TouchableOpacity>
          {contactInfo?.additional_information?.note && (
            <View style={styles.noteView}>
              <Text style={styles.noteText}>
                {contactInfo?.additional_information?.note}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
      {loading ? <Loader /> : null}
    </View>
  );
};

export default ContactUs;
