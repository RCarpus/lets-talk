# Let's Talk - My first React Native app
Let's Talk is a chat app for mobile devices using React Native that provides users with a chat interface and options to share images and their location. This project was built over two weeks as a part of CareerFoundry’s web development immersion course. Check out the [case study on my website](http://rcarpus.github.io/case-studies/lets-talk.html) for more information about the development process for this app.

## How to run the application on your mobile device
- If you do not have Expo installed on your computer, install Expo using `npm install expo-cli --global`.
- If you do not have an Expo account, register for an account at https://expo.dev/.
- Download the Expo Go mobile app and sign in with your Expo account.
- Download the code as a zip file.
- unzip the folder, and the terminal, navigate the the root folder, which will be called lets-talk-master.
- From the root directory, download the project dependencies with `npm install`.
- Run `npm run start` to start Expo.
- After the Expo server is running, it will give you several connection options to use the app. The most convenient is the QR code. If it does not display, try pressing '?' to load all options, then press 'c' to show the QR code.
- Within Expo Go, use the "Scan QR Code" tool to scan the QR code displayed by the Expo server.
- At this time, the application should bundle and compile itself and load on your phone. Thanks for taking the time to give it try!

## How to run the application offline on your mobile device
There may be others ways to make this work, but I've outlined the steps that have worked for me to test my app on a Galaxy S9+ Android device in offline mode. Results may vary. 
- Enable USB debug on your phone (Google this for your phone model. It is not straighforward)
- Plug your phone into your computer via USB
- Add ADB to your path (Google this, also this assumes you've already installed Android Studio)
- In powershell, run `adb kill-server`
- run `adb start-server`
- run `adb devices` to ensure it sees your device
- In your project folder, run `expo start --offline`
- Press 'a' to open on Android
- At this point, the app should open on your phone in Expo Go.
- Turn off wifi and data on your phone. (If I do this before starting Expo, it doesn't work for me)
- Shake your phone and click "Reload Expo"
If all goes well, the app should be running in offline mode. When you enter the chat room, you'll see that you can read messages, but there is no input box for you to send messages.

## Setup steps to create a new project in Expo
These steps are not specific to Let's Talk, but is a good reference for starting a new React Native app with Expo.
### Setup Expo account
Make Expo account at https://expo.dev/  
Download Expo app
### Install expo globally
`npm install expo-cli --global`
### Create a new project
Go to directory where you want the new project. This creates a new folder and puts the project in it.  
`expo init project-name`
### Run project to test while developing
`expo start`
scan QR code from phone app to enable the app on phone

## Tools used in Let's Talk
### react-navigation
[react-navigation](https://reactnavigation.org/docs/getting-started/) is a third-party library used for easily navigating between screens.
#### Installation steps
`npm install --save react-navigation  `

`npm install @react-navigation/native @react-navigation/stack  `

`expo install react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view`
#### Import statements
`// import react native gesture handler`

`import 'react-native-gesture-handler';`

`// import react Navigation`

`import { NavigationContainer } from '@react-navigation/native';`

`import { createStackNavigator } from '@react-navigation/stack';`
#### Using the navigator
Place this somewhere before the declaration of the app.  
`// Create the navigator`  
`const Stack = createStackNavigator();`  
In the render function wrap entire app in `<NavigationContainer>`.  
Inside the `<NavigationContainer>` create a `<Stack.Navigator initialRouteName="someScreen>`  
Place routes inside the `<Stack.Navigator>` with `<Stack.Screen name="screenName" component={componentName} />`
### SVG support
React-native does not come with support for SVG format images out of the box. I did not want to convert my SVG logo used on the start screen to a support image format because I wanted it to look good on all screen sizes, so I used a library called [react-native-svg](https://github.com/react-native-svg/react-native-svg) which allowed me to directly import my SVG and use it as a component called "Icon" in my app.
### Chat room implementation
I used the popular [react-native-gifted-chat](https://github.com/FaridSafi/react-native-gifted-chat) library to implement my chat room. Gifted Chat is a well-supported library that offers a customizable chat UI that is easily understood and used, and very easy to implement.
### Offline Support Using AsyncStorage
Install with `@react-native-async-storage/async-storage` as AsyncStorage. See Chat.js and search "AsyncStorage" to see how it is implemented to save and retrieve messages locally.
### Camera and Location features
Camera and location features were implemented using expo-permissions, expo-image-picker, and expo-location. Check out components/CustomActions.js to see how they are implemented.

## Database - Google Cloud Firestore
[Google Cloud Firestore](https://cloud.google.com/firestore#section-4) is a simple and convenient real-time database that can be used for free with small projects. 
