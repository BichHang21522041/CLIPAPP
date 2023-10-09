import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import scale from '../src/constants/responsive';
import {IMG_LOGO} from '../src/assets/images';
import {IC_UPLOAD} from '../src/assets/icons';
import {useNavigation} from '@react-navigation/native';
import DocumentPicker from 'react-native-document-picker';
//import storage from '@react-native-firebase/storage'
import {PermissionsAndroid} from 'react-native';
import axios from 'axios';
import FormData from 'form-data';

export const UploadScreen = ({props}) => {
  const navigation = useNavigation();

  const [file, setFile] = useState('');
  async function pickDocument() {
    try {
      // let index = 0
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      // const newResult = result.map(item =>({
      //   ...item,
      //   key: index.toString()
      //   }))

      //   console.log(newResult)
      // setDocuments(prevData => [
      //   ...prevData,
      //   result[0]
      // ]);
      setFile(result[0]);

      // index++;

      console.log(result[0]);
      // navigation.navigate("Starting")
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker
      } else {
        throw err;
      }
    }
  }

  const fs = require('react-native-fs');
  async function handleSubmit() {
    let data = new FormData();
    data.append('my_image', file);

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://bichhang21522041-clip.hf.space/submit',
      headers: {'Content-Type': 'multipart/form-data'},
      data: data,
    };

    try {
      const response = await axios(config);
      console.log(response.data[0]);
    } catch (error) {
      console.error(error);
    }

    // axios.request(config)
    // .then((response) => {
    //   console.log(data)
    //   console.log(JSON.stringify(response.data));
    // })
    // .catch((error) => {
    //   console.log(error);
    // });
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.logoContainer}>
          <Image source={IMG_LOGO}></Image>
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
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => pickDocument()}>
          <Image source={IC_UPLOAD}></Image>
          <Text style={styles.buttonText}>Upload files</Text>
        </TouchableOpacity>
        <Text>{file.name}</Text>
        <TouchableOpacity>
          <Text style={styles.buttonText} onPress={() => handleSubmit()}>
            Submit
          </Text>
        </TouchableOpacity>
        <Text style={styles.note}>
          Upload image file for the app to predict the class name.
        </Text>
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
    flex: 0.4,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: '#FFA500',
  },
  reviewTitle: {
    textAlign: 'center',
    marginTop: scale(36, 'h'),
    fontSize: scale(25, 'h'),
    fontWeight: 'bold',
    color: 'white',
  },
  buttonContainer: {
    width: scale(199, 'w'),
    height: scale(52, 'h'),
    marginTop: scale(60, 'h'),
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
});

export default UploadScreen;
