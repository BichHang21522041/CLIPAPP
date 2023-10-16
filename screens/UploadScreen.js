import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import scale from '../src/constants/responsive';
import { IMG_LOGO } from '../src/assets/images';
import { IC_UPLOAD } from '../src/assets/icons';
import { useNavigation } from '@react-navigation/native';
import DocumentPicker from 'react-native-document-picker';
//import storage from '@react-native-firebase/storage'
import { PermissionsAndroid } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import FormData from 'form-data';

export const UploadScreen = ({ props }) => {
  const navigation = useNavigation();
  const fs = require('react-native-fs');
  const [file, setFile] = useState('');

  async function pickDocument() {
    try {
      const result = await launchCamera({});
      console.log(result)
      setFile(result.assets[0].uri)
    } catch (err) {

    }
  };
 
  async function handleSubmit() {
    let data = new FormData();
    console.log(file);
    data.append('my_image', {
      uri: file,
      name: 'image',
      type: 'image/jpeg'
    });
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://bichhang21522041-clip.hf.space/submit',
      headers: { 'Content-Type': 'multipart/form-data' },
      data: data,
    };
    await axios(config).then((response) => {
      navigation.navigate('Starting', { item: file, text: response.data[0] },
      );
    })
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.logoContainer}>
          <Image source={IMG_LOGO}></Image>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.appName}>C L I P</Text>
          <Text style={styles.appTitle}>I  M  A  G  E  C  L  A  S  S  I  F  I  E  R</Text>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.reviewTitle}>
          This app will predict {'\n'}the class based on your image!
        </Text>
        <Text style={styles.fileName}>{file}</Text>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => pickDocument()}>
          <Image source={IC_UPLOAD}></Image>
          <Text style={styles.buttonText}>Upload files</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.submitContainer}
          onPress={() => handleSubmit()}>
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  topContainer: {
    flex: 0.6,
  },
  logoContainer: {
    marginTop: scale(65, 'h'),
    alignSelf: 'center',
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
});

export default UploadScreen;
