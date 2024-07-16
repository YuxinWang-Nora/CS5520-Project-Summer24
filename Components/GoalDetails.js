import { View, Text } from 'react-native'
import React from 'react'

export default function GoalDetails({ navigation, route }) {
    console.log("route", route);
    return (
        <View>
            <Text>You are seeing the detail of the goal with {route.params.goalObject.text} with id {route.params.goalObject.id}</Text>
        </View>
    )
}