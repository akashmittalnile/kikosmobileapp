import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector, useDispatch} from 'react-redux';
import {saveUserResult} from '../redux/actions/user_action';
import messaging from '@react-native-firebase/messaging';
import {setDeviceToken} from '../redux/actions/latLongAction';
import Splash from '../screens/Splash/Splash';
import DrawerNavigator from '../../src/navigation/Drawer/Drawer';
import AuthRoute from '../../src/navigation/AuthRoute';

const MainNav = (props) => {
  const [showSplash, setShowSplash] = useState(true);
  const dispatch = useDispatch();
  const isSignedIn = useSelector(state => state.user.user_details);
  const getAllValues = async () => {
    const user = await AsyncStorage.getItem('kikos');
    setShowSplash(false);
    if (user) {
      dispatch(saveUserResult(JSON.parse(user)));
    } else {
      // var dddd= {"about": "", "address": "", "cert_no": "", "city": "", "country": "0", "created_at": "", "current_salon": "", "dob": "", "email": "", "experience": "", "expiry_date": "", "expiry_date1": "", "facilities": "", "featured": "0", "gender": "", "hobbies": "", "id": null, "id_proof": "", "language": "", "license": "", "license_num": "", "license_num1": "", "location": "", "name": "", "nationality": "", "otp": "", "owner_image": "", "owner_name": "", "password": "4e652ad08eba102e0658176641dc6da6", "phone": "", "phone1": "", "previous_location": "", "previous_salon": "", "profile": "1", "qualification": "", "salon_image": "", "salon_type": "", "service": "", "slogan": "", "state": "", "status": "1", "type": "customer", "unique_id": "", "vat": "", "video": ""}
      // dispatch(saveUserResult(dddd))
    }
  };
  useEffect(() => {
    gettoken();
    const timeout = setTimeout(async () => {
      getAllValues();
    }, 5000);
  }, []);
  const gettoken = async () => {
    //  await messaging().registerDeviceForRemoteMessages();
    const token = await messaging().getToken();
    dispatch(setDeviceToken(token));
  };

  if (showSplash) {
    return <Splash />;
  }

  return isSignedIn ? <DrawerNavigator /> : <AuthRoute />;
};
export default MainNav;
