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

const StartingScreen = ({ route }) => {
  const { item, text } = route.params;
  console.log(route.params)
  const navigation = useNavigation()
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
        <Text style={styles.text}>Here is your prediction. Hope you are pleased with the result!</Text>
      </View>
      <View style={styles.bottomContainer}>
        <Image source={{ uri: item }} width={300} height={500}></Image>
        <Text style={styles.resultText}>
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
    justifyContent:'center',
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
    fontSize: scale(20, 'h'),
    marginLeft: scale(24, 'w'),
    marginRight: scale(10, 'w')
  },
  resultText: {
    color: 'black',
    fontSize: scale(20, 'h'),
    marginTop: scale(5, 'h'),
    fontStyle: 'italic',
    fontWeight: 'bold',
  }
});

export default StartingScreen;