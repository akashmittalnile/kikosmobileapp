//import : react components
import React from 'react';
import {View} from 'react-native';
//import : custom components
import CustomHeader from '../../components/CustomeHeader';
//import : third parties
import {WebView} from 'react-native-webview';
//import : styles
import {styles} from './WebViewPageStyle';

const WebViewPage = ({route, navigation}) => {
  //variables
  const {url, title} = route?.params?.data;
  //UI
  return (
    <View style={styles.container}>
      <CustomHeader
        backarrow={true}
        title={title}
        onBackPress={() => {
          navigation.goBack();
        }}
      />
      <WebView contentMode="mobile" source={{uri: url}} />
    </View>
  );
};

export default WebViewPage;
