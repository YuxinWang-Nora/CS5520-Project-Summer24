import { StyleSheet, Text, View, Button, } from 'react-native';
import React from 'react';

const GoalItem = (props) => {
    return (
        <View key={props.id} style={styles.textContainer}>
            <Text style={styles.textStyle}>{props.text}</Text>
            <Button title="X" onPress={() => props.deletHandler(props.id)} />
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
    },
    textStyle: {
        fontSize: 20,
        color: 'black',
    }
});

export default GoalItem;