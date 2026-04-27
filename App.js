import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import TabNavigator from './src/navigation/TabNavigator';
import SplashScreen from './src/screens/SplashScreen';
import RoleSelection from './src/screens/RoleSelection';
import { getAuth, onAuthStateChanged } from '@react-native-firebase/auth';
import { getApp } from '@react-native-firebase/app';
import Toast from 'react-native-toast-message';
import { StatusBar } from 'react-native';

// const express = require("express");
// const app = express();
// const connectDB = require("./expo")
const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const auth = getAuth(getApp());

    const unsubscribe = onAuthStateChanged(auth, firebaseUser => {
      setUser(firebaseUser);
      setLoading(false);
    });

    // const start = async () => {
    //   try{
    //     await connectDB();
    //     app.listen(PointerType,() => {
    //       console.log('${PORT} Yes I am conected');
    //     });
    //   }
    //   catch(error){
    //     console.log("Error",error);
    //   }
    // }

    // Splash timer
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => {
      unsubscribe();
      clearTimeout(timer);
    };
  }, []);

  //  Splash FIRST (no navigation here)
  if (showSplash) {
    return <SplashScreen />;
  }

  //  Firebase loading
  if (loading) {
    return null;
  }

  return (
    <>
      <NavigationContainer>
        <StatusBar
          barStyle="dark-content" // text color (white)
          backgroundColor="#1a2a6c" // your app color
        />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {user || isAdminLoggedIn ? (
            <Stack.Screen name="Home" component={TabNavigator} />
          ) : (
            <>
              {/* Splash removed from here */}
              <Stack.Screen name="RoleSelection" component={RoleSelection} />
     <Stack.Screen
  name="Login"
  component={LoginScreen}
  initialParams={{ setIsAdminLoggedIn }}
/>
              <Stack.Screen name="Register" component={RegisterScreen} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>

      <Toast />
    </>
  );
}
