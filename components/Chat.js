import React from 'react';
import { View, Text} from 'react-native';


export default class Chat extends React.Component {
  render() {
    const { username, backgroundColor } = this.props.route.params;

    this.props.navigation.setOptions({ title: username });
    return (
      <View style={{flex:1, justifyContent: 'center', alignItems: 'center', backgroundColor: backgroundColor}}>
        <Text>Cool background color choice!</Text>
      </View>
    )
  }
}
