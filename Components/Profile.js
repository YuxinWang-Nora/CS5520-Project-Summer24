import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { auth } from "../Firebase/firebaseSetup";


export default function Profile() {

    return (
        <View style={styles.container}>
            <Text>Profile</Text>
            <View>
                {auth.currentUser ? (
                    <>
                        <Text>{auth.currentUser.email}</Text>
                        <Text>{auth.currentUser.uid}</Text>
                    </>
                ) : (
                    <Text>No user is currently logged in.</Text>
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});