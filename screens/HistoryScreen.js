import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList
} from 'react-native';
import scale from '../src/constants/responsive';
import {IC_ABOUT, IC_BACK} from '../src/assets/icons';
import {useNavigation} from '@react-navigation/native';
import HistoryCard from '../src/components/HistoryCard';
import DeviceInfo from 'react-native-device-info';
import {firebase} from '../configs/FirebaseConfig'

export const HistoryScreen = ({props}) => {
  const navigation = useNavigation();
  const [predictions, setPredictions] = useState([]);

  async function PredictionList() {
    const predictionRef = firebase.firestore().collection('history');
    const predictionSnapshot = await predictionRef.get();
    const predictionData = predictionSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

          const deviceId = await DeviceInfo.getUniqueId();
    const predictionList = predictionData.filter(
      prediction =>
        prediction.id === deviceId
    );

    if (predictionList.length === 0) {
      return [];
    }

    const sortedPredictions = predictionList[0].predictions.sort((a, b) => {
      const dateA = new Date(a.date.toDate());
      const dateB = new Date(b.date.toDate());
      return dateB - dateA;
    });
    return sortedPredictions;
  }

  
  const renderPredictionItem = ({item: prediction}) => {
    const date = prediction.date.toDate();
    const options = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
    };
    const formattedDate = date.toLocaleString('en-GB', options).replace(',', '');
    return (
      <HistoryCard class={prediction.class} image={prediction.image} date={formattedDate}/>
    );
  };

  useEffect(() => {
    console.log("hello")
    PredictionList().then(data => setPredictions(data));
  }, [predictions.length]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.aboutContainer}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => {
            navigation.goBack();
          }}>
          <Image source={IC_BACK}></Image>
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.title}>Check your history prediction!</Text>
      </View>
        <FlatList style={styles.historyContainer}
          data={predictions}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderPredictionItem}
          ListEmptyComponent={<Text style={{textAlign: 'center',}}>There have been no predictions</Text>}
        />
    </SafeAreaView> 
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'white',
    flex: 1,
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
  historyContainer: {
    width: '100%',
    height: '90%',
    alignContent: 'center',
    marginTop: scale(10, 'h'),
  },
  title: {
    color: 'black',
    fontSize: scale(22, 'w'),
    fontStyle: 'italic',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default HistoryScreen;
