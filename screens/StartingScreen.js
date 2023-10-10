import React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import scale from '../src/constants/responsive';
import { IC_BACK, IC_MUSIC } from '../src/assets/icons';
import { useNavigation } from '@react-navigation/native';

const StartingScreen = ({route}) => {
  const {item} = route.params;
  const navigation = useNavigation()
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
      {console.log('item',item)}
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
        <Text style={styles.text}>Here is your prediction. Hope you are pleased with the result!</Text>
      </View>
      <View style={styles.bottomContainer}>
          {/* <Text style={styles.fileStatus}>You have already uploaded the image.</Text>
          <Text style={styles.blackText}>Let’s click<Text style={styles.orangeText}> the button </Text>to {'\n'}predict {'\n'}based on your image!</Text>
          <TouchableOpacity style={styles.buttonContainer}
          onPress={()=> navigation.navigate("Export")}>
          <Image source={IC_MUSIC}></Image>
          <Text style={styles.buttonText}>Predict</Text>
        </TouchableOpacity> */}
        {/* <Image></Image> */}
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
    marginTop: scale(10, 'h'),
    fontWeight: 'bold',
  },
  bottomContainer: {
    flex: 0.7,
    backgroundColor: 'white',
    borderTopStartRadius: scale(40, 'w'),
    borderTopEndRadius: scale(40, 'w'),
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
    fontSize: scale(20, 'h'),
    marginLeft: scale(24, 'w'),
    marginRight: scale(10, 'w')
  }
});

export default StartingScreen;
// import { View, Text } from 'react-native'
// import React from 'react'

// export default function StartingScreen() {
//   return (
//     <View>
//       <Text>hello</Text>
//     </View>
//   )
// }
