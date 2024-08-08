import React, { useState, useEffect } from 'react';
import { View, Button, Text, StyleSheet, Image } from 'react-native';
import * as Location from 'expo-location';
import { mapsApiKey } from '@env';
import { useNavigation, useRoute } from '@react-navigation/native';
import { writeWithIdToDB, getADoc } from '../Firebase/firebaseHelper';
import { auth } from '../Firebase/firebaseSetup';

const LocationManager = () => {
    const [location, setLocation] = useState(null);
    const [status, requestPermission] = Location.useForegroundPermissions();
    const [errorMsg, setErrorMsg] = useState(null);
    const navigation = useNavigation();
    const route = useRoute();

    useEffect(() => {
        if (route.params?.location) {
            setLocation(route.params.location);
            console.log("locatin from route", route.params);
        }
    }, [route.params?.location]);

    useEffect(() => {
        (async () => {
            if (!status) {
                await requestPermission();
            }
        })();
    }, [status, requestPermission]);

    useEffect(() => {
        async function fetchUserLocation() {
            const userDoc = await getADoc('users', auth.currentUser.uid);
            if (userDoc) {
                setLocation(userDoc.location);
                console.log("Loaction from firebase", userDoc.location);
            }
        }
        if (!route.params?.location) {
            fetchUserLocation();
        }
    }, []);

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

    const saveLocationHandler = async () => {
        if (location) {
            await writeWithIdToDB(auth.currentUser.uid, 'users', { location });
            navigation.navigate('Home');
        }
    };

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
            <Button
                title="Save my location"
                onPress={saveLocationHandler}
                disabled={!location}
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
