import { View, Text, Button } from 'react-native';
import React, { useState, useLayoutEffect } from 'react';
import { updateDB } from '../Firebase/firebaseHelper';
import GoalUsers from './GoalUsers';

export default function GoalDetails({ navigation, route }) {
    const [textColor, setTextColor] = useState('black');
    const [headerTitle, setHeaderTitle] = useState(route.params.goalObject.text);

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
            {/* <GoalUsers id={route.params.goalObject.id} /> */}
        </View>
    );
}
