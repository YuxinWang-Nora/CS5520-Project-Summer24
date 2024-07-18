import { StyleSheet, Text, View, Button, Pressable } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const GoalItem = ({ goal, deleteHandler }) => {
    const navigation = useNavigation();

    return (
        <View key={goal.id} style={styles.textContainer}>
            <Pressable
                onPress={() => navigation.navigate('Details', { goalObject: goal })}
                style={styles.pressable}
            >
                <Text style={styles.textStyle}>{goal.text}</Text>
                <Button title="X" onPress={() => deleteHandler(goal.id)} />
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    textContainer: {
        margin: 10,
        backgroundColor: 'grey',
        borderColor: 'pruple',
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textStyle: {
        fontSize: 20,
        color: 'black',
    },
    pressable: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10, // Add padding to the pressable area
    }
});

export default GoalItem;