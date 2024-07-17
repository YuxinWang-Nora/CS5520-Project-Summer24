import { View, Text, Button } from 'react-native';
import React, { useState, useEffect } from 'react';

export default function GoalDetails({ navigation, route }) {
    const [textColor, setTextColor] = useState('black');
    const [headerTitle, setHeaderTitle] = useState(route.params.goalObject.text);

    useEffect(() => {
        navigation.setOptions({ title: headerTitle });
    }, [headerTitle]);

    const handleWarningPress = () => {
        setTextColor('red');
        setHeaderTitle('Warning!');
    };

    return (
        <View>
            <Text style={{ color: textColor }}>
                You are seeing the detail of the goal with {route.params.goalObject.text} with id {route.params.goalObject.id}
            </Text>
            <Button title="Warning" onPress={handleWarningPress} />
        </View>
    );
}
