import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Button, SafeAreaView, ScrollView, FlatList } from 'react-native';
import Header from './Components/Header';
import Input from './Components/Input';
import GoalItem from './Components/GoalItem';
import React, { useState } from 'react';


export default function App() {
  const appName = "My First App";
  //const [text, setText] = useState('');
  //const [receivedText, setReceivedText] = useState('');
  const [goals, setGoals] = useState([""]);
  const [isModuleVisiable, setIsModuleVisiable] = useState(false);

  function handleInputData(data) {
    console.log("callback fn called", data);
    //setReceivedText(data);
    setIsModuleVisiable(false);

    // define a new object {text: data} 
    const newGoal = { text: data, id: Math.random() };
    setGoals((currentGoals) =>
      [...currentGoals, newGoal]
    );
  }

  function hideModule() {
    setIsModuleVisiable(false);
  }

  function deleteGoal(id) {
    setGoals((currentGoals) => {
      return currentGoals.filter((goal) => goal.id !== id);
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <Header name={appName} theme="dark"> </Header>
        <Button title="Add a goal" onPress={() => setIsModuleVisiable(true)} />
      </View>

      <Input
        inputHandler={handleInputData}
        isModuleVisiable={isModuleVisiable}
        hideModule={hideModule}
      />
      <View style={styles.bottomContainer}>
        {/* Use the state variable to render the received data*/}
        {/* <Text style={styles.textStyle}>Your Goal is to:</Text> */}
        {/* <Text style={styles.textStyle}>{receivedText}</Text> */}
        {/* array.map */}
        <ScrollView>
          {goals?.map((goalObjext) => {
            console.log(goalObjext);
            return (
              <GoalItem id={goalObjext.id} text={goalObjext.text} deletHandler={deleteGoal} />
            )
          })}
        </ScrollView>

        {/* <FlatList>
          data={goals}
          renderItem={({ item }) => (
            <View style={styles.textContainer}>
              <Text style={styles.textStyle}>{item.text}</Text>
            </View>
          )}
        </FlatList> */}
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',
  },

  textStyle: {
    color: 'black',
    fontSize: 20,
    margin: 10,
    borderRadius: 10,
    backgroundColor: 'gray',
  },

  topContainer: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },

  bottomContainer: {
    flex: 4,
    backgroundColor: '#fdf',
    alignItems: 'center',
    rowGap: 10,
  },

  textContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 10,
  },
});
