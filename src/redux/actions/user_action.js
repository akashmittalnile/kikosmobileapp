import * as types from '../types';
import {Platform} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const SignUp = (name, email, password) => dispatch =>
  new Promise((resolve, reject) => {
    dispatch({
      type: types.LOADING,
      isLoading: true,
    });
    let formdata = new FormData();
    formdata.append('name', name);
    formdata.append('email', email);
    formdata.append('password', password);
    // Axios.post(urls.base_url+urls.register,formdata)
    // .then(response => {
    //                       dispatch({
    //                                 type: types.LOADING,
    //                                 isLoading:false
    //                             });
    //                             if(response.data.status){
    //                                AsyncStorage.setItem("user",JSON.stringify(response.data.data));
    //                             //    AsyncStorage.setItem("token",JSON.stringify(response.data.token));

    //                                  dispatch({
    //                                     type:types.SAVE_USER_RESULTS,
    //                                     user:response.data.data
    //                                        })
    //                                        dispatch({
    //                                         type:types.TOKEN,
    //                                         user:response.data.token
    //                                     })
    //                             }
    //                             resolve(response)
    //                         })
    //                             .catch(error => {
    //                                 dispatch({
    //                                     type: types.LOADING,
    //                                     isLoading:false
    //                                 });
    //                                 reject(error)
    //                             })
  });

export const myProfile = token => dispatch =>
  new Promise((resolve, reject) => {
    dispatch({
      type: types.LOADING,
      isLoading: true,
    });
    // fetch(urls.base_url+urls.my_profile, {
    //     method: 'get',
    //      headers: {
    //       'Content-Type': 'multipart/form-data',
    //       'Accept':'application/json',
    //       'Authorization': 'Bearer '+ token
    //     },
    //   }).then((responseJson) => responseJson.json())
    //         .then((responseJson) => {
    //                       dispatch({
    //                                 type: types.LOADING,
    //                                 isLoading:false
    //                             });
    //                             resolve(responseJson)
    //                         })
    //                             .catch(error => {
    //                                 dispatch({
    //                                     type: types.LOADING,
    //                                     isLoading:false
    //                                 });
    //                                 reject(error)
    //                             })
  });

export const onLogoutUser = () => {
  return {
    type: types.LOGOUT_USER,
    user: null,
  };
};

export const saveUserResult = user => {
  return {
    type: types.SAVE_USER_RESULTS,
    user: user,
  };
};
export const saveUserProfile = user => {
  return {
    type: types.SAVE_USER_PROFILE,
    user: user,
  };
};
export const saveSaloonDetails = data => {
  return {
    type: types.SALOONDETAILS,
    saloonDetails: data,
  };
};
export const saveSeviceNavigation = data => {
  return {
    type: types.SERVICENAV,
    servicenav: data,
  };
};
export const saveSelectedHairdresser = data => {
  return {
    type: types.SELECTEDHAIRDRESSER,
    selecterhairdresser: data,
  };
};
export const saveSelectedService = data => {
  return {
    type: types.SELECTEDSERVICE,
    selectedService: data,
  };
};
export const saveCorporateUserResult = data => {
  return {
    type: types.SAVE_CORP_USER_RESULTS,
    corp_user: data,
  };
};
export const saveUserToken = token => {
  return {
    type: types.TOKEN,
    user: token,
  };
};

export const setLoading = lodings => {
  return {
    type: types.LOADING,
    isLoading: lodings,
  };
};

export const setServiceType = data => {
  return {
    type: types.SERVICETYPE,
    service_type: data,
  };
};

export const setNoOfCar = data => {
  return {
    type: types.NOOFCAR,
    no_of_car: data,
  };
};

export const setNoOfDrv = data => {
  return {
    type: types.NOOFDRV,
    no_of_drv: data,
  };
};

export const setSelectedDrvTab = data => {
  return {
    type: types.SELECTEDDRVTAB,
    selected_drv_tab: data,
  };
};
export const setSelectedCarTab = data => {
  return {
    type: types.SELECTEDCARTAB,
    selected_car_tab: data,
  };
};
export const setDrvId = data => {
  return {
    type: types.DRVID,
    drv_id: data,
  };
};
export const setVehicleId = data => {
  return {
    type: types.VEHICLEID,
    vehicle_id: data,
  };
};
export const setDashBoardData = data => {
  return {
    type: types.DASHDATA,
    dash_data: data,
  };
};
