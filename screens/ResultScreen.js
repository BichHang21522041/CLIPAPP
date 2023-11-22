import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import scale from '../src/constants/responsive';
import {IC_BACK, IC_SHARE} from '../src/assets/icons';
import {useNavigation} from '@react-navigation/native';
import SharePopUp from '../src/components/SharePopUp';
import Modal from 'react-native-modal';
import RNFetchBlob from 'rn-fetch-blob';
import RNFS from 'react-native-fs';
import {PermissionsAndroid} from 'react-native';

const ResultScreen = ({route}) => {
  const {item, text} = route.params;
  console.log(route.params);
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);

  async function checkPermission() {
    console.log('do duoc ne');
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission Required',
          message: 'App needs access to your storage to download Photos',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // Once user grant the permission start downloading
        console.log('Storage Permission Granted.');
        downloadFile();
      } else {
        // If permission denied then show alert
        alert('Storage Permission Not Granted');
      }
    } catch (err) {
      // To handle permission related exception
      console.warn(err);
    }
  }

  const fileUri = item;

  // Get the https:// or http:// URL of the file
  const url =
    'https:/' +
    RNFS.DocumentDirectoryPath +
    '/' +
    fileUri.substring(fileUri.lastIndexOf('/') + 1);

  console.log(url);

  async function downloadFile() {
    // Main function to download the image

    // To add the time suffix in filename
    let date = new Date();
    // Image URL which we want to download
    let image_URL = url;
    // Getting the extention of the file
    let ext = getExtention(image_URL);
    ext = '.' + ext[0];
    console.log('ex: ', ext);
    // Get config and fs from RNFetchBlob
    // config: To pass the downloading related options
    // fs: Directory path where we want our image to download
    const {fs} = RNFetchBlob;
    let PictureDir = fs.dirs.PictureDir;

    RNFetchBlob.config({
      fileCache: true,
      appendExt: 'jpg',
      addAndroidDownloads: {
        // Related to the Android only
        useDownloadManager: true,
        notification: true,
        path:
          PictureDir +
          '/image_' +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          ext,
        description: 'Image',
      },
    })
      .fetch('GET', image_URL)
      .then(res => {
        // Showing alert after successful downloading
        console.log('res -> ', JSON.stringify(res));
        alert('Image Downloaded Successfully.');
      });
  }

  async function getExtention(filename) {
    // To get the file extension
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        {console.log(item)}
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => {
              navigation.goBack();
            }}>
            <Image source={IC_BACK}></Image>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => setVisible(true)}>
            <Image source={IC_SHARE}></Image>
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>Success!</Text>
        <Text style={styles.text}>
          Here is your prediction. {'\n'}Hope you are pleased with the result!
        </Text>
      </View>
      <View style={styles.bottomContainer}>
        <Image source={{uri: item}} width={300} height={500}></Image>
        <Text style={styles.resultText}>
          <Text
            style={{
              fontSize: scale(18, 'h'),
              fontStyle: 'italic',
            }}>
            Prediction:{' '}
          </Text>
          {text}
        </Text>
      </View>
      <Modal
        style={styles.modalContainer}
        onBackdropPress={() => setVisible(false)}
        onBackButtonPress={() => setVisible(false)}
        isVisible={visible}>
        <SharePopUp
          onPressDownload={() => checkPermission()}
          onPressShare={() => {}}></SharePopUp>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'orange',
  },
  topContainer: {
    flex: 0.3,
  },
  headerContainer: {
    flexDirection: 'row',
    marginTop: scale(24, 'h'),
    marginLeft: scale(24, 'w'),
    marginRight: scale(10, 'h'),
    justifyContent: 'space-between',
  },
  iconButton: {
    width: scale(30, 'w'),
    height: scale(30, 'h'),
  },
  title: {
    color: 'white',
    fontSize: scale(40, 'w'),
    marginLeft: scale(24, 'w'),
    fontWeight: 'bold',
  },
  bottomContainer: {
    flex: 0.8,
    backgroundColor: 'white',
    borderTopStartRadius: scale(40, 'w'),
    borderTopEndRadius: scale(40, 'w'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  fileStatus: {
    marginTop: scale(38, 'h'),
    fontSize: scale(18, 'h'),
    color: 'black',
    fontWeight: '400',
    textAlign: 'center',
  },
  blackText: {
    marginTop: scale(38, 'h'),
    fontSize: scale(28, 'h'),
    color: 'black',
    fontWeight: '900',
    textAlign: 'center',
  },
  orangeText: {
    color: '#FFA500',
  },
  block: {
    width: scale(228, 'w'),
    height: scale(228, 'h'),
    backgroundColor: '#FFA500',
    borderRadius: 30,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: scale(41, 'h'),
  },
  buttonContainer: {
    width: scale(199, 'w'),
    height: scale(52, 'h'),
    marginTop: scale(200, 'h'),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    borderRadius: 50,
    flexDirection: 'row',
  },
  buttonText: {
    marginLeft: scale(15, 'w'),
    fontSize: scale(20, 'h'),
    fontWeight: 'bold',
    color: 'white',
  },
  text: {
    color: 'black',
    fontSize: scale(19, 'h'),
    marginLeft: scale(24, 'w'),
    marginRight: scale(10, 'w'),
  },
  resultText: {
    color: 'black',
    fontSize: scale(20, 'h'),
    marginTop: scale(5, 'h'),
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
  modalContainer: {
    width: '100%',
    backgroundColor: 'white',
    marginLeft: 0,
    marginTop: 'auto',
    flex: 0.3,
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    marginBottom: 0,
  },
});

export default ResultScreen;
