import React from "react";
import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";


export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleLogin() {

    }

    function handleSignUp() {
        navigation.replace('SignUp');
    }

    return (
        <View style={styles.container}>
            <Text>Login</Text>
            <Text> Email Address</Text>
            <TextInput placeholder="Email"
                onChangeText={(text) => setEmail(text)}
                value={email}
                secureTextEntry={true}
                style={styles.inputStyle}
            />
            <Text> Password</Text>
            <TextInput placeholder="Password"
                onChangeText={(text) => setPassword(text)}
                value={password}
                secureTextEntry={true}
            />

            <Button title="Login" onPress={handleLogin} />
            <Button title="New User? Create an account" onPress={handleSignUp} />

        </View>
    )
}

const styles = StyleSheet.create({
    inputStyle: {
        width: '80%',
        borderColor: 'black',
        borderWidth: 1,
        padding: 10,
        marginBottom: 10
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

