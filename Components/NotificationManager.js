import React from 'react';
import { View, Button, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';

export const verifyPermission = async () => {
    const response = await Notifications.getPermissionsAsync();
    if (response.granted) {
        console.log("Permission granted");
        return true;
    }

    const requestResponse = await Notifications.requestPermissionsAsync();
    return requestResponse.granted;
};

const NotificationManager = () => {

    // const verifyPermission = async () => {
    //     const response = await Notifications.getPermissionsAsync();
    //     if (response.granted) {
    //         console.log("Permission granted");
    //         return true;
    //     }

    //     const requestResponse = await Notifications.requestPermissionsAsync();
    //     return requestResponse.granted;
    // };

    const scheduleNotificationHandler = async () => {
        const hasPermission = await verifyPermission();
        if (!hasPermission) {
            Alert.alert("Permission Required", "Notification permissions are required to set reminders.");
            return;
        }

        try {
            const notificationId = await Notifications.scheduleNotificationAsync({
                content: {
                    title: "Reminder",
                    body: "Please add a new goal!",
                    data: { url: "https://www.google.com" },
                },
                trigger: {
                    seconds: 5,
                },
            });
            Alert.alert("Notification Scheduled", `Notification ID: ${notificationId}`);
        } catch (err) {
            console.error("Notification scheduling error: ", err);
        }
    };

    return (
        <View>
            <Button title="Reminde me to add a new goal" onPress={scheduleNotificationHandler} />
        </View>
    );
};

export default NotificationManager;