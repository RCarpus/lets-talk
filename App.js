import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Alert, ScrollView } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Importing my screens
import Start from './components/Start';
import Chat from './components/Chat';
import CustomActions from './components/CustomActions';
// Create the navigator
const Stack = createStackNavigator();

const stackOptions = {
  headerStyle: {
    backgroundColor: '#595959',
  },
  headerTitleStyle: {
    color: '#E6E6E6'
  }
}

export default class App extends React.Component {

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Start"
        >
          <Stack.Screen
            name="Start"
            component={Start}
          />
          <Stack.Screen
            name="Chat"
            component={Chat}
            options={stackOptions}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}