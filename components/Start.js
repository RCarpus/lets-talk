import React from 'react';
import { StyleSheet, View, Text, Button, TextInput, ImageBackground,
   TouchableOpacity } from 'react-native';
import Icon from '../assets/CF/icon.svg';
export default class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      activeColor: 1
    };
  }

  chooseBackgroundColor(num) {
    /**
     * When you click on a color circle, that color becomes active.
     * It gets a black border, and the previously active color loses its black border.
     * In reality the border just becomes white.
     * Also sets the backgroundcolor in state to that color.
     */
    this.setState({
      activeColor: num
    });
  }

  render() {
    const { activeColor } = this.state;
    return (
      <View style={s.view}>
        {/* The ImageBackground contains TWO child views */}
        <ImageBackground source={require('../assets/CF/Background-Image.png')} resizeMode='cover' style={s.image}>
          {/* First child of ImageBackground */}
          <Text style={s.title}>Let's Talk</Text>

          {/* Second child of ImageBackground */}
          {/* This inputBox contains THREE child views */}
          <View style={s.inputBox}>

            {/* CHILD 1 */}
            <View style={s.textInput}>
              <Icon style={s.textInputIcon} />
              <TextInput style={s.textInputText}
                onChangeText={(text) => this.setState({ username: text })}
                placeholder={'Your Name'}
              />
            </View>

            {/* CHILD 2 */}
            <View style={s.backgroundColorView}>
              <Text style={s.chooseBackgroundColor}>Choose Background Color:</Text>
              {/* This is used as a horizontal flex wrapper */}
              <View style={s.colorPalleteWrapper}> 
                {/* For each color swathe, use a black border when the color is active. Clicking the button makes it active */}
                <View style={[s.colorSwatheWrapper, (activeColor === 1 ? s.colorSwatheSelected : s.colorSwatheNotSelected)]}>
                  <Text style={[s.colorSwathe, s.color1]} onPress={() => { this.chooseBackgroundColor(1) }}></Text>
                </View>
                <View style={[s.colorSwatheWrapper, (activeColor === 2 ? s.colorSwatheSelected : s.colorSwatheNotSelected)]}>
                  <Text style={[s.colorSwathe, s.color2]} onPress={() => { this.chooseBackgroundColor(2) }}></Text>
                </View>
                <View style={[s.colorSwatheWrapper, (activeColor === 3 ? s.colorSwatheSelected : s.colorSwatheNotSelected)]}>
                  <Text style={[s.colorSwathe, s.color3]} onPress={() => { this.chooseBackgroundColor(3) }}></Text>
                </View>
                <View style={[s.colorSwatheWrapper, (activeColor === 4 ? s.colorSwatheSelected : s.colorSwatheNotSelected)]}>
                  <Text style={[s.colorSwathe, s.color4]} onPress={() => { this.chooseBackgroundColor(4) }}></Text>
                </View>
              </View>
            </View>

            {/* CHILD 3 */}
            {/* Navigate to chat screen. Send username and background as props to be handled in the chat screen */}
            <TouchableOpacity style={s.startChatting}
              onPress={() => this.props.navigation.navigate('Chat', { username: this.state.username, activeColor: this.state.activeColor })}>
              <Text style={s.startChattingText}>Start Chatting</Text>
            </TouchableOpacity>

          </View>
        </ImageBackground>
      </View>
    )
  }
}

const lineHeight = 45;
const circleSize = 40;
const color1 = '#090C08';
const color2 = '#474056';
const color3 = '#8A95A5';
const color4 = '#B9C6AE';

const s = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: 'row'
  },
  title: {
    color: 'white', // SPEC
    fontSize: 45, // SPEC
    fontWeight: '600', // SPEC
    textAlign: 'center',
    flex: 1,
    marginTop: '20%',
  },
  inputBox: {
    width: '88%', // SPEC
    height: '44%', // SPEC
    alignItems: 'center',
    padding: '6%', // SPEC
    backgroundColor: 'white', // SPEC
    marginBottom: '6%' // SPEC
  },
  textInput: { //////////////////////// FIXED HEIGHT
    width: '100%',
    borderWidth: 1,
    borderRadius: 2,
    height: lineHeight,
    flexDirection: 'row',

  },
  textInputIcon: {
    marginTop: 10,
    marginLeft: 15,
    marginRight: 10
  },
  textInputText: {
    fontSize: 16, // SPEC
    fontWeight: '300', // SPEC
    color: '#757083', // SPEC
    opacity: 50, // SPEC
  },
  backgroundColorView: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
  },
  chooseBackgroundColorWrapper: {///////////////////////

  },
  chooseBackgroundColor: {
    marginBottom: 10,
    fontSize: 16, // SPEC
    fontWeight: '300', // SPEC
    color: '#757083', // SPEC
  },
  colorPalleteWrapper: { ///////////////////////////// 
    width: '100%',
    flexDirection: 'row',
    marginBottom: 10,
  },
  colorSwatheWrapper: {
    marginRight: circleSize * 2 / 5,
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
  colorSwatheNotSelected: {
    padding: 2,
    borderWidth: 2,
    borderRadius: (circleSize + 8) / 2,
    borderColor: 'white'
  },
  color1: {
    backgroundColor: color1
  },
  color2: {
    backgroundColor: color2
  },
  color3: {
    backgroundColor: color3
  },
  color4: {
    backgroundColor: color4
  },
  startChatting: { /////////////////////////// FIXED HEIGHT
    height: lineHeight,
    fontWeight: '600', // SPEC
    color: 'white', // SPEC
    backgroundColor: '#757083', // SPEC
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  startChattingText: {
    fontSize: 16, // SPEC
    fontWeight: '600', // SPEC
    color: 'white', // SPEC
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
})