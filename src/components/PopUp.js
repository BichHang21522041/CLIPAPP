import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import scale from '../constants/responsive'

const Popup = (props) => {
  return (
    <View style={styles.viewModal}>
        <TouchableOpacity style={styles.viewPopUpLeft} onPress={props.onPressUpload}>
                <View style={styles.viewTextPopUp}>
                    <Text style={styles.textPopUp}>Uploads image</Text>
                </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.viewPopUpRight} onPress={props.onPressCamera}>
                <View style={styles.viewTextPopUp}>
                    <Text style={styles.textPopUp}>Camera</Text>
                </View>
        </TouchableOpacity>
    </View>
  )
}

export default Popup

const styles = StyleSheet.create({
    viewModal:{
        width: '100%',
        height:'100%',
        backgroundColor: 'white',
        marginLeft: 0,
        borderTopEndRadius: 30,
        borderTopStartRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
    },
    viewPopUpLeft:{
       height: '100%',
       borderWidth: 1,
       width: '50%',
       borderTopStartRadius: 30,
       alignItems:'center',
       flexDirection: 'column',
       justifyContent: 'center',
       borderColor: 'orange',

    },
    viewPopUpRight:{
        height: '100%',
        borderTopEndRadius: 30,
        borderWidth: 1,
        width: '50%',
        alignItems:'center',
        flexDirection: 'column',
        justifyContent: 'center',
        borderColor: 'orange',

     },
     viewTextPopUp:{
        // borderWidth: 1,
        width: scale(139, 'h'),
        height: scale(90, 'h'),
        alignItems: 'center',
        justifyContent: 'center'
     },
     textPopUp:{
        fontSize: 32,
        color: 'orange',
        fontWeight: '700',
        textAlign: 'center'
     },
     viewImagePopUp:{
        width: scale(139, 'h'),
        height: scale(69, 'h'),
        // borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'
     },
})