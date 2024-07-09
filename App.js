import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Button, SafeAreaView } from 'react-native';
import Header from './Components/Header';
import Input from './Components/Input';
import React, { useState } from 'react';


export default function App() {
  const appName = "My First React Native App";
  const [text, setText] = useState('');
  const [receivedText, setReceivedText] = useState('');
  const [isModuleVisiable, setIsModuleVisiable] = useState(false);
  function handleInputData(data) {
    console.log("callback fn called", data);
    setReceivedText(data);
    setIsModuleVisiable(false);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <Header name={appName} theme="dark"> </Header>
        <Button title="Add a goal" onPress={() => setIsModuleVisiable(true)} />
      </View>

      <Input inputHandler={handleInputData} isModuleVisiable={isModuleVisiable} />
      <View style={styles.bottomContainer}>
        {/* Use the state variable to render the received data*/}
        <Text style={styles.textStyle}>{receivedText}</Text>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  textStyle: {
    color: 'red',
    fontSize: 20,
  },

  topContainer: {
    flex: 1,
    backgroundColor: 'red',
  },

  bottomContainer: {
    flex: 4,
    backgroundColor: 'black',
  }
});
