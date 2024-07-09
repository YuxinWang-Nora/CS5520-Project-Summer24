import { Button, Text, TextInput } from 'react-native';
import React, { useState } from 'react';

const Input = () => {
    const [text, setText] = useState('');
    const [showThankYou, setShowThankYou] = useState(false);
    const handleConfirm = () => {
        console.log(text);
    }

    return (
        <>
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
            <Button title="Confirm" onPress={() => {
                handleConfirm();
            }} />
        </>
    );
};
export default Input;