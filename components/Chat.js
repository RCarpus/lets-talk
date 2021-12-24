import React from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Bubble, GiftedChat, SystemMessage, Day, InputToolbar } from 'react-native-gifted-chat';


//FIREBASE
import firebase from 'firebase';
import 'firebase/firestore';

const dummyMessages = [
  {
    _id: 1,
    text: 'Hello developer',
    createdAt: new Date(),
    user: {
      _id: 2,
      name: 'React Native',
      avatar: 'https://placeimg.com/140/140/any',
    },
    image: null,
    video: null,
    sent: true,
    received: true,
    pending: true,
  },
  {
    _id: 2,
    text: `bumbum has entered the chat`,
    createdAt: new Date(),
    system: true,
  }
];

export default class Chat extends React.Component {
  constructor() {
    super();
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
    }

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    this.referenceMessages = firebase.firestore().collection('messages');
  }

  componentDidMount(){
    this.referenceMessages = firebase.firestore().collection('messages');
    this.unsubscribe = this.referenceMessages.orderBy('createdAt', 'desc').onSnapshot(this.onCollectionUpdate);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onCollectionUpdate = (querySnapshot) => {
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
      });
    });
    this.setState({
      messages,
    });
  };

  addMessage() {
    const messageToAdd = this.state.messages[0];
    this.referenceMessages.add({
      _id: messageToAdd._id,
      text: messageToAdd.text,
      createdAt: messageToAdd.createdAt,
      user: this.props.route.params.username,
    });
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }), () => {
      this.addMessage();
    })
  }

  renderBubble(props) {
    /**
     * Renders custom color scheme for text bubbles
     */
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: colorSchemes[this.props.route.params.activeColor - 1].sentMessageBubble
          },
          left: {
            backgroundColor: colorSchemes[this.props.route.params.activeColor - 1].receivedMessageBubble,
          }
        }}
        textStyle={{
          left: {
            color: colorSchemes[this.props.route.params.activeColor - 1].receivedMessageText
          },
          right: {
            color: colorSchemes[this.props.route.params.activeColor - 1].sentMessageText
          }
        }}
      />
    )
  }

  renderSystemMessage(props) {
    /**
     * Renders custom color scheme for system message
     */
    return (
      <SystemMessage
        {...props}
        textStyle={{
          color: colorSchemes[this.props.route.params.activeColor - 1].systemText
        }}
      />
    )
  }

  renderDay(props) {
    /**
     * Renders custom color scheme for date
     */
    return (
      <Day {...props} textStyle={{ color: colorSchemes[this.props.route.params.activeColor - 1].systemText }} />
    )
  }

  renderInputToolbar(props) {
    /**
     * Renders custom color scheme for input toolbar
     */
    return (
      <InputToolbar {...props}
        primaryStyle={{
          backgroundColor: colorSchemes[this.props.route.params.activeColor - 1].typeMessageBar
        }}
      />
    )
  }

  render() {
    const { username, activeColor } = this.props.route.params;
    console.log(this.state);

    this.props.navigation.setOptions({ title: username });
    return (
      <View style={{ flex: 1, backgroundColor: colorSchemes[activeColor - 1].background }}>
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          renderSystemMessage={this.renderSystemMessage.bind(this)}
          renderDay={this.renderDay.bind(this)}
          renderInputToolbar={this.renderInputToolbar.bind(this)}
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: 1,
          }}
        />
        {Platform.OS === 'android' ? <KeyboardAvoidingView behavior='height' /> : null}
      </View>

    )
  }
}

const colorSchemes = [
  /**
   * Custom color schemes selected by clicking a background color in Start screen
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