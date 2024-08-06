import React, { useState } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import * as Location from 'expo-location';

const LocationManager = () => {
    const [location, setLocation] = useState(null);
    const [status, requestPermission] = Location.useForegroundPermissions();
    const [errorMsg, setErrorMsg] = useState(null);

    async function verifyPermission() {
        console.log(status);
        if (status.granted) {
            return true;
        }
        const PermissionStatus = await requestPermission();
        return PermissionStatus.granted;
    }

    const locateUserHandler = async () => {
        const hasPermission = await verifyPermission();
        if (!hasPermission) {
            setErrorMsg('Permission to access location was denied');
            return;
        }

        try {
            const location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        } catch (err) {
            setErrorMsg('Error getting location');
            console.error(err);
        }
    };

    return (
        <View style={styles.container}>
            <Button title="Locate Me" onPress={locateUserHandler} />
            {location && (
                <Text>Location: {`Latitude: ${location.coords.latitude}, Longitude: ${location.coords.longitude}`}</Text>
            )}
            {errorMsg && <Text>{errorMsg}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 20,
        padding: 20,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default LocationManager;
