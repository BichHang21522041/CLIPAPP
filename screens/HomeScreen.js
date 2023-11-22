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
import {IC_LOGO, IC_ABOUT, IC_EL} from '../src/assets/icons';
import {useNavigation} from '@react-navigation/native';

export const HomeScreen = ({props}) => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.aboutContainer}>
          <TouchableOpacity
            style={styles.aboutBtn}
            onPress={() => navigation.navigate('About')}>
            <Image source={IC_ABOUT}></Image>
          </TouchableOpacity>
        </View>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={IC_LOGO}></Image>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.appName}>C L I P</Text>
          <Text style={styles.appTitle}>I M A G E   C L A S S I F I E R</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button1}
            onPress={() => navigation.navigate('Upload')}>
            <Text style={styles.buttonText}>Predict</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button2}
            onPress={() => navigation.navigate('History')}>
            <Text style={styles.buttonText}>History</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <Image style={styles.el} source={IC_EL}></Image>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'white',
    flex: 1,
  },
  topContainer: {
    flex: 0.6,
  },
  aboutContainer: {
    height: scale(65, 'h'),
    flexDirection: 'row-reverse',
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
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
  buttonContainer: {
    marginTop: scale(50, 'h'),
  },
  button1: {
    width: scale(199, 'w'),
    height: scale(52, 'h'),
    marginTop: scale(18, 'h'),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'orange',
    borderRadius: 50,
    flexDirection: 'row',
  },
  button2: {
    width: scale(199, 'w'),
    height: scale(52, 'h'),
    marginTop: scale(18, 'h'),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    borderRadius: 50,
    flexDirection: 'row',
    zIndex: 9999,
  },
  buttonText: {
    fontSize: scale(20, 'h'),
    fontWeight: 'bold',
    color: 'white',
  },
  bottomContainer: {
    flex: 0.4,
    flexDirection: 'column-reverse',
    zIndex: 0.8,
  },
});

export default HomeScreen;
