# My first React Native app
## setup steps
### Setup Expo account
Make Expo account at https://expo.dev/  
Download Expo app
### Install expo globally
`npm install expo-cli --global`
### Create a new project
Go to directory where you want the new project.  
`expo init project-name`
### Run project to test while developing
`expo start`
scan QR code from phone app to enable the app on phone
## react-navigation
[react-navigation](https://reactnavigation.org/docs/getting-started/) is a third-party library used for easily navigating between screens.
### Installation steps
`npm install --save react-navigation  `

`npm install @react-navigation/native @react-navigation/stack  `

`expo install react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view`
### Import statements
`// import react native gesture handler`

`import 'react-native-gesture-handler';`

`// import react Navigation`

`import { NavigationContainer } from '@react-navigation/native';`

`import { createStackNavigator } from '@react-navigation/stack';`
### Using the navigator
Place this somewhere before the declaration of the app.  
`// Create the navigator`  
`const Stack = createStackNavigator();`  
In the render function wrap entire app in `<NavigationContainer>`.  
Inside the `<NavigationContainer>` create a `<Stack.Navigator initialRouteName="someScreen>`  
Place routes inside the `<Stack.Navigator>` with `<Stack.Screen name="screenName" component={componentName} />`
