import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import scale from '../constants/responsive';
import {Linking} from 'react-native';

const AAPopUp = ({props}) => {
  return (
    <View style={styles.viewModal}>
      <Text style={styles.title}>Application Information</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.infoContent}>
          {'\n'}Github:{' '}
          <Text
            style={styles.infoLink}
            onPress={() =>
              Linking.openURL('https://github.com/BichHang21522041/CLIPAPP')
            }>
            https://github.com/clipapp
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
    marginLeft: scale(20, 'h'),
    marginRight: scale(20, 'h'),
    marginBottom: scale(20, 'h'),
    alignItems: 'center',
    //justifyContent: 'center',
  },
  infoContent: {
    fontSize: scale(13, 'h'),
    color: 'black',
    textAlign: 'justify',
    marginTop: scale(5, 'h'),
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
