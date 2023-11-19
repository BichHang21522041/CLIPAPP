import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import scale from '../src/constants/responsive';
import {IC_LOGO, IC_UPLOAD, IC_ABOUT, IC_BACK} from '../src/assets/icons';
import {useNavigation} from '@react-navigation/native';
//import storage from '@react-native-firebase/storage'
import {PermissionsAndroid} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import FormData from 'form-data';
import Popup from '../src/components/PopUp';
import Modal from 'react-native-modal';
import ClipLoader from 'react-spinners/ClipLoader';

export const UploadScreen = ({props}) => {
  const navigation = useNavigation();
  const fs = require('react-native-fs');
  const [file, setFile] = useState('');
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  // async function pickDocument() {
  //   try {
  //     const result = await launchCamera({});
  //     console.log(result)
  //     setFile(result.assets[0].uri)
  //   } catch (err) {

  //   }
  // };
  let options = {
    savePhotos: true,
    mediaType: 'photo',
  };

  async function openCamera() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const result = await launchCamera(options);
        console.log(result);
        setFile(result.assets[0].uri);
        setVisible(false);
      }
    } catch (err) {}
  }

  async function openGallery() {
    try {
      const result = await launchImageLibrary(options);
      console.log(result);
      setFile(result.assets[0].uri);
      setVisible(false);
    } catch (err) {}
  }

  async function handleSubmit() {
    if (file !== '') {
      setLoading(true);
      let data = new FormData();
      console.log(file);
      data.append('my_image', {
        uri: file,
        name: 'image',
        type: 'image/jpeg',
      });
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://bichhang21522041-clip.hf.space/submit',
        headers: {'Content-Type': 'multipart/form-data'},
        data: data,
      };
      await axios(config)
        .then(response => {
          setLoading(false);
          navigation.navigate('Result', {item: file, text: response.data[0]});
        })
        .catch(error => {
          setLoading(false);
          console.log(error);
        });
    } else {
      Alert.alert('Please upload file to predict!');
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.aboutContainer}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => {
              navigation.goBack();
            }}>
            <Image source={IC_BACK}></Image>
          </TouchableOpacity>
        </View>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={IC_LOGO}></Image>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.appName}>C L I P</Text>
          <Text style={styles.appTitle}>I M A G E C L A S S I F I E R</Text>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.reviewTitle}>
          This app will predict {'\n'}the class based on your image!
        </Text>
        <Text style={styles.fileName}>{file}</Text>
        {!loading ? (
          <View>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => setVisible(true)}>
              <Image source={IC_UPLOAD} />
              <Text style={styles.buttonText}>Upload file</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.submitContainer}
              onPress={() => handleSubmit()}>
              <Text style={styles.submitText}>Submit</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <ActivityIndicator
            color={'#fff'}
            size={50}
            style={{marginTop: scale(40, 'h')}}
          />
        )}
      </View>
      <Modal
        style={styles.modalContainer}
        onBackdropPress={() => setVisible(false)}
        onBackButtonPress={() => setVisible(false)}
        isVisible={visible}>
        <Popup onPressUpload={openGallery} onPressCamera={openCamera}></Popup>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'white',
  },
  topContainer: {
    flex: 0.6,
  },
  aboutContainer: {
    height: scale(65, 'h'),
    flexDirection: 'row',
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconButton: {
    width: scale(30, 'w'),
    height: scale(30, 'h'),
    marginLeft: scale(20, 'w'),
  },
  aboutBtn: {
    width: scale(40, 'h'),
    height: scale(40, 'h'),
    backgroundColor: 'orange',
    borderRadius: 50,
    marginRight: scale(10, 'h'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignSelf: 'center',
  },
  logo: {
    width: scale(150, 'h'),
    height: scale(150, 'h'),
  },
  titleContainer: {
    margin: scale(10, 'h'),
    alignItems: 'center',
  },
  appName: {
    fontSize: scale(55, 'h'),
    fontWeight: '900',
    color: 'black',
  },
  appTitle: {
    fontSize: scale(18, 'w'),
    fontWeight: '300',
    color: 'black',
    textAlign: 'justify',
    fontStyle: 'italic',
  },
  bottomContainer: {
    width: '100%',
    flex: 0.5,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: '#FFA500',
  },
  reviewTitle: {
    textAlign: 'center',
    marginTop: scale(35, 'h'),
    fontSize: scale(23, 'h'),
    fontWeight: 'bold',
    color: 'white',
  },
  buttonContainer: {
    width: scale(199, 'w'),
    height: scale(52, 'h'),
    marginTop: scale(12, 'h'),
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
  note: {
    marginTop: scale(10, 'h'),
    fontSize: scale(16, 'h'),
    fontStyle: 'italic',
    color: 'black',
    fontWeight: '400',
    textAlign: 'center',
  },
  fileName: {
    textAlign: 'center',
    alignSelf: 'center',
    marginTop: scale(15, 'h'),
    width: '80%',
    overflow: 'hidden',
    flexWrap: 'nowrap',
    textDecorationStyle: 'dotted',
  },
  submitContainer: {
    width: scale(199, 'w'),
    height: scale(52, 'h'),
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    alignSelf: 'center',
    marginTop: scale(20, 'h'),
  },
  submitText: {
    color: 'orange',
    fontSize: scale(20, 'h'),
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

export default UploadScreen;
