import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import scale from '../constants/responsive';
import {Linking} from 'react-native';

const AAPopUp = ({props}) => {
  return (
    <View style={styles.viewModal}>
      <Text style={styles.title}>Này để gì giờ?</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  viewModal: {
    width: '100%',
    height: 'auto',
    backgroundColor: 'white',
    borderRadius: 30,
  },
  title: {
    fontSize: scale(25, 'h'),
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: scale(10, 'h'),
    color: 'black',
  },
  infoContainer: {
    width: 'auto',
    height: 'auto',
    margin: scale(20, 'h'),
  },
  infoContent: {
    fontSize: scale(13, 'h'),
    color: 'black',
    textAlign: 'justify',
    marginTop: scale(10, 'h'),
  },
  infoLink: {
    fontSize: scale(13, 'h'),
    color: 'black',
    textAlign: 'justify',
    marginTop: scale(10, 'h'),
    textDecorationLine: 'underline',
  },
});

export default AAPopUp;
