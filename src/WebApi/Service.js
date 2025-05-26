import axios from 'axios';
import React, {useEffect, useState, useRef} from 'react';
import {View, useColorScheme} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
// export const baseUrl = 'http://100.21.178.252/api/';
export const baseUrl = 'http://nileprojects.in/kikos/api/';

//API END POINT LISTS

export const register = 'register';
export const login = 'login';
export const verify_otp = 'verify-otp';
export const send_otp = 'send-otp';
export const Signup_mail_otp = 'mail-otp';
export const tour_details = `tour-detail`;
export const callback_request = `callback-request`;
export const get_virtual_tour = 'virtual-tour-listing';
export const virtual_tour_detail = 'virtual-tour-detail';
export const virtual_tour_stop_detail = `virtual-tour-stop-detail`;
export const get_tax_booking_list = 'taxi-booking-list';
export const booking_tour = 'booking-tour';
export const change_password = 'change-password';
export const update_profile = 'update-profile';
export const forgotPassword = 'forget-password';
export const calendarEvents = 'calendarEvents';
export const taxi_calendar = 'taxi-calendar';
export const get_book_tour = 'book-tour';
export const home = 'home';
export const booking_taxi = 'booking-taxi';
export const photo_booth_listing = 'photo-booth-listing';
export const photo_booth_details = 'photo-booth-details';
export const timezone_list = 'TimeZoneList';
export const Photo_BoothPurchase_Listing = 'Photo-BoothPurchase-Listing';
export const confirmed_tour = 'confirmed-tour';
export const payment = 'pay';
export const confirmed_tour_details = 'confirmed-tour-detail';
export const bookingPhotoBooth = 'bookingPhotoBooth';
export const get_notifications = 'get-notifications';
export const count_notifications = `count-notifications`;
export const clear_notifications = 'clear-notifications';
export const user_status = 'user-status';
export const free_callback_request = 'free-callback-request';
export const contact_us = `contact-us`;
export const virtual_listing = `virtual-tour-stop-listing`;
export const verify_otp_res = 'apicontroller/verify_otp_res';
export const facilities = 'apicontroller/facilities';
export const forgotPasswordw = 'apicontroller/forgotPassword';
export const country = 'country';
export const state = 'state';
export const city = 'city';
export const profile = 'profile';
export const update_profile2 = 'update-profile';
export const get_count = `get-count`;
export const getAPI = async (endPoint, token = '', paramsData = {}) => {
  const url = baseUrl + endPoint + objToQueryString(paramsData);
  console.log('GET URL=>', url);
  return await axios
    .get(url, {
      headers: {
        Authorization: `${
          token == null || token == '' ? '' : 'Bearer ' + token
        } `,
        'Content-Type': 'application/json',
        Accept: '*/*',
      },
    })
    .then(res => {
      return {response: res?.data, status: res?.status === 200 ? true : false};
    })
    .catch(err => {
      return {response: err, status: false};
    });
};
export const requestPostApi = async (endPoint, body, method, token) => {
  var header = {};
  if (token != '' && token != undefined) {
    header = {
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
      'Cache-Control': 'no-cache',
    };
  } else {
    header = {Accept: 'application/x-www-form-urlencoded'};
  }

  var url = baseUrl + endPoint;
  console.log('POST Url:-' + url + '\n');
  console.log('POST DATA:-', body);
  try {
    let response = await fetch(url, {
      method: method,
      body: body,
      headers: header,
    });
    let code = await response.status;
    if (code == 200) {
      let responseJson = await response.json();
      return {responseJson: responseJson, err: null};
    } else if (code == 400 || code == 402 || code == 404) {
      let responseJson = await response.json();
      //Completion block
      return {responseJson: null, err: responseJson.message};
    } else {
      return {responseJson: null, err: 'Something went wrong!'};
    }
  } catch (error) {
    console.error('in Service screen', error);
    return {
      responseJson: null,
      err: 'Something Went Wrong!',
    };
  }
};

export const requestGetApi = async (endPoint, body, method, token) => {
  var header = {};
  var url = baseUrl + endPoint;

  if (token != '' && token != undefined) {
    header = {
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
      'Cache-Control': 'no-cache',
    };
  } else {
    header = {};
  }

  //url = url + objToQueryString(body)
  console.log('GET Url:-' + url + '\n');
  console.log('GET DATA:-', body);
  try {
    let response = await fetch(url, {
      method: method,
      headers: header,
    });
    let code = await response.status;
    if (code == 200) {
      let responseJson = await response.json();
      return {responseJson: responseJson, err: null, code: code};
    } else if (code == 400) {
      return {responseJson: null, err: responseJson.message, code: code};
    } else if (code == 500) {
      return {responseJson: null, err: 'Something Went Wrong', code: code};
    } else {
      return {responseJson: null, err: 'Something went wrong!', code: code};
    }
  } catch (error) {
    console.error('in Service screen', error);
    // Alert.alert("",'Please check your internet connection and try again!')
    return {
      responseJson: null,
      err: 'Something Went Wrong!',
      code: 500,
    };
  }
};

export const requestPostApiMedia = async (
  endPoint,
  formData,
  method,
  token,
) => {
  var header = {};

  if (token != '' && token != undefined) {
    header = {
      'Content-type': 'multipart/form-data',
      apitoken: token,
      'Cache-Control': 'no-cache',
    };
  } else {
    if (endPoint != signUpApi) {
      header = {
        'Content-type': 'multipart/form-data',
        'Cache-Control': 'no-cache',
      };
    }
  }

  var url = baseUrl + endPoint;
  console.log('POST Url:-' + url + '\n');
  console.log('POST DATA:-', formData + '\n');

  try {
    let response = await fetch(url, {
      method: method,
      body: formData,

      headers: header,
    });

    let code = await response.status;

    if (code == 200) {
      let responseJson = await response.json();
      return {responseJson: responseJson, err: null};
    } else if (code == 400) {
      let responseJson = await response.json();
      return {responseJson: null, err: responseJson.message};
    } else {
      return {responseJson: null, err: 'Something went wrong!'};
    }
  } catch (error) {
    console.error('the error of the uploade image is ==>>', error);
    return {
      responseJson: null,
      err: 'Something Went Wrong!',
    };
  }
};

export const requestPostApiSignUp = async (endPoint, formData, method) => {
  var url = baseUrl + endPoint;
  console.log('POST Url:-' + url + '\n');
  console.log('POST DATA:-', formData + '\n');

  try {
    let response = await fetch(url, {
      method: method,
      body: formData,
    });

    let code = await response.status;

    if (code == 200) {
      let responseJson = await response.json();
      return {responseJson: responseJson, err: null};
    } else if (code == 400 || 402) {
      let responseJson = await response.json();

      return {responseJson: null, err: responseJson.msg};
    } else {
      return {responseJson: null, err: 'Something went wrong!'};
    }
  } catch (error) {
    return {
      responseJson: null,
      err: 'Something Went Wrong!',
    };
    console.error(error);
  }
};

const objToQueryString = obj => {
  const keyValuePairs = [];
  for (const key in obj) {
    keyValuePairs.push(
      encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]),
    );
  }
  return keyValuePairs.length == 0 ? '' : '?' + keyValuePairs.join('&');
};
