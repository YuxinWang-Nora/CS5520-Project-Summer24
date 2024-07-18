import { StyleSheet, Text, View, Button } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const GoalItem = ({ goal, deleteHandler }) => {
    const navigation = useNavigation();

    return (
        <View key={goal.id} style={styles.textContainer}>
            <Text style={styles.textStyle}>{goal.text}</Text>
            <Button title="X" onPress={() => deleteHandler(goal.id)} />
            <Button
                title="Details"
                onPress={() => navigation.navigate('Details', { goalObject: goal })}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    textContainer: {
        padding: 10,
        margin: 10,
        backgroundColor: 'lightblue',
        borderColor: 'pruple',
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textStyle: {
        fontSize: 20,
        color: 'black',
    }
});

export default GoalItem;