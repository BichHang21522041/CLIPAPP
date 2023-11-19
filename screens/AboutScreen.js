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
import {IC_ABOUT} from '../src/assets/icons';
import {useNavigation} from '@react-navigation/native';
import Modal from 'react-native-modal';
import AUPopUp from '../src/components/AUPopUp';
import AAPopUp from '../src/components/AAPopUp';

export const AboutScreen = ({props}) => {
  const navigation = useNavigation();
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.aboutContainer}>
        <TouchableOpacity
          style={styles.aboutBtn}
          onPress={() => navigation.goBack()}>
          <Image source={IC_ABOUT}></Image>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <TouchableOpacity
          onPress={() => setVisible1(true)}
          style={styles.container1}
          activeOpacity={0.8}>
          <Text style={styles.title}>ABOUT US</Text>
          <View style={styles.textContainer}>
            <Text style={styles.text}>
              Welcome to{' '}
              <Text
                style={{
                  color: 'orange',
                  fontSize: scale(20, 'h'),
                  fontWeight: '700',
                }}>
                CLIP
              </Text>{' '}
              !
            </Text>
            <Text style={styles.text}>
              {'\n'}
              We are students of the{' '}
              <Text
                style={{
                  color: 'orange',
                  fontSize: scale(15, 'h'),
                  fontWeight: '700',
                }}>
                2021 (K16)
              </Text>{' '}
              class at{' '}
              <Text
                style={{
                  color: 'orange',
                  fontSize: scale(15, 'h'),
                  fontWeight: '700',
                }}>
                the University of Information Technology
              </Text>
              , Ho Chi Minh City.
              {'\n'}
              {'\n'}This application is our 1st project, developed under the
              guidance of our instructor,{' '}
              <Text
                style={{
                  color: 'orange',
                  fontSize: scale(15, 'h'),
                  fontWeight: '700',
                }}>
                Nguyen Tan Tran Minh Khang
              </Text>
              .{'\n'}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setVisible2(true)}
          style={styles.container2}
          activeOpacity={0.8}>
          <Text style={styles.title}>ABOUT APPLICATION</Text>
          <View style={styles.textContainer}>
            <Text style={styles.text}>
              This application is built based on the image classification
              problem using{' '}
              <Text
                style={{
                  color: 'orange',
                  fontSize: scale(15, 'h'),
                  fontWeight: '700',
                }}>
                CLIP and zero-shot
              </Text>{' '}
              methods.
            </Text>
            <Text style={styles.text}>
              {'\n'}
              The purpose of the application is to predict the class name of a
              selected image from the user's library or camera.
              {'\n'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.info}>CLIP version 1.0</Text>
      </View>
      <Modal
        style={styles.modalContainer}
        onBackdropPress={() => setVisible1(false)}
        onBackButtonPress={() => setVisible1(false)}
        isVisible={visible1}>
        <AUPopUp></AUPopUp>
      </Modal>
      <Modal
        style={styles.modalContainer}
        onBackdropPress={() => setVisible2(false)}
        onBackButtonPress={() => setVisible2(false)}
        isVisible={visible2}>
        <AAPopUp></AAPopUp>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'orange',
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
    backgroundColor: 'white',
    borderRadius: 50,
    marginRight: scale(10, 'h'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    width: '100%',
    height: 'auto',
    marginHorizontal: scale(20, 'h'),
    marginTop: scale(15, 'h'),
  },
  container1: {
    width: '90%',
    height: 'auto',
    backgroundColor: 'white',
    marginTop: scale(10, 'h'),
    marginRight: scale(10, 'h'),
    padding: scale(5, 'h'),
    borderRadius: 20,
    justifyContent: 'center',
    alignContent: 'center',
  },
  container2: {
    width: '90%',
    height: 'auto',
    backgroundColor: 'white',
    marginTop: scale(20, 'h'),
    marginRight: scale(10, 'h'),
    borderRadius: 20,
    padding: scale(10, 'h'),
    justifyContent: 'center',
    alignContent: 'center',
  },
  title: {
    fontSize: scale(30, 'h'),
    fontWeight: '900',
    color: 'orange',
    textShadowColor: '#F0D47B',
    marginLeft: scale(10, 'h'),
  },
  textContainer: {
    width: '90%',
    marginHorizontal: scale(10, 'h'),
    marginTop: scale(10, 'h'),
  },
  text: {
    textAlign: 'justify',
    flexWrap: 'nowrap',
    fontSize: scale(15, 'h'),
    color: 'black',
    fontWeight: '500',
  },
  infoContainer: {
    width: 'auto',
    height: 'auto',
    alignSelf: 'center',
    marginTop: scale(50, 'h'),
  },
  info: {
    fontSize: scale(10, 'h'),
    fontStyle: 'italic',
  },
  modalContainer: {
    width: '90%',
    //backgroundColor: 'none',
    //marginVertical: scale(80, 'h'),
    borderRadius: 30,
    flex: 1,
    alignSelf: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AboutScreen;
