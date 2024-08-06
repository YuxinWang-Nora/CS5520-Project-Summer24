import { View, Text, Button } from 'react-native';
import React, { useState, useLayoutEffect } from 'react';
import { updateDB } from '../Firebase/firebaseHelper';
import GoalUsers from './GoalUsers';
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from '../Firebase/firebaseSetup';
import { useEffect } from 'react';
import LocationManager from './LocationManager';

export default function GoalDetails({ navigation, route }) {
    const [textColor, setTextColor] = useState('black');
    const [headerTitle, setHeaderTitle] = useState(route.params.goalObject.text);
    const [imageUrl, setImageUrl] = useState(null);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: headerTitle,
            headerRight: () => (
                <Button
                    title="Warning"
                    onPress={handleWarningPress}
                    color="white"
                />
            ),
        });
    }, [navigation, headerTitle]);

    useEffect(() => {
        if (route.params.goalObject) {
            const fetchImageUrl = async () => {
                try {
                    console.log(route.params.goalObject.imageUri);
                    const reference = ref(storage, route.params.goalObject.imageUri);
                    const url = await getDownloadURL(reference);
                    setImageUrl(url);
                    console.log("Image URL:", url);
                } catch (error) {
                    console.error("Error fetching image URL:", error);
                }
            };
            fetchImageUrl();
        }
    }, [route.params.goalObject.imageUri]);

    const handleWarningPress = () => {
        setTextColor('red');
        setHeaderTitle('Warning!');
        console.log(route.params.goalObject)
        updateDB(route.params.goalObject.id, 'goals', { warning: true });
    };

    return (
        <View>
            <Text style={{ color: textColor }}>
                You are seeing the detail of the goal with {route.params.goalObject.text} with id {route.params.goalObject.id}
            </Text>
            <Button
                title="More details"
                onPress={() => navigation.push('Details', { goalObject: route.params.goalObject })}
            />
            <LocationManager />
            {/* <GoalUsers id={route.params.goalObject.id} /> */}
        </View>
    );
}
