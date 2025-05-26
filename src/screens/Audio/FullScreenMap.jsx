import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
  Modal,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import CustomHeader from '../../components/CustomeHeader';
import MapView, {Marker, Polyline} from 'react-native-maps';
import {COLORS, Constant, MyIcon} from '../../global';
import MapViewDirections from 'react-native-maps-directions';
import {AudioPlayer} from 'react-native-simple-audio-player';
import {FONTS} from '../../global/Utils';
import {GoogleApiKey} from '../../WebApi/GoogleApiKey';
import LinearGradient from 'react-native-linear-gradient';
import MyText from '../../MyText/MyText';

const GOOGLE_MAPS_APIKEY = GoogleApiKey;

const FullScreenMap = props => {
  //variables : redux
  const {data} = props.route.params;
  console.log('DATATAATTA', JSON.stringify(data));

  //hook : states
  const [showAudioPlayer, setShowAudioPlayer] = useState(
    Platform.ios == 'ios' ? false : true,
  );
  const [selectedRegion, setSelectedRegion] = useState(data.region[0]);
  const lastRoute = [
    {
      latitude: data?.region[data?.region?.length - 1]?.latitude,
      longitude: data?.region[data?.region?.length - 1]?.longitude,
    },
    // {longitude: data.destination[0].lng, latitude: data.destination[0].lat},
    {
      longitude: data?.origin[0]?.lng
        ? parseFloat(data?.origin[0]?.lng)
        : parseFloat(0),
      latitude: data?.origin[0]?.lat
        ? parseFloat(data?.origin[0].lat)
        : parseFloat(0),
    },
  ];
  // const coordinates = [
  //   {
  //     latitude: 37.3318456,
  //     longitude: -122.0296002,
  //   },
  //   {
  //     latitude: 36.746841,
  //     longitude: -119.772591,
  //   },
  // ];
  //function : imp func
  const closeModal = () => {
    setSelectedRegion({});
    setShowAudioPlayer(false);
  };
  //UI
  return (
    <View style={styles.container}>
      <CustomHeader
        backarrow={true}
        title={'Virtual Tour Purchased'}
        onBackPress={() => {
          props.navigation.goBack();
        }}
        onNotificationPress={() => {
          props.navigation.navigate('Notification');
        }}
      />
      <MapView
        region={{
          latitude: data?.region[0]?.latitude
            ? parseFloat(data?.region[0]?.latitude)
            : parseFloat(0),
          longitude: data?.region[0]?.longitude
            ? parseFloat(data?.region[0]?.longitude)
            : parseFloat(0),
          latitudeDelta: 0.5,
          longitudeDelta: 0.5,
        }}
        // initialRegion={{
        //   latitude: data?.origin[0]?.lat
        //     ? parseFloat(data?.origin[0]?.lat)
        //     : parseFloat(0),
        //   longitude: data?.origin[0]?.lng
        //     ? parseFloat(data?.origin[0]?.lng)
        //     : parseFloat(0),
        //   latitudeDelta: 0.5,
        //   longitudeDelta: 0.5,
        // }}
        style={{
          flex: 1,
          // ...StyleSheet.absoluteFillObject
        }}>
        <Marker
          pinColor="orange"
          coordinate={{
            longitude: data?.origin[0]?.lng
              ? parseFloat(data?.origin[0]?.lng)
              : parseFloat(0),
            latitude: data?.origin[0]?.lat
              ? parseFloat(data?.origin[0]?.lat)
              : parseFloat(0),
          }}
        />
        <Marker
          pinColor="green"
          coordinate={{
            longitude: data?.destination[0]?.lng
              ? parseFloat(data?.destination[0]?.lng)
              : parseFloat(0),
            latitude: data?.destination[0]?.lat
              ? parseFloat(data?.destination[0]?.lat)
              : parseFloat(0),
          }}
        />

        <MapViewDirections
          origin={{
            longitude: data?.origin[0]?.lng
              ? parseFloat(data?.origin[0]?.lng)
              : parseFloat(0),
            latitude: data?.origin[0]?.lat
              ? parseFloat(data?.origin[0]?.lat)
              : parseFloat(0),
          }}
          destination={{
            longitude: data?.destination[0]?.lng
              ? parseFloat(data?.destination[0]?.lng)
              : parseFloat(0),
            latitude: data?.destination[0]?.lat
              ? parseFloat(data?.destination[0]?.lat)
              : parseFloat(0),
          }}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={4}
          strokeColor="blue"
        />
        {/* <Polyline
          coordinates={lastRoute}
          strokeWidth={4}
          strokeColor="blue"
          geodesic={true}
        /> */}
        {data?.region?.map((marker, index) => {
          return (
            <>
              <Marker
                key={index}
                title={marker.stop_name}
                onPress={() => {
                  setShowAudioPlayer(true);
                  setSelectedRegion(marker);
                }}
                coordinate={{
                  latitude: marker?.latitude,
                  longitude: marker?.longitude,
                }}>
                <TouchableOpacity
                  style={{
                    borderWidth: 3,
                    borderColor: COLORS.default.White,
                    backgroundColor: COLORS.default.red,
                    // backgroundColor:'black',
                    height: 40,
                    width: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 100,
                    zIndex: -999,
                  }}>
                  <Text
                    style={{
                      fontFamily: FONTS.alloyInk,
                      fontSize: Constant.textFontSize(16),
                      color: 'white',
                      fontWeight: '600',
                      alignSelf: 'center',
                    }}>
                    {index + 1}
                  </Text>
                </TouchableOpacity>
              </Marker>
              <MapViewDirections
                origin={data?.region[index]}
                destination={data?.region[index - 1]}
                apikey={GOOGLE_MAPS_APIKEY}
                strokeWidth={4}
                strokeColor="blue"
              />
              {/* <Polyline
                coordinates={data?.region}
                strokeWidth={4}
                strokeColor="blue"
              /> */}
            </>
          );
        })}
      </MapView>

      {showAudioPlayer && (
        <Modal transparent animationType="fade" visible={showAudioPlayer}>
          <View
            style={{
              flex: 1,
              backgroundColor: '#000000' + '66',
            }}>
            <TouchableOpacity style={{flex: 1}} onPress={closeModal} />
            <View
              style={{
                backgroundColor: COLORS.default.White,
                padding: 10,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              }}>
              <View
                style={{
                  height: Constant.myHeight / 4,
                  width: '95%',
                  alignSelf: 'center',
                }}>
                <Image
                  source={
                    selectedRegion.stop_image
                      ? {uri: selectedRegion.stop_image}
                      : require('../../assets/images/largeimages/loginlogo.png')
                  }
                  resizeMode="stretch"
                  style={{
                    height: '100%',
                    width: '100%',
                    borderRadius: 20,
                    alignSelf: 'center',
                  }}
                />
                <LinearGradient
                  style={{
                    position: 'absolute',
                    alignSelf: 'center',
                    bottom: 0,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    borderBottomLeftRadius: 20,
                    borderBottomRightRadius: 20,
                    padding: 5,
                  }}
                  colors={[
                    'rgba(61, 161, 227, 0.8)',
                    'rgba(61, 161, 227, 0.8)',
                  ]}>
                  <MyText
                    fontSize={14}
                    textAlign="center"
                    text={selectedRegion.stop_name}
                  />
                </LinearGradient>
                <TouchableOpacity
                  onPress={closeModal}
                  style={{
                    position: 'absolute',
                    right: 15,
                    top: 10,
                    margin: 10,
                    backgroundColor: COLORS.default.White,
                    borderRadius: 100,
                    padding: 5,
                  }}>
                  <MyIcon.AntDesign
                    name="closecircle"
                    size={24}
                    color={COLORS.default.secondary_blue}
                  />
                </TouchableOpacity>
              </View>

              <View
                style={{
                  top: 2,
                  paddingVertical: 10,
                  borderRadius: 20,
                  backgroundColor: 'rgba(61, 161, 227, 0.9)',
                  justifyContent: 'center',
                  alignSelf: 'center',
                  shadowColor: '#000',
                  shadowRadius: 1,
                  shadowOpacity: 0.03,
                  width: '95%',
                }}>
                <AudioPlayer
                  url={
                    data?.purchased == 1
                      ? selectedRegion.stop_audio
                      : data?.trial_audio
                  }
                />
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default FullScreenMap;
//endpoint : styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
