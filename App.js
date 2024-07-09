import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Header from './Components/Header';
import Input from './Components/Input';
import React, { useState } from 'react';


export default function App() {
  const appName = "My First React Native App";
  const [text, setText] = useState('');
  const [receivedText, setReceivedText] = useState('');
  function handleInputData(data) {
    console.log("callback fn called", data);
    setReceivedText(data);
  }

  return (
    <View style={styles.container}>
      <Header name={appName} theme="dark">
        <Text>Child1</Text>
        <Text>Child2</Text>
      </Header>
      <Input inputHandler={handleInputData} />
      {/* Use the state variable to render the received data*/}
      <Text>{receivedText}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
