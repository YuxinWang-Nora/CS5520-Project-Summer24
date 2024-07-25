import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { writeToDB } from "../Firebase/firebaseHelper";

const GoalUsers = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function fetchUserData() {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/users');
                if (!response.ok) {
                    throw new Error('The request was not successful');
                }
                // if we get here, the response is ok
                const data = await response.json();
                setUsers(data);
                data.forEach((user) => {
                    writeToDB(user, 'godls/${user.id}/users');
                });
            } catch (err) {
                console.log(err);
            }
        }
        fetchUserData();
    }, []);

    return (
        <View>
            <Text>GoalUsers</Text>
            <FlatList
                data={users}
                renderItem={({ item }) => {
                    return <Text>{item.name}</Text>
                }}
            />
        </View>
    );
}

export default GoalUsers;