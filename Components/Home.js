import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Button, SafeAreaView, ScrollView, FlatList } from 'react-native';
import Header from './Header';
import Input from './Input';
import GoalItem from './GoalItem';
import React, { useState } from 'react';
import PressableButton from './PressableButton';
import { database } from '../Firebase/firebaseSetup';


export default function Home({ navigation }) {
    const appName = "My First App";
    //const [text, setText] = useState('');
    //const [receivedText, setReceivedText] = useState('');
    const [goals, setGoals] = useState([]);
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
                <PressableButton
                    pressFuction={() => setIsModuleVisiable(true)}
                    componentStyle={styles.buttonStyle}
                >
                    <Text style={styles.subtilte}>
                        Add a goal
                    </Text>
                </PressableButton>
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
                {/* <ScrollView>
                    {goals?.map((goalObjext) => {
                        console.log(goalObjext);
                        return (
                            <GoalItem key={goalObjext.id} goal={goalObjext} deletHandler={deleteGoal} pressHandler={handlePressGoal} />
                        )
                    })}
                </ScrollView> */}

                {goals.length === 0 ? (<Text style={styles.textStyle}>Please add a goal</Text>) : (<FlatList
                    data={goals}
                    renderItem={({ item }) => {
                        console.log(item)
                        // return (<GoalItem goal={item} deleteHandler={deleteGoal} pressHandler={handlePressGoal} />)
                        return (<GoalItem goal={item} deleteHandler={deleteGoal} />)
                    }}>
                </FlatList>
                )}
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
        flex: 1.5,
        backgroundColor: 'white',
        alignItems: 'center',
    },

    bottomContainer: {
        flex: 5,
        backgroundColor: '#fdf',
        alignItems: 'center',
        rowGap: 10,
    },

    textContainer: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 10,
    },

    buttonStyle: {
        boarderRadius: 10,
        padding: 5,
        margin: 10,
    },

    subtilte: {
        color: 'purple',
        fontSize: 20,
        //margin: 10,
        padding: 5,
        borderRadius: 20,
    },
});
