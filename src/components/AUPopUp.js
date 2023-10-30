import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import scale from '../constants/responsive';
import {Linking} from 'react-native';

const AUPopUp = ({props}) => {
  return (
    <View style={styles.viewModal}>
      <Text style={styles.title}>Student Information</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.infoContent}>
          <Text
            style={{
              fontSize: scale(15, 'h'),
              color: 'black',
              fontWeight: '900',
            }}>
            Student 1
          </Text>
          {'\n'}Name: Tran Ngoc Nhat Vy
          {'\n'}ID: 21520536
          {'\n'}Major: Software Engineering
          {'\n'}Github:{' '}
          <Text
            style={styles.infoLink}
            onPress={() => Linking.openURL('https://github.com/ziuwuchuoi')}>
            https://github.com/ziuwuchuoi
          </Text>
        </Text>
        <Text style={styles.infoContent}>
          <Text
            style={{
              fontSize: scale(15, 'h'),
              color: 'black',
              fontWeight: '900',
            }}>
            Student 2
          </Text>
          {'\n'}Name: Le Thi Bich Hang
          {'\n'}ID: 21522041
          {'\n'}Major: Software Engineering
          {'\n'}Github:{' '}
          <Text
            style={styles.infoLink}
            onPress={() =>
              Linking.openURL('https://github.com/BichHang21522041')
            }>
            https://github.com/BichHang21522041
          </Text>
        </Text>
      </View>
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

export default AUPopUp;
