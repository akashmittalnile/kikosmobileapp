import {
  View,
  Text,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import {styles} from './ImageModalStyle';
import {dimensions} from '../../utility/Mycolors';
import FastImage from 'react-native-fast-image';
import Modal from 'react-native-modal';
import COLORS from '../../global/Colors';
import {Constant, MyIcon} from '../../global';
import ReactNativeBlobUtil from 'react-native-blob-util';
import Toast from 'react-native-toast-message';
import Loader from '../../WebApi/Loader';

const ImageModal = ({
  imageData = [],
  image,
  visible,
  setVisibility,
  onShow = () => {},
}) => {
  const [loading, setLoading] = useState(false);
  //function : modal function
  const closeModal = () => {
    setVisibility(false);
  };

  const checkPermission = async url => {
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
          downloadFile(url);
        } else {
          Toast.show({type: 'error', text1: 'Storage Permission Not Granted'});
        }
      } catch (err) {
        // To handle permission related exception
        console.error('ERROR' + err);
      }
    }
  };
  const getExtention = filename => {
    // To get the file extension
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
  };
  const downloadFile = async link => {
    setLoading(true);
    const date = new Date();
    let pdfUrl = link;
    let ext = getExtention(pdfUrl);
    ext = '.' + ext[0];
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
    Platform.OS == 'android'
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
            mime: 'application/jpg',
            mediaScannable: true,
          },
        })
          .fetch('GET', `${pdfUrl}`)
          .then(res => {
            setLoading(false);
          })
          .catch(error => {
            setLoading(false);
            console.warn(error.message);
          })
      : ReactNativeBlobUtil.config(configOptions)
          .fetch('GET', `${pdfUrl}`, {})
          .then(res => {
            setLoading(false);
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
            setLoading(false);
            console.error('The file saved to ERROR', e.message);
          });
  };
  //UI
  return (
    <>
      <Modal
        // visible={visible} onShow={onShow} transparent animationType="fade"
        isVisible={visible}
        swipeDirection="down"
        onSwipeComplete={e => {
          closeModal();
        }}
        scrollTo={() => {}}
        scrollOffset={1}
        onBackdropPress={() => closeModal()}
        propagateSwipe={true}
        coverScreen={false}
        backdropColor="transparent"
        style={{
          justifyContent: 'flex-end',
          margin: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}>
        <TouchableOpacity onPress={closeModal} style={styles.container}>
          <View style={styles.blurView} />
          <View style={styles.imagecontainer}>
            <FastImage
              resizeMode="stretch"
              source={{
                uri: image ? image : null,
              }}
              style={{
                width: '96%',
                height: dimensions.SCREEN_WIDTH * 0.99,
                backgroundColor: COLORS.BLACK,
                borderRadius: 15,
              }}
            />
          </View>
          <TouchableOpacity
            style={{
              alignSelf: 'flex-end',
              padding: 10,
              backgroundColor: '#fff',
              borderRadius: 100,
              position: 'absolute',
              bottom: 50,
              right: 10,
            }}
            onPress={() => {
              checkPermission(image);
            }}>
            <MyIcon.Feather
              name="download"
              style={{color: '#000'}}
              size={Constant.textFontSize(26)}
            />
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
      {loading ? <Loader /> : null}
    </>
  );
};

export default ImageModal;
