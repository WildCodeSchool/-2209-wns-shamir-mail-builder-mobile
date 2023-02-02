import React from 'react';
import { View, Alert } from "react-native";
import { Button, ActivityIndicator, Divider } from 'react-native-paper';
import { gql, useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { setToken } from '../../store/tokenReducer';
import * as SecureStore from "expo-secure-store";
import { LoginNavigationProp } from '../../Router/types';
import LoginForm from '../../components/LoginForm';

export const GET_TOKEN = gql`
mutation GetToken($email: String!, $password: String!){
  getToken(email: $email, password: $password)
}`;

const LoginScreen = ({ navigation }: LoginNavigationProp) => {
  const dispatch = useDispatch();
    const [loggingIn, { loading, error }] = useMutation(GET_TOKEN, {
     onCompleted: (data) => {
      if (data.getToken) {
        SecureStore.setItemAsync("token", data.getToken);
        dispatch(setToken(data.getToken));
      }
    },
  });
  if (loading) return <ActivityIndicator size="large" style={{
    marginVertical: 300,
  }}/>
  ;
  if (error) return Alert.alert('Erreur de connexion', `${error.message}`, [
    {
        text: 'Fermer',
        onPress: () => {}
    }
  ]);

    const handleLogin = (email: string, password: string) => {
        loggingIn({ variables: { email, password } });
    };

    return (
            <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}>
              <Divider style={{ alignSelf: "stretch", marginTop: 20 }} horizontalInset />
              <LoginForm handleLogin={handleLogin} />
              <Divider style={{ alignSelf: "stretch", marginTop: 20, marginBottom: 20 }} horizontalInset />
              <Button
              mode="contained"
              onPress={() => {
                navigation.navigate("Inscription");
              }}>Je n&#39;ai pas de compte
              </Button>
            </View>
      
    )
};

export default LoginScreen;