// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { useSelector } from 'react-redux';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import DashboardScreen from '../screens/DashboardScreen';
import { RootState } from '../store';

const Stack = createNativeStackNavigator<RootStackParamList>();

const Router = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const jwt = useSelector((state: RootState) => state.token.jwt);

  useEffect(() => {
    setIsLoggedIn(!isLoggedIn)
    if (jwt !== '') {
      setIsLoggedIn(!isLoggedIn);
    }
  }, [jwt]);
  
  console.log(jwt, isLoggedIn);
    return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Connexion">
            {!isLoggedIn && <Stack.Screen name="Connexion" component={LoginScreen} />}
            {isLoggedIn && <Stack.Screen name="Dashboard" component={DashboardScreen} />}
            <Stack.Screen name="Inscription" component={RegisterScreen} />
          </Stack.Navigator>
        </NavigationContainer>
    )
};

export default Router;