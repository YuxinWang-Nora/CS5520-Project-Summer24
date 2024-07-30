import { useState } from "react";
import React from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

export default function SignUp({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        const auth = getAuth();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log(user);
            Alert.alert("User registered successfully");
        } catch (error) {
            console.log(error);
            Alert.alert("An error occurred");
        }
    }

    function handleLogin() {
        navigation.replace('Login');
    }

    return (
        <View>
            <Text>Sign Up</Text>
            <Text> Email Address</Text>
            <TextInput placeholder="Email"
                onChangeText={(text) => setEmail(text)}
                value={email}
            />
            <Text> Password</Text>
            <TextInput placeholder="Password"
                onChangeText={(text) => setPassword(text)}
                value={password}
                secureTextEntry={true}
            />
            <Text> Confirm Password</Text>
            <TextInput placeholder="Confirm Password"
                onChangeText={(text) => setConfirmPassword(text)}
                value={confirmPassword}
                secureTextEntry={true}
            />

            <Button title="Register" onPress={handleRegister} />
            <Button title="Already have an account? Login" onPress={handleLogin} />

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