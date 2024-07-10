import { Button, Text, TextInput, StyleSheet, View, Modal } from 'react-native';
import React, { useState } from 'react';

const Input = (props) => {
    const [text, setText] = useState('');
    const [showThankYou, setShowThankYou] = useState(false);


    const handleConfirm = () => {
        console.log("User has typed", text);
        // Call the received callback function
        props.inputHandler(text);
        props.hideModule();
    }

    return (
        <Modal animationType='slide' visible={props.isModuleVisiable} transparent={true}>
            <View style={styles.modalBackground}>
                <View style={styles.container}>
                    <TextInput
                        style={styles.inputStyle}
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
                        <Button title="Cancel" onPress={() => {
                            props.hideModule();
                        }} />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 300,
        height: 200,
        borderRadius: 10,
        backgroundColor: '#a9a9a9',
        alignItems: 'center',
        justifyContent: 'center',
    },

    buttonStyle: {
        width: "30%",
        margin: 5,
        //backgroundColor: 'black',
    },

    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },

    inputStyle: {
        color: 'red',
        fontSize: 20,
        height: 40,
        borderColor: 'purple',
        borderWidth: 1,
    },
});

export default Input;