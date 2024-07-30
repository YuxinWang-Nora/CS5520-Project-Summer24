import React from 'react';
import { Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Components/Home';
import GoalDetails from './Components/GoalDetails';
import Login from './Components/Login';
import SignUp from './Components/Signup';
import { app } from './Firebase/firebaseSetup';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='SignUp'
        screenOptions={{
          headerStyle: {
            backgroundColor: 'purple',
          },
          headerTintColor: 'white',
        }}
      >
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: 'All goals',
          }}
        />

        <Stack.Screen
          name="Details"
          component={GoalDetails}
          options={({ route }) => ({
            title: route.params?.goalObject.text
          })} />

        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            title: 'Login',
          }}
        />

        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{
            title: 'Sign Up',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
