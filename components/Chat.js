import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import {
  Bubble,
  GiftedChat,
  SystemMessage,
  Day,
  InputToolbar
} from 'react-native-gifted-chat';
import CustomActions from './CustomActions';
import MapView from 'react-native-maps';

//FIREBASE
import firebase from 'firebase';
import 'firebase/firestore';

export default class Chat extends React.Component {
  constructor() {
    super();
    // These are my unique credentials from my firestore console
    const firebaseConfig = {
      apiKey: "AIzaSyAmUJJ5LxuLdfj7lv5V37Nl5BNtvNNh_Fs",
      authDomain: "let-s-talk-c2689.firebaseapp.com",
      projectId: "let-s-talk-c2689",
      storageBucket: "let-s-talk-c2689.appspot.com",
      messagingSenderId: "1049025459242",
      appId: "1:1049025459242:web:da0ba4e84edff497963f53",
      measurementId: "G-XBG0EDEC6C"
    };

    this.state = {
      messages: [],
      uid: null,
      image: null,
    }
    //connects to the database
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    // creates a reference to my collection
    this.referenceMessages = firebase.firestore().collection('messages');
  }

  async getMessages() {
    /**
     * When we load the app, we first want to load messages from database.
     * BUT if offline, this will allow us to view messages while offline 
     * This function is called from componentDidMount
     */
    console.log('getMessages');
    let messages = '';
    try {
      messages = await AsyncStorage.getItem('messages') || [];
      this.setState({
        messages: JSON.parse(messages)
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  async getUid() {
    /**
    * When we load the app, we first want to load uid from database.
    * BUT if offline, this will allow us to have our uid while offline
    * This function is called from componentDidMount
    */
    console.log('getUid');
    let uid = '';
    try {
      uid = await AsyncStorage.getItem('uid') || [];
      this.setState({
        uid
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  async saveMessages() {
    /**
     * save the messages to AsyncStorage.
     * This is done every time we add a new message to the server,
     * so our saved messages should line up with the database.
     */
    try {
      await AsyncStorage.setItem('messages',
        JSON.stringify(this.state.messages));
    } catch (error) {
      console.log(error.message);
    }
  }

  async saveUid() {
    /**
    * save the uid to AsyncStorage.
    * This is done every time we sign in to the server,
    * so our uid should line up with the database.
    */
    try {
      await AsyncStorage.setItem('uid', this.state.uid);
    } catch (error) {
      console.log(error.message);
    }
  }

  async deleteMessages() {
    /**
     * Deletes the messages stored in AsyncStorage. 
     * This is not called anywhere in the app, and is for debugging only
     */
    try {
      await AsyncStorage.removeItem('messages');
      this.setState({
        messages: []
      })
    } catch (error) {
      console.log(error.message);
    }

  }

  componentDidMount() {
    /**
     * First checks to see if the user is online. If they are, sign in to
     * the database and load messages from the database. If the user is 
     * offline, they will load messages from AsyncStorage and will not 
     * have online features.
     */
    NetInfo.fetch().then(connection => {
      if (connection.isConnected) {
        this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
          if (!user) {
            firebase.auth().signInAnonymously();
          }
          this.setState({
            uid: user.uid,
            messages: [],
            isConnected: true,
          });
          // Save the uid to AsyncStorage so we can still know which messages 
          // are ours when offline.
          this.saveUid();
          this.unsubscribe = this.referenceMessages
            .orderBy("createdAt", "desc")
            .onSnapshot(this.onCollectionUpdate);
        });
      } else {
        this.getMessages();
        this.getUid();
        this.setState({
          isConnected: false,
        })
      }

    })

  }

  componentWillUnmount() {
    // close connections when we close the app
    if (this.state.isConnected) {
      this.unsubscribe();
      this.authUnsubscribe();
    }
  }

  onCollectionUpdate = (querySnapshot) => {
    /**
     * Whenever the collection updates, rewrite the new collection to state.
     */
    const messages = [];
    // go through each doc
    querySnapshot.forEach((doc) => {
      // get the data
      var data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: data.user,
        uid: this.state.uid,
        image: data.image || null,
        location: data.location || null,
      });
    });
    this.setState({
      messages
    });
  };

  addMessage() {
    // send a new message to the server
    // the first message in our list is the new one
    const messageToAdd = this.state.messages[0];
    this.referenceMessages.add({
      _id: messageToAdd._id,
      text: messageToAdd.text || '',
      createdAt: messageToAdd.createdAt,
      user: {
        _id: this.state.uid,
        name: this.props.route.params.username,
        avatar: 'https://placeimg.com/140/140/any'
      },
      uid: this.state.uid,
      location: messageToAdd.location || null,
      image: messageToAdd.image || null,
    });
  }

  onSend(messages = []) {
    /**
     * take the new message, add the old messages to it, and set it to state
     * Then add the message to the database.
     * We also save the messages to AsyncStorage for offline use.
     */
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }), () => {
      this.addMessage();
      this.saveMessages();
    })
  }

  renderBubble(props) {
    /**
     * Renders custom color scheme for text bubbles
     */
    const scheme = this.props.route.params.activeColor - 1;
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: colorSchemes[scheme].sentMessageBubble
          },
          left: {
            backgroundColor: colorSchemes[scheme].receivedMessageBubble,
          }
        }}
        textStyle={{
          left: {
            color: colorSchemes[scheme].receivedMessageText
          },
          right: {
            color: colorSchemes[scheme].sentMessageText
          }
        }}
      />
    )
  }

  renderSystemMessage(props) {
    /**
     * Renders custom color scheme for system message
     */
    const scheme = this.props.route.params.activeColor - 1;
    return (
      <SystemMessage
        {...props}
        textStyle={{
          color: colorSchemes[scheme].systemText
        }}
      />
    )
  }

  renderDay(props) {
    /**
     * Renders custom color scheme for date
     */
    const scheme = this.props.route.params.activeColor - 1;
    return (
      <Day {...props} textStyle={{ color: colorSchemes[scheme].systemText }} />
    )
  }

  renderInputToolbar(props) {
    /**
     * Renders custom color scheme for input toolbar
     * Also, only renders the toolbar when the user is online
     */
    const scheme = this.props.route.params.activeColor - 1;
    if (this.state.isConnected) {
      return (
        <InputToolbar {...props}
          primaryStyle={{
            backgroundColor: colorSchemes[scheme].typeMessageBar
          }} />
      )
    }

  }

  renderCustomActions(props) {
    /**
     * Render a button to allow users to select custom actions.
     * When button is pressed, a selector appears with the options
     * Choose photo, take photo, share location, cancel
     */
    return <CustomActions {...props} />
  }

  renderCustomView(props) {
    /**
     * Render a map view if the message contains location data.
     * Location data in a message object takes the form of:
     * { latitude, longitude }
     */
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
          style={{
            width: 150,
            height: 100,
            borderRadius: 13,
            margin: 3
          }}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      );
    }
    return null;
  }

  render() {
    const { username, activeColor } = this.props.route.params;
    const scheme = this.props.route.params.activeColor - 1;

    this.props.navigation.setOptions({ title: username });
    return (
      <View style={{
        flex: 1,
        backgroundColor: colorSchemes[scheme].background
      }}>
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          renderSystemMessage={this.renderSystemMessage.bind(this)}
          renderDay={this.renderDay.bind(this)}
          renderInputToolbar={this.renderInputToolbar.bind(this)}
          renderUsernameOnMessage={true}
          renderActions={this.renderCustomActions}
          renderCustomView={this.renderCustomView}
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: this.state.uid,
            name: username,
            avatar: 'https://placeimg.com/140/140/any'
          }}
        />
      </View>

    )
  }
}

const colorSchemes = [
  /**
   * Custom color schemes selected by clicking background color in Start screen
   */
  {
    background: '#090C08',
    systemText: '#A1A1A1',
    receivedMessageBubble: '#292929',
    receivedMessageText: '#E6E6E6',
    sentMessageBubble: '#454545',
    sentMessageText: '#E6E6E6',
    typeMessageBar: '#4D4D4D',
    typeMessageText: null,
  },
  {
    background: '#474056',
    systemText: '#DEDEDE',
    receivedMessageBubble: '#9B1C73',
    receivedMessageText: '#FFF',
    sentMessageBubble: '#1C479B',
    sentMessageText: '#FFF',
    typeMessageBar: '#1C719B',
    typeMessageText: null,
  },
  {
    background: '#8A95A5',
    systemText: '#2B2B2B',
    receivedMessageBubble: '#F0A400',
    receivedMessageText: '#000',
    sentMessageBubble: '#10F000',
    sentMessageText: '#000',
    typeMessageBar: '#D9D9D9',
    typeMessageText: null,
  },
  {
    background: '#B9C6AE',
    systemText: '#4F4F4F',
    receivedMessageBubble: '#C6AEC3',
    receivedMessageText: '#000',
    sentMessageBubble: '#C6AEAE',
    sentMessageText: '#000',
    typeMessageBar: '#FFF',
    typeMessageText: null,
  },
]

const s = StyleSheet.create({
  giftedChat: {
  }
})