import { StyleSheet, Text, View, Button, } from 'react-native';
import React from 'react';

const GoalItem = ({ goal, deleteHandler, pressHandler }) => {
    console.log(goal)
    return (
        <View key={goal.id} style={styles.textContainer}>
            <Text style={styles.textStyle}>{goal.text}</Text>
            <Button title="X" onPress={() => deleteHandler(goal.id)} />
            <Button title="Details" onPress={() => pressHandler(goal)} />
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