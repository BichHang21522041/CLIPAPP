import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import scale from '../constants/responsive';
import {IMG_DOWNLOAD, IMG_SHARE} from '../assets/images';

const SharePopUp = props => {
  return (
    <View style={styles.viewModal}>
      <TouchableOpacity
        style={styles.viewPopUpLeft}
        onPress={props.onPressDownload}>
        <View style={styles.viewTextPopUp}>
          <Text style={styles.textPopUp}>Download</Text>
          <View style={styles.viewImagePopUp}>
            <Image style={styles.libImg} source={IMG_DOWNLOAD}></Image>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.viewPopUpRight}
        onPress={props.onPressShare}>
        <View style={styles.viewTextPopUp}>
          <Text style={styles.textPopUp}>Share</Text>
          <View style={styles.viewImagePopUp}>
            <Image style={styles.camImg} source={IMG_SHARE}></Image>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  viewModal: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    marginLeft: 0,
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewPopUpLeft: {
    height: '100%',
    borderWidth: 1,
    width: '50%',
    borderTopStartRadius: 30,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    borderColor: 'orange',
  },
  viewPopUpRight: {
    height: '100%',
    borderTopEndRadius: 30,
    borderWidth: 1,
    width: '50%',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    borderColor: 'orange',
  },
  viewTextPopUp: {
    // borderWidth: 1,
    width: scale(139, 'h'),
    height: scale(90, 'h'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  textPopUp: {
    fontSize: scale(25, 'h'),
    color: 'orange',
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: scale(15, 'h'),
  },
  viewImagePopUp: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  libImg: {
    width: scale(112, 'h'),
    height: scale(122, 'h'),
  },
  camImg: {
    width: scale(110, 'h'),
    height: scale(110, 'h'),
  },
});

export default SharePopUp;
