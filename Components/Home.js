import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Button, SafeAreaView, ScrollView, FlatList } from 'react-native';
import Header from './Header';
import Input from './Input';
import GoalItem from './GoalItem';
import React, { useState, useEffect } from 'react';
import PressableButton from './PressableButton';
import { auth, database } from '../Firebase/firebaseSetup';
import { writeToDB, deleteFromDB } from '../Firebase/firebaseHelper';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { storage } from '../Firebase/firebaseSetup';
import { getStorage, ref, uploadBytesResumable } from "firebase/storage";

export default function Home({ navigation }) {
    const appName = "My First App";
    const [goals, setGoals] = useState([]);
    const [isModuleVisiable, setIsModuleVisiable] = useState(false);
    const [reveivedImageUri, setReceivedImageUri] = useState(null);

    useEffect(() => {
        const unsubscribe = onSnapshot(
            query(collection(database, "goals"), where("owner", "==", auth.currentUser.uid)),
            (querySnapshot) => {
                let newArray = [];
                if (!querySnapshot.empty) {
                    querySnapshot.forEach((doc) => {
                        console.log(doc.data());
                        newArray.push({ ...doc.data(), id: doc.id });
                    });
                }
                setGoals(newArray);
            })
        return () => {
            unsubscribe();
        }
    }, []);

    async function retrieveUploadedImage(imageUri) {
        try {
            const respsone = await fetch(imageUri);
            if (!respsone.ok) {
                throw new Error('Image response was not ok');
            }
            const imageBlob = await respsone.blob();
            console.log(imageBlob);

            const imageName = imageUri.substring(imageUri.lastIndexOf('/') + 1);
            const imageRef = ref(storage, `images/${imageName}`);

            const uploadResult = await uploadBytesResumable(imageRef, imageBlob);

            // Get the full path of the uploaded image
            const imageFullPath = uploadResult.metadata.fullPath;

            console.log("Image uploaded successfully. Full path:", imageFullPath);
            return imageFullPath;
        } catch (error) {
            console.log(error);
        }
    }

    function handleInputData(data, imageUri) {
        console.log("input goal text", data);
        console.log("input image uri", imageUri);
        //setReceivedText(data);
        setIsModuleVisiable(false);
        if (imageUri) {
            retrieveUploadedImage(imageUri);
        }

        // define a new object {text: data} 
        // const newGoal = { text: data };
        // setGoals((currentGoals) =>
        //     [...currentGoals, newGoal]
        // );

        const newGoal = { text: data, imageUri: imageUri };
        setGoals((currentGoals) =>
            [...currentGoals, newGoal]
        );

        writeToDB(newGoal, "goals", auth.currentUser.uid);
    }

    function hideModule() {
        setIsModuleVisiable(false);
    }

    function deleteGoal(id) {
        // setGoals((currentGoals) => {
        //     return currentGoals.filter((goal) => goal.id !== id);
        // });
        deleteFromDB(id, "goals");
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
