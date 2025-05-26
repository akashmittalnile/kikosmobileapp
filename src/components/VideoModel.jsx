//import : react components
import React, {useState, useEffect} from 'react';
import {
  TouchableWithoutFeedback,
  StyleSheet,
  View,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
} from 'react-native';
//import : custom components
import Loader from '../WebApi/Loader';
//import : third parties
import VideoPlayer from 'react-native-video-controls';
import Orientation from 'react-native-orientation-locker';
import Modal from 'react-native-modal';
import ReactNativeBlobUtil from 'react-native-blob-util';
import Toast from 'react-native-toast-message';
//import : utils
import {Constant, MyIcon} from '../global';

export const VideoModel = props => {
  //hook : states
  const [screenState, setScreenState] = useState({
    fullScreen: false,
    Width_Layout: '',
    Height_Layout: '',
    potraitMode: true,
  });
  const [loading, setLoading] = useState(false);
  //function : imp func
  const changeState = values => {
    setScreenState(prevState => {
      return {
        ...prevState,
        ...values,
      };
    });
  };
  const detectOrientation = () => {
    if (screenState.Width_Layout > screenState.Height_Layout) {
      // Write code here, which you want to execute on Landscape Mode.
      changeState({fullScreen: true, potraitMode: false});
    } else {
      // Write code here, which you want to execute on Portrait Mode.
      changeState({fullScreen: false, potraitMode: true});
    }
  };
  const getExtention = filename => {
    // To get the file extension
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
  };
  const checkPermission = async url => {
    props.setHasLoading(true);
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
    props.setHasLoading(false);
  };
  //function : serv func
  const downloadFile = async link => {
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
          .then(res => {})
          .catch(error => {
            console.warn(error.message);
          })
      : ReactNativeBlobUtil.config(configOptions)
          .fetch('GET', `${pdfUrl}`, {})
          .progress({count: 10}, (received, total) => {
            console.debug('progress', (received / total) * 100);
          })
          .then(res => {
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
    Orientation.unlockAllOrientations();
    return () => {
      Orientation.lockToPortrait();
    };
  }, []);

  useEffect(() => {
    detectOrientation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screenState.Width_Layout]);

  useEffect(() => {
    let {fullScreen, potraitMode} = screenState;
    !fullScreen && !potraitMode ? Orientation.lockToPortrait() : '';
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screenState.fullScreen]);
  //function : render func
  const modalScreenView = () => {
    return (
      <TouchableOpacity
        style={styles.ModalOutsideContainer}
        onPress={() =>
          props.toggleModal({
            isVisible: false,
            data: null,
          })
        }>
        <View style={styles.ModalContainer}>
          <TouchableWithoutFeedback>
            <View style={styles.ModalBox}>
              <View style={styles.VideoPlayerContainer}>
                {videoPlayerView()}
              </View>
              {/* <Text style={styles.VideoTitle}>
                {props.videoDetail.title}
              </Text> */}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableOpacity>
    );
  };
  const videoPlayerView = () => {
    let {fullScreen} = screenState;
    return (
      <VideoPlayer
        source={{
          uri: props.videoDetail.url,
        }}
        onBack={() =>
          props.toggleModal({
            isVisible: false,
            data: null,
          })
        }
        resizeMode="contain"
        toggleResizeModeOnFullscreen={false}
        onEnterFullscreen={() => {
          changeState({fullScreen: !fullScreen});
        }}
      />
    );
  };
  //UI
  return (
    <>
      <Modal
        animationType={'fade'}
        supportedOrientations={['portrait', 'landscape']}
        swipeDirection="down"
        onSwipeComplete={e => {
          props.toggleModal({
            isVisible: false,
            data: null,
          });
        }}
        scrollOffset={1}
        propagateSwipe={true}
        coverScreen={false}
        backdropColor="transparent"
        transparent={true}
        style={{
          justifyContent: 'center',
          margin: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}
        visible={props.isVisible}>
        <View
          style={styles.ModalWrapper}
          onLayout={event => {
            const {layout} = event.nativeEvent;
            changeState({
              Width_Layout: layout.width,
              Height_Layout: layout.height,
            });
          }}>
          {screenState.fullScreen ? videoPlayerView() : modalScreenView()}
        </View>
        <TouchableOpacity
          style={{
            alignSelf: 'flex-end',
            padding: 10,
            backgroundColor: '#fff',
            borderRadius: 100,
            position: 'absolute',
            bottom: 100,
            right: 10,
          }}
          onPress={() => {
            props.toggleModal({
              isVisible: false,
              data: null,
            });
            // checkPermission(props?.videoDetail?.url);
            props.downloadPress(props?.videoDetail);
          }}>
          <MyIcon.Feather
            name="download"
            style={{color: '#000'}}
            size={Constant.textFontSize(26)}
          />
        </TouchableOpacity>
      </Modal>
      {loading ? <Loader /> : null}
    </>
  );
};

const styles = StyleSheet.create({
  ModalOutsideContainer: {
    flex: 1,
  },
  ModalContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  ModalWrapper: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  ModalBox: {
    width: '85%',
    // backgroundColor: '#fff',
    paddingTop: 10,
    paddingHorizontal: 6,
    borderRadius: 4,
    opacity: 1,
  },
  VideoPlayerContainer: {
    width: '100%',
    height: 200,
  },
  VideoTitle: {
    paddingVertical: 8,
    fontSize: Constant.textFontSize(18),
    textAlign: 'center',
    color: 'red',
  },
});
