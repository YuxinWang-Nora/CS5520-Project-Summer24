import React, { useState } from "react";
import { Text, View, StyleSheet, Button, Image } from "react-native";
import * as Location from "expo-location";
import { auth } from "../Firebase/firebaseSetup";
import LocationManager from "./LocationManager";

export default function Profile() {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [status, requestPermission] = Location.useForegroundPermissions();

    const verifyPermission = async () => {
        if (status.granted) {
            return true;
        } else {
            const permissionResponse = await requestPermission();
            return permissionResponse.granted;
        }
    };

    const locateUserHandler = async () => {
        const hasPermission = await verifyPermission();
        if (!hasPermission) {
            setErrorMsg('Permission to access location was denied');
            return;
        }

        try {
            const location = await Location.getCurrentPositionAsync({});
            setLocation({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            });
        } catch (err) {
            setErrorMsg('Error getting location');
            console.error(err);
        }
    };

    return (
        <View style={styles.container}>
            <Text>Profile</Text>
            <View>
                {auth.currentUser ? (
                    <View>
                        <Text>{auth.currentUser.email}</Text>
                        <Text>{auth.currentUser.uid}</Text>
                        <LocationManager />
                        {errorMsg && <Text>{errorMsg}</Text>}
                    </View>
                ) : (
                    <Text>No user is currently logged in.</Text>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: 400,
        height: 200,
        marginTop: 20,
    },
});
