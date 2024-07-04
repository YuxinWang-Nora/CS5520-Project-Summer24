import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Header from './Components/Header';
import React, { useState } from 'react';

export default function App() {
  const appName = "My First React Native App";
  const [text, setText] = useState('');
  return (
    <View style={styles.container}>
      <Header name={appName} theme="dark">
        <Text>Child1</Text>
        <Text>Child2</Text>
      </Header>
      <TextInput
        placeholder='Type here to input!'
        onChangeText={text => setText(text)}
        value={text}
      />
      <Text>{text}</Text>

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
