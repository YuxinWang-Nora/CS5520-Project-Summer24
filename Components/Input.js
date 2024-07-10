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
        setText('');
    }

    const handleCancel = () => {
        props.hideModule();
        setText('');
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
                        <Button title="Cancel" onPress={() => {
                            handleCancel();
                        }} />
                        <Button
                            title="Confirm"
                            disabled={text.length === 0}
                            onPress={() => {
                                handleConfirm();
                            }}
                        />
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
        width: "100%",
        margin: 15,
        //backgroundColor: 'black',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },

    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },

    inputStyle: {
        color: 'black',
        fontSize: 20,
        height: 40,
        borderColor: 'purple',
        borderWidth: 1,
    },
});

export default Input;