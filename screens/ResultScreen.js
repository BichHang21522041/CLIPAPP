import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert
} from 'react-native';
import scale from '../src/constants/responsive';
import {IC_BACK, IC_MUSIC} from '../src/assets/icons';
import {useNavigation} from '@react-navigation/native';
import DeviceInfo from 'react-native-device-info';
// import firestore from '@react-native-firebase/firestore';
import {firebase} from '../configs/FirebaseConfig'
import {utils} from '@react-native-firebase/app'
import storage from '@react-native-firebase/storage'

const StartingScreen = ({route}) => {
  const {item, text} = route.params;
  console.log(route.params);
  const navigation = useNavigation();
  const [id, setID] = useState();

  useEffect(() => {
    addPrediction()
  }, []);

  const addPrediction = async () => {
    try {
      const deviceId = await DeviceInfo.getUniqueId();
      const url = await handleUpload();
      const prediction = {class: text, image: url}
      const historyRef = firebase.firestore().collection('history');
      const querySnapshot = await historyRef.where('id', '==', deviceId).get();
      const now = firebase.firestore.Timestamp.now()

      if (!querySnapshot.empty) {
        // Document with the deviceId already exists, update the existing document
        const docId = querySnapshot.docs[0].id; // Assuming there is only one document with the deviceId
        const existingPredictions = querySnapshot.docs[0].data().predictions || [];
        const updatedPredictions = [...existingPredictions, prediction];
        console.log("helllo1")
        await historyRef.doc(docId).update({
          predictions: updatedPredictions
        });
      } else {
        console.log("helllo2")
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
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function() {
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
          console.log(blob)
          const reference = storage().ref().child(`images/${Date.now()}`);
          const task = reference.put(blob);

          task.on('state_changed', (snapshot) => {
            console.log(
              `${(snapshot.bytesTransferred / snapshot.totalBytes) * 100}% completed`
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
        {console.log(item)}
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => {
              navigation.goBack();
            }}>
            <Image source={IC_BACK}></Image>
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
    marginTop: scale(36, 'h'),
    marginLeft: scale(24, 'w'),
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
});

export default StartingScreen;
