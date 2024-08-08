import React, { useState, useEffect } from 'react';
import { View, Button, Text, StyleSheet, Image } from 'react-native';
import * as Location from 'expo-location';
import { mapsApiKey } from '@env';
import { useNavigation, useRoute } from '@react-navigation/native';

const LocationManager = () => {
    const [location, setLocation] = useState(null);
    const [status, requestPermission] = Location.useForegroundPermissions();
    const [errorMsg, setErrorMsg] = useState(null);
    const navigation = useNavigation();
    const route = useRoute();
    console.log(route.params);

    useEffect(() => {
        if (route.params?.location) {
            setLocation(route.params.location);
        }
    }, [route.params?.location]);

    useEffect(() => {
        (async () => {
            if (!status) {
                await requestPermission();
            }
        })();
    }, [status, requestPermission]);

    const verifyPermission = async () => {
        if (status && status.granted) {
            return true;
        }
        const permissionResponse = await requestPermission();
        return permissionResponse.granted;
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
            console.log(location);
        } catch (err) {
            setErrorMsg('Error getting location');
            console.error(err);
        }
    };

    const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${location?.latitude},${location?.longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:L%7C${location?.latitude},${location?.longitude}&key=${mapsApiKey}`;

    return (
        <View style={styles.container}>
            <Button title="Locate Me" onPress={locateUserHandler} />
            {location && (
                <Image
                    source={{ uri: mapUrl }}
                    style={styles.map}
                />
            )}
            {errorMsg && <Text>{errorMsg}</Text>}
            <Button
                title="Let me choose a location"
                onPress={() => navigation.navigate('Map')}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 20,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: 400,
        height: 200,
        marginTop: 20,
    },
});

export default LocationManager;
