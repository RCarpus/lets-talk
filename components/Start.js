import React from 'react';
import { StyleSheet, View, Text, Button, TextInput } from 'react-native';

export default class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ''
    };
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{this.state.username}</Text>
        <TextInput style={s.textInput}
          onChangeText={(text) => this.setState({ username: text })}
          placeholder={'Your Name'}
        />
        <Button
          title="Start Chatting"
          onPress={() => this.props.navigation.navigate('Chat', { username: this.state.username })}
        />
      </View>
    )
  }
}

const s = StyleSheet.create({
  textInput: {
    backgroundColor: 'gray',
    width: 100
  }
})