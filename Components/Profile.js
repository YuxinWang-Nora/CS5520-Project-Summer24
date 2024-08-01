import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { auth } from "../Firebase/firebaseSetup";

const user = auth.currentUser;

export default function Profile() {

    return (
        <View style={styles.container}>
            <Text>Profile</Text>
            {user ? (
                <>
                    <Text>{user.email}</Text>
                    <Text>{user.uid}</Text>
                </>
            ) : (
                <Text>No user is currently logged in.</Text>
            )}
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