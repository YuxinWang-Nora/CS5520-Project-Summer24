import React from 'react';
import { Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Components/Home';
import GoalDetails from './Components/GoalDetails';
import Login from './Components/Login';
import SignUp from './Components/Signup';
import Profile from './Components/Profile';
import Map from './Components/Map';
import { app } from './Firebase/firebaseSetup';
import { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './Firebase/firebaseSetup';
import { Ionicons } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications';
import { Linking } from 'react-native';


const Stack = createNativeStackNavigator();

const AuthStack = <>
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
</>;

const MainStack = <>
  <Stack.Screen
    name="Home"
    component={Home}
    options={({ navigation }) => ({
      title: 'All goals',
      headerRight: () => (
        <Ionicons
          name="person-circle"
          size={30}
          color="white"
          onPress={() => navigation.navigate('Profile')}
          style={{ marginRight: 10 }}
        />
      )
    })}
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
    }} />

  <Stack.Screen
    name="Profile"
    component={Profile}
    options={({ navigation }) => ({
      title: 'Profile',
      headerRight: () => (
        <Ionicons
          name="log-out"
          size={30}
          color="white"
          onPress={() => {
            try {
              signOut(auth);
              navigation.replace('Login');
            } catch (error) {
              console.log(error);
            }
          }}
          style={{ marginRight: 10 }}
        />
      )
    })
    }
  />

  <Stack.Screen
    name="Map"
    component={Map}
    options={{
      title: 'Map',
    }}
  />
</>;


Notifications.setNotificationHandler({
  // handleNotification: async () => {
  //   return {
  //     shouldShowAlert: true,
  //     shouldPlaySound: false,
  //     shouldSetBadge: false,
  //   };
  // },
  // handleSuccess: notificationId => {
  //   console.log(`Notification ${notificationId} successfully handled.`);
  // },
  // handleError: (notificationId, error) => {
  //   console.error(`Notification ${notificationId} failed with error: `, error);
  // },
  handleNotification: async (notification) => {
    return {
      shouldShowAlert: true,
    };
  },
});


export default function App() {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsUserAuthenticated(true);
      } else {
        setIsUserAuthenticated(false);
      }
    }
    )
  }, []);

  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(notification => {
      console.log("Notification received: ", notification);
    });

    return () => subscription.remove(); // the cleanup function
  }, []);

  useEffect(() => {
    const responseSubscription = Notifications.addNotificationResponseReceivedListener(response => {
      console.log("Notification response received: ", response);
      const data = response.notification.request.content.data;
      Linking.openURL(data.url);
    });
    return () => responseSubscription.remove();
  }, []);

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
        {isUserAuthenticated ? MainStack : AuthStack}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// return (
//   <NavigationContainer>
//     <Stack.Navigator
//       initialRouteName='SignUp'
//       screenOptions={{
//         headerStyle: {
//           backgroundColor: 'purple',
//         },
//         headerTintColor: 'white',
//       }}
//     >
//       <Stack.Screen
//         name="Home"
//         component={Home}
//         options={{
//           title: 'All goals',
//         }}
//       />

//       <Stack.Screen
//         name="Details"
//         component={GoalDetails}
//         options={({ route }) => ({
//           title: route.params?.goalObject.text
//         })} />

//       <Stack.Screen
//         name="Login"
//         component={Login}
//         options={{
//           title: 'Login',
//         }}
//       />

//       <Stack.Screen
//         name="SignUp"
//         component={SignUp}
//         options={{
//           title: 'Sign Up',
//         }}
//       />
//     </Stack.Navigator>
//   </NavigationContainer>
//   )
// }
