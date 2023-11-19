import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import scale from '../src/constants/responsive';
import {IC_ABOUT, IC_BACK} from '../src/assets/icons';
import {useNavigation} from '@react-navigation/native';
import HistoryCard from '../src/components/HistoryCard';

export const HistoryScreen = ({props}) => {
  const navigation = useNavigation();

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
        <Text style={styles.title}>Check your history predition!</Text>
      </View>
      <ScrollView style={styles.historyContainer}>
        <HistoryCard></HistoryCard>
        <HistoryCard></HistoryCard>
        <HistoryCard></HistoryCard>
        <HistoryCard></HistoryCard>
        <HistoryCard></HistoryCard>
        <HistoryCard></HistoryCard>
        <HistoryCard></HistoryCard>
      </ScrollView>
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
