import React from 'react';
import { Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Components/Home';
import GoalDetails from './Components/GoalDetails';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: 'All goals',
            headerStyle: {
              backgroundColor: 'purple',
            },
            headerTintColor: 'white',
          }}
        />
        <Stack.Screen
          name="Details"
          component={GoalDetails}
          options={({ route }) => ({
            title: route.params?.goalObject.text,
            headerStyle: {
              backgroundColor: 'purple',
            },
            headerTintColor: 'white',
            headerRight: () => (
              <Button title="Warning" onPress={() => { console.log("Warning button pressed") }} />)
          })} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
