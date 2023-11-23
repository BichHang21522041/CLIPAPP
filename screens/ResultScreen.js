import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import scale from '../src/constants/responsive';
import {IC_BACK, IC_SHARE, IC_OK} from '../src/assets/icons';
import {useNavigation} from '@react-navigation/native';
import SharePopUp from '../src/components/SharePopUp';
import Modal from 'react-native-modal';
import {PermissionsAndroid} from 'react-native';
import DeviceInfo from 'react-native-device-info';
// import firestore from '@react-native-firebase/firestore';
import {firebase} from '../configs/FirebaseConfig';
import {utils} from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';

import RNFetchBlob from 'rn-fetch-blob';
import RNFS from 'react-native-fs';

const ResultScreen = ({route}) => {
  const {item, text} = route.params;
  console.log(route.params);
  const navigation = useNavigation();

  const [visible, setVisible] = useState(false);
  const [isOk, setIsOk] = useState(false);

  async function checkPermission() {
    console.log('do duoc ne');
    try {
      const granted = await PermissionsAndroid.requestMultiple(
        [
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        ],
        {
          title: 'Storage Permission Required',
          message: 'App needs access to your storage to download Photos',
        },
      );
      if (
        granted['android.permission.READ_EXTERNAL_STORAGE'] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        granted['android.permission.WRITE_EXTERNAL_STORAGE'] ===
          PermissionsAndroid.RESULTS.GRANTED
      ) {
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

  const copyFileToDirectory = async (filePath, destinationDirectory) => {
    try {
      const fileName = filePath.split('/').pop(); // Extract the file name from the path
      const destinationPath = `${destinationDirectory}/${fileName}`;

      if (!(await RNFS.exists(destinationPath)))
        await RNFS.writeFile(destinationPath, '', 'utf8');
      await RNFS.copyFile(filePath, destinationPath);

      console.log('File copied successfully:', destinationPath);
      return destinationPath;
    } catch (error) {
      console.error('Error copying file:', error);
      throw error;
    }
  };

  async function downloadFile() {
    console.log('oke');

    const sourceFilePath = item; // Replace with your source file path
    const destinationDirectory = `${RNFS.PicturesDirectoryPath}`;

    console.log(sourceFilePath, destinationDirectory);

    copyFileToDirectory(sourceFilePath, destinationDirectory)
      .then(copiedFilePath => {
        // Handle the copied file path
        console.log('Copied File Path:', copiedFilePath);
        setIsOk(true);
      })
      .catch(error => {
        // Handle the error
        console.error('Error:', error);
      });

    try {
    } catch (error) {
      console.error('Error Downloading Image:', error);
      throw error;
    }
  }

  async function getExtention(filename) {
    // To get the file extension
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
  }

  const [id, setID] = useState();

  useEffect(() => {
    addPrediction();
  }, []);

  const addPrediction = async () => {
    try {
      const deviceId = await DeviceInfo.getUniqueId();
      const url = await handleUpload();
      const prediction = {class: text, image: url};
      const historyRef = firebase.firestore().collection('history');
      const querySnapshot = await historyRef.where('id', '==', deviceId).get();
      const now = firebase.firestore.Timestamp.now();

      if (!querySnapshot.empty) {
        // Document with the deviceId already exists, update the existing document
        const docId = querySnapshot.docs[0].id; // Assuming there is only one document with the deviceId
        const existingPredictions =
          querySnapshot.docs[0].data().predictions || [];
        const updatedPredictions = [...existingPredictions, prediction];
        console.log('helllo1');
        await historyRef.doc(docId).update({
          predictions: updatedPredictions,
        });
      } else {
        console.log('helllo2');
        await historyRef.add({
          id: deviceId,
          predictions: [prediction],
          date: now,
        });
      }

      console.log('Prediction added to Firestore successfully!');
    } catch (error) {
      console.error('Error adding prediction to Firestore:', error);
    }
  };

  async function uriToBlob(uri) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new Error('uriToBlob failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });
  }

  const handleUpload = async () => {
    try {
      const blob = await uriToBlob(item);
      console.log(blob);
      const reference = storage().ref().child(`images/${Date.now()}`);
      const task = reference.put(blob);

      task.on('state_changed', snapshot => {
        console.log(
          `${
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          }% completed`,
        );
      });

      await task;
      const url = await reference.getDownloadURL();
      console.log('File uploaded to Firebase storage:', url);
      return url;
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
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
      <Modal
        onBackdropPress={() => setIsOk(false)}
        onBackButtonPress={() => setIsOk(false)}
        isVisible={isOk}>
        <Image source={IC_OK} style={styles.isOk}></Image>
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
