import { StyleSheet, Text, View, } from 'react-native';
import React from 'react';

const GoalItem = (props) => {
    return (
        <View key={props.id} style={props.text}>
            <Text style={styles.textStyle}>{props.text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    textContainer: {
        padding: 10,
        margin: 10,
        backgroundColor: 'lightblue',
        borderColor: 'blue',
        borderWidth: 1,
    },
    textStyle: {
        fontSize: 20,
        color: 'blue',
    }
});

export default GoalItem;