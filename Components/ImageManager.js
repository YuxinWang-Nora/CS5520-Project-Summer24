import React, { useState } from 'react';
import { View, Button, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ImageManager() {
    const [status, requestPermission] = ImagePicker.useCameraPermissions();
    const [imageUri, setImageUri] = useState(null);

    const verifyPermissions = async () => {
        if (status?.granted) {
            return true;
        } else {
            const granted = await requestPermission();
            return granted === 'granted';
        }
    };

    const takeImageHandler = async () => {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            Alert.alert(
                'Insufficient permissions!',
                'You need to grant camera permissions to use this app.',
                [{ text: 'Okay' }]
            );
            return;
        }
        const image = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5,
        });

        setImageUri(image.uri);
    };


    return (
        <View style={styles.container}>
            <Button title="Open Camera" onPress={takeImageHandler} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },
});
