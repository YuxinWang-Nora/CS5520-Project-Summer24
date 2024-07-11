import { Button, Text, TextInput, StyleSheet, View, Modal, Image } from 'react-native';
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
                    <Image
                        style={styles.imageStyle}
                        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2617/2617812.png' }}
                        alt="target image from network"
                    />
                    <Image
                        style={styles.imageStyle}
                        source={require('../assets/2617812.png')}
                        alt="target image from assets folder"
                    />

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
        //height: 200,
        borderRadius: 20,
        backgroundColor: '#a9a9a9',
        alignItems: 'center',
        justifyContent: 'center',
    },

    buttonStyle: {
        width: "80%",
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
        borderColor: 'purple',
        borderWidth: 1,
        margin: 1,
    },

    imageStyle: {
        width: 100,
        height: 100,
        margin: 1,
    },
});

export default Input;