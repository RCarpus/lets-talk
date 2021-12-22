import React from 'react';
import { StyleSheet, View, Text, Button, TextInput, ImageBackground, Image, TouchableOpacity } from 'react-native';

export default class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ''
    };
  }

  render() {
    return (
      <View style={s.view}>
        <ImageBackground source={require('../assets/CF/Background-Image.png')} resizeMode='cover' style={s.image}>
          <Text style={s.title}>Let's Talk</Text>

          <View style={s.inputBox}>
            <View style={s.textInput}>
              <Image source={require('../assets/CF/icon.svg')} style={s.textInputIcon}/>
              <TextInput style={s.textInputText}
                onChangeText={(text) => this.setState({ username: text })}
                placeholder={'Your Name'}
              />
            </View>


            <View style={s.backgroundColorView}>
              <Text style={s.chooseBackgroundColor}>Choose Background Color:</Text>
              <View style={s.colorPalleteWrapper}>
                <View style={s.colorSwatheWrapper}>
                  <Text style={[s.colorSwathe, s.color1]}></Text>
                </View>
                <View style={s.colorSwatheWrapper}>
                  <Text style={[s.colorSwathe, s.color2]}></Text>
                </View>
                <View style={[s.colorSwatheWrapper, s.colorSwatheSelected]}>
                  <Text style={[s.colorSwathe, s.color3]}></Text>
                </View>
                <View style={s.colorSwatheWrapper}>
                  <Text style={[s.colorSwathe, s.color4]}></Text>
                </View>
              </View>
            </View>


            <TouchableOpacity style={s.startChatting}
              onPress={() => this.props.navigation.navigate('Chat', { username: this.state.username })}>
              <Text style={s.startChattingText}>Start Chatting</Text>
            </TouchableOpacity>

          </View>

        </ImageBackground>
      </View>
    )
  }
}

const lineHeight = 55;
const circleSize = 40;

const s = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: 'row-reverse'
  },
  title: {
    color: 'white',
    fontSize: 45,
    fontWeight: '600',
    textAlign: 'center',
    flex: 1,
    marginTop: '20%',
  },
  inputBox: {
    width: '88%',
    height: '44%',
    alignItems: 'center',
    padding: '6%',
    backgroundColor: 'white',
    marginBottom: '6%'
  },
  textInput: {
    width: '100%',
    borderWidth: 1,
    height: lineHeight,
    justifyContent: 'center'
  },
  textInputIcon: {
    height: 20,
    width: 20
  },
  textInputText: {
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    opacity: 50,
  },
  backgroundColorView: {
    width: '100%',
    flex: 1,
    justifyContent: 'center'
  },
  chooseBackgroundColor: {
    height: lineHeight,
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
  },
  colorPalleteWrapper: {
    flexDirection: 'row',
    marginBottom: 10
  },
  colorSwatheWrapper: {
    marginRight: circleSize * 2 / 3,
  },
  colorSwathe: {
    height: circleSize,
    width: circleSize,
    borderRadius: circleSize / 2,
  },
  colorSwatheSelected: {
    padding: 2,
    borderWidth: 2,
    borderRadius: (circleSize + 8) / 2
  },
  color1: {
    backgroundColor: '#090C08'
  },
  color2: {
    backgroundColor: '#474056'
  },
  color3: {
    backgroundColor: '#8A95A5'
  },
  color4: {
    backgroundColor: '#B9C6AE'
  },
  startChatting: {
    height: lineHeight,
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    backgroundColor: '#757083',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  startChattingText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
})