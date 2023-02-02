import React from 'react';
import { View, Text } from "react-native";
import { Button } from 'react-native-paper';
import * as SecureStore from 'expo-secure-store';
import { useSelector, useDispatch } from 'react-redux';
import { setToken } from '../store/tokenReducer';
import { RootState } from '../store';

const DashboardScreen = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state: RootState) => state.token.jwt);

    const handleLogout = () => {
        SecureStore.deleteItemAsync("token");
        dispatch(setToken(''));
    };

    return (
        <View style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        }}>
            <Text>Bienvenue sur votre dashboard!</Text>
            {isLoggedIn ? <Button
            onPress={() => handleLogout()}>Déconnexion</Button> : null}
        </View>
    )
};

export default DashboardScreen;