import { StyleSheet, Text, View, Button, Pressable } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import PressableButton from './PressableButton';
import { FontAwesome } from '@expo/vector-icons';

const GoalItem = ({ goal, deleteHandler }) => {
    const navigation = useNavigation();

    return (
        <View key={goal.id} style={styles.textContainer}>
            <Pressable
                android_ripple={{ color: 'pink' }}
                onPress={() => navigation.navigate('Details', { goalObject: goal })}
                style={({ pressed }) => {
                    console.log(pressed);
                    // use an array to return multiple styles
                    return [styles.horizontalContainer, pressed && styles.pressedStyle];
                }}
            >
                <Text style={styles.textStyle}>{goal.text}</Text>
                {/* <Button title="X" onPress={() => deleteHandler(goal.id)} /> */}
                <PressableButton
                    pressFuction={() => deleteHandler(goal.id)}
                    componentStyle={styles.buttonStyle}
                >
                    <FontAwesome name="trash" size={24} color="black" />
                </PressableButton>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    textContainer: {
        margin: 10,
        backgroundColor: '#d3d3d3',
        borderColor: 'pruple',
        borderWidth: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textStyle: {
        fontSize: 20,
        color: 'purple',
    },
    horizontalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#d3d3d3',
        alignItems: 'center',
        padding: 10, // Add padding to the pressable area
    },
    pressedStyle: {
        opacity: 0.5,
        backgroundColor: 'red',
    },
    buttonStyle: {
        marginLeft: 10,
        backgroundColor: 'grey',
        padding: 5,
    },
});

export default GoalItem;