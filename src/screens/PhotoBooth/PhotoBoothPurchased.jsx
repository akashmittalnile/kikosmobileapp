//import : react components
import React, {useState, useCallback, useRef, useEffect} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  Platform,
  PermissionsAndroid,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
//import : custom components
import CustomHeader from '../../components/CustomeHeader';
import CustomButtonRound from '../../components/CustomButton/CustomButtonRound';
import Loader from '../../WebApi/Loader';
//import : custom components
import FastImage from 'react-native-fast-image';
import AppIntroSlider from 'react-native-app-intro-slider';
import {createThumbnail} from 'react-native-create-thumbnail';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-toast-message';
import {ScrollView} from 'react-native-gesture-handler';
import ReactNativeBlobUtil from 'react-native-blob-util';
//import : utils
import images from '../../global/images';
import {FONTS} from '../../global/Utils';
import {dimensions} from '../../utility/Mycolors';
import COLORS from '../../global/Colors';
import {photo_booth_details, requestPostApi} from '../../WebApi/Service';
import {Constant} from '../../global';
//import : modal
import MyAlert from '../../components/MyAlert';
import {VideoModel} from '../../components/VideoModel';
import ImageModal from '../../modals/ImageModal/ImageModal';
//import : redux
import {useSelector} from 'react-redux';
import ProgressBar from '../../components/ProgressBar/ProgressBar';

const PhotoBoothPurchased = props => {
  //variables
  const currentLink = useRef('');
  const user = useSelector(state => state.user.user_details);
  const [My_Alert, setMy_Alert] = useState(false);
  const [alert_sms, setalert_sms] = useState('');
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [photoBoothDetail, setPhotoBoothDetail] = useState('');
  const [modulevisible, setmodulevisible] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [imagess, setImages] = useState('');
  const [allImg, setAllImg] = useState([{img: ''}]);
  const [showModal, setShowModal] = useState({isVisible: false, data: null});
  const [activeIndex, setActiveIndex] = useState(0);
  const [files, setFiles] = useState([]);
  const [visible, setVisible] = useState(false);
  const [downloadPercent, setDownloadPercent] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const onViewableItemsChanged = useCallback(({viewableItems}) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }, []);

  const handleSlideChange = index => {
    setActiveIndex(index);
  };
  const handleNext = () => {
    if (activeIndex < slides.length - 1) {
      setActiveIndex(activeIndex + 1);
    } else {
      // Handle completion of slides
      // For example, navigate to the main screen
    }
  };
  const PostphotobothDetails = async id => {
    setLoading(true);
    let formdata = new FormData();
    formdata.append('id', id);
    const {responseJson, err} = await requestPostApi(
      photo_booth_details,
      formdata,
      'POST',
      user.token,
    );
    setLoading(false);
    if (err == null) {
      if (responseJson.status == true) {
        setPhotoBoothDetail(responseJson.data);
        await generateThumb(responseJson?.data.all_image_video);
        // var allimgs = [];

        // for (let i = 1; i <= responseJson.data.all_image_video.length; i++) {
        //   allimgs.push({img: responseJson.data.all_image_video[i - 1]});
        // }
        // setAllImg(allimgs);
      } else {
        setalert_sms(responseJson.message);
        setMy_Alert(true);
      }
    } else {
      setalert_sms(err);
      setMy_Alert(true);
    }
  };
  const generateThumb = async images => {
    setLoading2(true);
    const filteredData = images.filter(el => el.all_image_video == null);
    const allData1 = await Promise.all(
      filteredData.map(async (imgData, index) => {
        if (imgData.object_type === 'Image') {
          return {...imgData, type: 'image', id: index};
        } else if (imgData.object_type === 'video') {
          const thumb = await createThumbnail({
            url: imgData.media,
            timeStamp: 100, // Specify the time position for the thumbnail (in milliseconds)
          });
          return {
            ...imgData,
            thumb,
            type: 'video',
            id: index,
          };
        }

        // return null; // Return null for unsupported object_type or invalid data
      }),
    );
    setImages(allData1);
    const onlyimages = allData1.filter(el => el.type === 'image');
    var allimgs = [];
    for (let i = 1; i <= onlyimages?.length; i++) {
      allimgs.push({img: onlyimages[i - 1]?.media});
    }
    setAllImg(allimgs);
    setLoading2(false);
  };

  const _renderItem = ({item}) => {
    if (item.type === 'image') {
      return (
        <TouchableOpacity
          onPress={() => {
            if (photoBoothDetail?.Purchased == 1) {
              setImageUrl(item?.media);
              setmodulevisible(true);
            }
          }}
          style={{
            width: '100%',
            height: (dimensions.SCREEN_HEIGHT * 45) / 100,
            borderRadius: 20,
          }}>
          <FastImage
            resizeMode="stretch"
            source={{uri: item.media}}
            style={{height: '100%', width: '100%'}}>
            {photoBoothDetail?.Purchased != 1 ? (
              <LinearGradient
                style={{
                  width: '100%',
                  height: (dimensions.SCREEN_HEIGHT * 45) / 100,
                  justifyContent: 'center',
                  borderBottomLeftRadius: 20,
                  borderBottomRightRadius: 20,
                }}
                colors={['rgba(61, 161, 227, 0.5)', 'rgba(61, 161, 227, 0.5)']}>
                <View
                  style={{
                    flexDirection: 'row',
                    padding: 1,
                    // paddingHorizontal: 0,
                    backgroundColor: 'transparent',
                    position: 'absolute',
                    bottom: dimensions.SCREEN_HEIGHT * 0.31,
                    right: dimensions.SCREEN_WIDTH * 0.0,
                    columnGap: 45,
                    right: -25,
                  }}>
                  {/* <Image
                    source={require('../../assets/images/Icons/WatermarkKikos.png')}
                    style={{height: 120, width: 120, opacity: 0.7}}
                  />
                  <Image
                    source={require('../../assets/images/Icons/WatermarkKikos.png')}
                    style={{height: 120, width: 120, opacity: 0.7}}
                  /> */}
                  <Image
                    source={require('../../assets/images/Icons/WatermarkKikos.png')}
                    style={{height: 120, width: 120, opacity: 0.7}}
                  />
                  {/* <Text
                    style={{
                      color: 'rgb(232,232,232)',
                      fontSize: 42,
                      lineHeight: 84,
                      fontWeight: '400',
                      textAlign: 'center',
                      // backgroundColor: COLORS.Primary_Blue,
                    }}>
                    Kikos
                  </Text> */}
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    padding: 1,
                    paddingHorizontal: 0,
                    backgroundColor: 'transparent',
                    position: 'absolute',
                    bottom: dimensions.SCREEN_HEIGHT * 0.15,
                    right: dimensions.SCREEN_WIDTH * 0.32,
                    columnGap: 45,
                    // left: -25,
                  }}>
                  <Image
                    source={require('../../assets/images/Icons/WatermarkKikos.png')}
                    style={{height: 120, width: 120, opacity: 0.7}}
                  />
                  {/* <Image
                    source={require('../../assets/images/Icons/WatermarkKikos.png')}
                    style={{height: 120, width: 120, opacity: 0.7}}
                  />
                  <Image
                    source={require('../../assets/images/Icons/WatermarkKikos.png')}
                    style={{height: 120, width: 120, opacity: 0.7}}
                  /> */}
                  {/* <Text
                    style={{
                      color: 'rgb(232,232,232)',
                      fontSize: 42,
                      lineHeight: 84,
                      fontWeight: '400',
                      textAlign: 'center',
                      // backgroundColor: COLORS.Primary_Blue,
                    }}>
                    Kikos
                  </Text> */}
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    padding: 1,
                    // paddingHorizontal: 0,
                    backgroundColor: 'transparent',
                    position: 'absolute',
                    bottom: dimensions.SCREEN_HEIGHT * 0.0,
                    right: dimensions.SCREEN_WIDTH * 0.0,
                    columnGap: 45,
                    left: -25,
                  }}>
                  <Image
                    source={require('../../assets/images/Icons/WatermarkKikos.png')}
                    style={{height: 120, width: 120, opacity: 0.7}}
                  />
                  {/* <Image
                    source={require('../../assets/images/Icons/WatermarkKikos.png')}
                    style={{height: 120, width: 120, opacity: 0.7}}
                  />
                  <Image
                    source={require('../../assets/images/Icons/WatermarkKikos.png')}
                    style={{height: 120, width: 120, opacity: 0.7}}
                  /> */}
                  {/* <Text
                    style={{
                      color: 'rgb(232,232,232)',
                      fontSize: 42,
                      lineHeight: 84,
                      fontWeight: '400',
                      textAlign: 'center',
                      // backgroundColor: COLORS.Primary_Blue,
                    }}>
                    Kikos
                  </Text> */}
                </View>
              </LinearGradient>
            ) : null}
          </FastImage>
        </TouchableOpacity>
      );
    }
    if (item.type === 'video') {
      return (
        <>
          <TouchableOpacity
            style={{
              width: '100%',
              height: 227,
              borderRadius: 10,
              alignSelf: 'center',
              resizeMode: 'cover',
            }}
            onPress={() => {
              if (photoBoothDetail?.Purchased == 1) {
                setShowModal({
                  isVisible: true,
                  data: item,
                });
              }
            }}>
            <ImageBackground
              source={{uri: item?.thumb?.path}}
              style={{
                width: '100%',
                height: (dimensions.SCREEN_HEIGHT * 45) / 100,
                alignSelf: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
              }}
              resizeMode="cover">
              {photoBoothDetail?.Purchased != 1 ? (
                <LinearGradient
                  style={{
                    width: '100%',
                    height: (dimensions.SCREEN_HEIGHT * 45) / 100,
                    justifyContent: 'center',
                    borderBottomLeftRadius: 20,
                    borderBottomRightRadius: 20,
                  }}
                  colors={[
                    'rgba(61, 161, 227, 0.5)',
                    'rgba(61, 161, 227, 0.5)',
                  ]}>
                  <View
                    style={{
                      flexDirection: 'row',
                      padding: 1,
                      // paddingHorizontal: 0,
                      backgroundColor: 'transparent',
                      position: 'absolute',
                      bottom: dimensions.SCREEN_HEIGHT * 0.31,
                      right: dimensions.SCREEN_WIDTH * 0.0,
                      columnGap: 45,
                      right: -25,
                    }}>
                    <Image
                      source={require('../../assets/images/Icons/WatermarkKikos.png')}
                      style={{height: 120, width: 120, opacity: 0.7}}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      padding: 1,
                      // paddingHorizontal: 0,
                      backgroundColor: 'transparent',
                      position: 'absolute',
                      bottom: dimensions.SCREEN_HEIGHT * 0.15,
                      right: dimensions.SCREEN_WIDTH * 0.32,
                      columnGap: 45,
                      // left: -25,
                    }}>
                    <Image
                      source={require('../../assets/images/Icons/WatermarkKikos.png')}
                      style={{height: 120, width: 120, opacity: 0.7}}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      padding: 1,
                      // paddingHorizontal: 0,
                      backgroundColor: 'transparent',
                      position: 'absolute',
                      bottom: dimensions.SCREEN_HEIGHT * 0.0,
                      right: dimensions.SCREEN_WIDTH * 0.0,
                      columnGap: 45,
                      left: -25,
                    }}>
                    <Image
                      source={require('../../assets/images/Icons/WatermarkKikos.png')}
                      style={{height: 120, width: 120, opacity: 0.7}}
                    />
                  </View>
                </LinearGradient>
              ) : null}
              <View
                style={{
                  position: 'absolute',
                  bottom: -5,
                  right: 0,
                  width: '100%',
                  height: (dimensions.SCREEN_HEIGHT * 28) / 100,
                }}>
                <Image
                  source={require('../../assets/images/Icons/play-circle1.png')}
                  style={{width: '20%', height: '20%', alignSelf: 'center'}}
                  resizeMode="contain"
                />
              </View>
            </ImageBackground>
          </TouchableOpacity>
        </>
      );
    }
  };
  const toggleModal = state => {
    setShowModal({
      isVisible: state.isVisible,
      data: state.data,
    });
  };
  const handleItemChanged = item => {
    // Update the currentIndex when the item changes
    setCurrentIndex(item);
  };

  const onRequestClose = () => null;
  const preventParentEvent = e => e.stopPropagation();

  //function : imp function
  const getExtention = filename => {
    // To get the file extension
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
  };
  const checkPermission = async url => {
    setLoading(true);
    if (Platform.OS === 'ios') {
      downloadFile(url);
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message:
              'Application needs access to your storage to download File',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          await downloadFile(url);
        } else {
          Toast.show({type: 'error', text1: 'Storage Permission Not Granted'});
        }
      } catch (err) {
        // To handle permission related exception
        console.error('ERROR' + err);
      }
    }
    setLoading(false);
  };

  const downloadFile = async link => {
    setVisible(true);
    const date = new Date();
    let pdfUrl = link;
    let ext = getExtention(pdfUrl);
    ext = '.' + ext[0].toLowerCase();
    let DownloadDir =
      Platform.OS == 'ios'
        ? ReactNativeBlobUtil.fs.dirs.DocumentDir
        : ReactNativeBlobUtil.fs.dirs.DownloadDir;
    const {dirs} = ReactNativeBlobUtil.fs;
    const dirToSave =
      Platform.OS == 'ios' ? dirs.DocumentDir : dirs.DownloadDir;
    const configfb = {
      fileCache: true,
      useDownloadManager: true,
      notification: true,
      mediaScannable: true,
      title: 'Kikos',
      path: `${dirToSave}/${
        Math.floor(date.getTime() + date.getSeconds() / 2) + ext
      }`,
    };
    const configOptions = Platform.select({
      ios: {
        fileCache: configfb.fileCache,
        title: configfb.title,
        path: configfb.path,
        appendExt: ext,
      },
      android: configfb,
    });
    Platform.OS === 'android'
      ? ReactNativeBlobUtil.config({
          fileCache: true,
          addAndroidDownloads: {
            useDownloadManager: true,
            notification: true,
            path:
              `${DownloadDir}` +
              `${Math.floor(date.getDate() + date.getSeconds() / 2)}` +
              ext,
            description: 'Kikos',
            title: `${pdfUrl.slice(pdfUrl.lastIndexOf('/'), pdfUrl.length)}`,
            mime: 'application/mp4',
            mediaScannable: true,
          },
        })
          .fetch('GET', `${pdfUrl}`)
          .progress({count: 10}, (received, total) => {
            let percentage = (received / total) * 100;
            setDownloadPercent(percentage);
          })
          .then(res => {
            setVisible(false);
          })
          .catch(error => {
            console.warn(error.message);
          })
      : ReactNativeBlobUtil.config(configOptions)
          .fetch('GET', `${pdfUrl}`, {})
          .progress({count: 10}, (received, total) => {
            let percentage = (received / total) * 100;
            setDownloadPercent(percentage);
          })
          .then(res => {
            setVisible(false);
            if (Platform.OS === 'ios') {
              ReactNativeBlobUtil.fs.writeFile(
                configfb.path,
                res.data,
                'base64',
              );
              ReactNativeBlobUtil.ios.previewDocument(configfb.path);
            }
          })
          .catch(e => {
            console.error('The file saved to ERROR', e.message);
          });
  };

  //hook : useEffect
  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      PostphotobothDetails(props?.route?.params?.PhotoId);
    });
    return unsubscribe;
  }, []);
  //UI
  return (
    <View style={{backgroundColor: COLORS.White, flex: 1}}>
      <CustomHeader
        backarrow={true}
        title={photoBoothDetail?.tour_name}
        onBackPress={() => {
          props.navigation.goBack();
        }}
      />
      <ScrollView>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            backgroundColor: '#EAEDF7',
          }}>
          <View style={{marginTop: 10, flex: 1, alignSelf: 'center'}}>
            <View style={{padding: 15}}>
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  justifyContent: 'space-between',
                }}>
                <View style={{width: '100%'}}>
                  <Text
                    numberOfLines={2}
                    style={{
                      color: '#000',
                      fontWeight: '700',
                      fontSize: Constant.textFontSize(16),
                      lineHeight: 20,
                    }}>
                    {photoBoothDetail?.tour_name}
                  </Text>
                  <Text
                    numberOfLines={2}
                    style={{
                      color: '#1F191C',
                      fontWeight: '500',
                      fontSize: Constant.textFontSize(12),
                      lineHeight: 20,
                      marginTop: 10,
                    }}>
                    {photoBoothDetail?.title}
                  </Text>
                  <View style={{flexDirection: 'row', marginTop: 6}}>
                    <Image
                      source={images.gallaryicon}
                      style={{
                        tintColor: '#3DA1E3',
                        height: 15,
                        width: 15,
                        marginTop: 2,
                      }}
                    />
                    <Text style={[styles.titleTxt, {marginLeft: 10}]}>
                      {photoBoothDetail?.image_count} Photos
                    </Text>
                    <Image
                      style={{
                        marginLeft: 10,
                        height: 15,
                        width: 15,
                        tintColor: '#3DA1E3',
                        marginTop: 2,
                      }}
                      source={images.gallaryvideoicon}
                    />
                    <Text style={[styles.titleTxt, {marginLeft: 10}]}>
                      {photoBoothDetail?.video_count} Videos
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      width: '100%',
                      marginTop: 6,
                    }}>
                    <Image
                      source={images.calandertickblack}
                      style={{height: 15, width: 15}}
                    />
                    <Text
                      style={{
                        color: '#1F191C',
                        fontWeight: '400',
                        fontSize: Constant.textFontSize(12),
                        lineHeight: 20,
                        marginLeft: 10,
                      }}>
                      Uploaded On {photoBoothDetail?.uploaded_date}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <View
              style={{
                height: (dimensions.SCREEN_HEIGHT * 45) / 100,
                overflow: 'hidden',
                marginHorizontal: 10,
                borderRadius: 15,
              }}>
              {Array.isArray(imagess) && imagess.length > 0 ? (
                <AppIntroSlider
                  data={imagess}
                  renderItem={_renderItem}
                  // renderPagination={() => null}
                  // onSlideChange={handleSlideChange}
                  renderDoneButton={() => <View />}
                  renderNextButton={() => <View />}
                  activeDotStyle={{
                    backgroundColor: '#3DA1E3',
                    height: 4,
                    width: 18,
                    borderRadius: 0,
                    top: 20,
                  }}
                  dotStyle={{
                    backgroundColor: '#fff',
                    height: 4,
                    width: 18,
                    borderRadius: 0,
                    top: 20,
                  }}
                  keyExtractor={(item, index) => index.toString()}
                />
              ) : null}
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 30,
                marginTop: 30,
              }}>
              {photoBoothDetail.Purchased != 1 ? (
                <CustomButtonRound
                  stle={{width: '90%'}}
                  txtStyle={{
                    color: '#3DA1E3',
                    fontSize: Constant.textFontSize(14),
                    fontWeight: '400',
                  }}
                  backgroundColor={'#FFFFFF'}
                  title={'Purchase At $' + `${photoBoothDetail?.price}`}
                  onPress={() => {
                    props.navigation.navigate('PhotoBoothPaymentReview', {
                      type: 'photobooth',
                      TourData: photoBoothDetail,
                    });
                  }}
                />
              ) : (
                <View
                  style={{
                    width: '95%',
                    borderRadius: 100,
                    backgroundColor: COLORS.Primary_Blue,
                    height: 60,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: Constant.textFontSize(14),
                      fontWeight: '700',
                    }}>
                    Purchased
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
      {showModal.isVisible ? (
        <VideoModel
          isVisible={showModal.isVisible}
          toggleModal={toggleModal}
          setHasLoading={setLoading}
          videoDetail={{...showModal?.data, url: showModal?.data?.media}}
          downloadPress={item => {
            currentLink.current = item.url;
            checkPermission(item.url);
          }}
          {...props}
        />
      ) : null}
      <ImageModal
        visible={modulevisible}
        setVisibility={setmodulevisible}
        image={imageUrl}></ImageModal>
      <Modal
        transparent
        visible={visible}
        onRequestClose={onRequestClose}
        animationType="slide"
        onBackdropPress={onRequestClose}>
        <TouchableWithoutFeedback onPress={onRequestClose}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback onPress={preventParentEvent}>
              <View style={styles.modalWrapper}>
                <Text style={styles.modalTitle}>Download Video</Text>
                <Text style={styles.modalSubTitle}>
                  please wait until download finish, don't close the app
                </Text>
                <Text
                  style={{
                    fontWeight: 'bold',
                    marginBottom: 10,
                    textAlign: 'right',
                  }}>
                  {parseFloat(downloadPercent).toFixed(2)}%
                </Text>
                <ProgressBar
                  progress={downloadPercent}
                  backgroundColor="#fafafa"
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      {My_Alert ? (
        <MyAlert
          sms={alert_sms}
          okPress={() => {
            setMy_Alert(false);
          }}
        />
      ) : null}
      {loading || loading2 ? <Loader /> : null}
    </View>
  );
};

export default PhotoBoothPurchased;

const styles = StyleSheet.create({
  hrcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    gap: 2,
  },
  titleTxt: {
    fontSize: Constant.textFontSize(12),
    fontWeight: '400',
    fontFamily: FONTS.regular,
    marginLeft: 2,
    color: '#3DA1E3',
  },
  calCantainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    width: '97%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    height: 50,
    width: '95%',
    marginHorizontal: 10,
    backgroundColor: '#FFFFFF',
    //   flex: 1,
    marginTop: 70,
    marginLeft: 10,
    borderRadius: 6,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  scontainer: {
    height: 50,
    width: 60,
    backgroundColor: '#3DA1E3',
    marginTop: 70,
    marginLeft: 10,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateText: {
    padding: 10,
    color: '#8F93A0',
    fontSize: Constant.textFontSize(14),
    fontWeight: '400',
    fontFamily: FONTS.regular,
  },
  calendar: {
    marginRight: 10,
    height: 30,
    width: 30,
    tintColor: '#CECECE',
  },
  touchableOpacity: {
    marginHorizontal: 10,
    width: (dimensions.SCREEN_WIDTH * 92) / 100,
    borderRadius: 20,
    alignSelf: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowRadius: 2,
    shadowOpacity: 0.2,
    elevation: 3,
    marginBottom: 20,
  },
  imageBackground: {
    width: '100%',
    height: 150,
    resizeMode: 'stretch',
    justifyContent: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  txtTotal: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  whiteCircle: {
    height: 30,
    width: 30,
    borderRadius: 30,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  countTxt: {
    fontSize: Constant.textFontSize(16),
    fontWeight: 'bold',
    color: '#1F191C',
  },
  cardContainer: {
    marginTop: 20,
    width: '100%',
  },
  imageContainer: {
    height: Dimensions.get('screen').width * 0.95,
    width: Dimensions.get('screen').width * 1,
  },
  photoTxt: {
    fontSize: Constant.textFontSize(12),
    fontWeight: '400',
    color: COLORS.Primary_Blue,
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 16,
    fontWeight: 'bold',
  },
  modalSubTitle: {
    color: '#333',
    fontSize: 13,
    marginBottom: 16,
  },
  modalHint: {
    color: '#333',
    fontSize: 13,
    marginBottom: 8,
    textAlign: 'center',
  },

  modalWrapper: {
    paddingHorizontal: 16 * 2,
    paddingVertical: 20,
    width: Dimensions.get('screen').width - 2 * 16,
    backgroundColor: '#fff',
    borderRadius: 4,
    elevation: 2,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      height: 0,
      width: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
  },
  modalContainer: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    flex: 1,
    justifyContent: 'center',
    position: 'relative',
  },
  headerWrapper: {
    backgroundColor: '#eee',
    paddingTop: 52,
    paddingBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: '#009688',
    fontSize: 20,
  },
  time: {
    fontSize: 14,
    color: '#707070',
  },
  itemTextWrapper: {
    marginRight: 16,
    width: 0,
    flexGrow: 1,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  itemTitle: {fontSize: 16, textAlign: 'right', color: '#333'},
  itemTitleWrapper: {width: 0, flexGrow: 1},
  downloadIcon: {
    marginRight: 'auto',
  },
  contentContainer: {
    flexGrow: 1,
    backgroundColor: '#eee',
    paddingBottom: 8,
  },
  itemWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 12,
    paddingVertical: 0,
    borderRadius: 4,
    marginTop: 8,
    marginHorizontal: 8,
  },
  itemImage: {
    height: 50,
    width: 85,
    borderRadius: 5,
  },
});
