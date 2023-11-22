import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import scale from '../constants/responsive';
import {IMG_CAMERA} from '../assets/images';

const HistoryCard = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Image style={styles.img} source={{uri: props.image}}></Image>
      </View>
      <View style={styles.textContainer}>
        <Text
          style={{
            fontSize: scale(20, 'h'),
            color: 'black',
            marginTop: scale(-50, 'h'),
          }}>
          Predition:
        </Text>
        <Text
          style={{
            fontSize: scale(40, 'h'),
            fontStyle: 'italic',
            color: 'orange',
            fontWeight: 'bold',
            marginTop: scale(20, 'h'),
          }}>
          {props.class}
        </Text>

        <Text
          style={{
            fontSize: scale(18, 'h'),
            color: 'black',
            marginTop: scale(30, 'h'),
          }}>
          {props.date}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '95%',
    height: scale(250, 'h'),
    backgroundColor: 'white',
    marginBottom: scale(10, 'h'),
    marginTop: scale(5, 'h'),
    flexDirection: 'row',
    alignSelf: 'center',
    borderColor: 'orange',
    borderWidth: scale(2, 'h'),
    borderRadius: 30,
  },
  imgContainer: {
    width: '50%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: '80%',
    height: '80%',
  },
  textContainer: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HistoryCard;
