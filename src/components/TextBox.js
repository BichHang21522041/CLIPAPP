import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import { IC_SHOW, IC_HIDE } from '../assets/icons';
import scale from '../constants/responsive';

class TextBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      placeholder: props.placeholder,
      secureTextEntry: props.secureTextEntry || false,
      intialSecure: props.secureTextEntry || false,
      isShow: false,
    };
  }

  handleTextChange = text => {
    this.setState({text});
  };

  render() {
    const {text, placeholder, secureTextEntry} = this.state;

    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          // value={text}
          placeholder={placeholder}
          placeholderTextColor={'black'}
          secureTextEntry={secureTextEntry}
          cursorColor={'black'}
          onChangeText={this.props.onChangeText}></TextInput>
        {this.state.intialSecure ? (
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => {
              this.setState({
                isShow: !this.state.isShow,
                secureTextEntry: !this.state.secureTextEntry,
              });
            }}>
            <Image
              style={styles.icon}
              source={this.state.isShow ? IC_HIDE : IC_SHOW}></Image>
          </TouchableOpacity>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: scale(24, 'w'),
    // backgroundColor: 'pink',
    height: scale(67, 'h'),
    paddingHorizontal: scale(20, 'w'),
    backgroundColor: '#EEEEEE',
    marginTop: scale(15, 'h'),
    borderRadius: scale(30, 'w'),
    // justifyContent:'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  textInput: {
    width: '85%',
    color: 'black',
    fontSize: scale(18, 'w'),
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: scale(20, 'w'),
    height: scale(20, 'h'),
    marginLeft: scale(8, 'w'),
  },
});

export default TextBox;