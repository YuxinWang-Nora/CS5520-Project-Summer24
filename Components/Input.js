import { Button, Text, TextInput, StyleSheet, View, Modal } from 'react-native';
import React, { useState } from 'react';

const Input = (props) => {
    const [text, setText] = useState('');
    const [showThankYou, setShowThankYou] = useState(false);


    const handleConfirm = () => {
        console.log("User has typed", text);
        // Call the received callback function
        props.inputHandler(text);
    }

    return (
        <Modal animationType='slide' visible={props.isModuleVisiable}>
            <View style={styles.container}>
                <TextInput
                    placeholder="Type here to input!"
                    onChangeText={(text) => {
                        setText(text);
                        setShowThankYou(false);
                    }}
                    value={text}
                    autoFocus={true}
                    onBlur={() => setShowThankYou(true)}
                    onFocus={() => setShowThankYou(false)}
                />

                {showThankYou && <Text>Thank you.</Text>}
                <View style={styles.buttonStyle}>
                    <Button title="Confirm" onPress={() => {
                        handleConfirm();
                    }} />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    buttonStyle: {
        width: "30%",
        margin: 5,
        backgroundColor: "red",
    },
});

export default Input;