import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { writeToDB, readAllData } from "../Firebase/firebaseHelper";

const GoalUsers = ({ id }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function fetchUserData() {
            try {
                // before we fetch the data, check if the data is already in the database
                const dataFromFirebase = await readAllData(`goals/${id}/users`);
                if (dataFromFirebase.length) {
                    setUsers(dataFromFirebase);
                    return;
                }

                const response = await fetch('https://jsonplaceholder.typicode.com/users');
                if (!response.ok) {
                    throw new Error('The request was not successful');
                }
                // if we get here, the response is ok
                const data = await response.json();
                setUsers(data);
                console.log("Array from URL", data);
                data.forEach((user) => {
                    writeToDB(user, `goals/${id}/users`);
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