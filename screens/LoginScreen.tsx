import React, { useState } from 'react';
import { View, Text, Button, TextInput, ActivityIndicator } from "react-native";
import { gql, useMutation } from '@apollo/client';
import { globalStyles } from '../globalStyles';

export const GET_TOKEN = gql`
mutation GetToken($email: String!, $password: String!){
  getToken(email: $email, password: $password)
}`;

const LoginScreen = ({ navigation }: any) => {
    const [email, onChangeEmail] = useState<string>('');
    const [password, onChangePassword] = useState<string>('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [loggingIn, { loading, error }] = useMutation(GET_TOKEN, {
    onCompleted: (data) => {
      if (data.getToken) {
        navigation.navigate("Dashboard");
      }
    },
  });
  if (loading) return <ActivityIndicator size="large" />;
  if (error) return <Text>Error ! `${error.message}`</Text>

    const handleLogin = (email: string, password: string) => {
        loggingIn({ variables: { email, password } });
    };
    return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Text style={globalStyles.title}>Authentification</Text>
                <TextInput
                style={globalStyles.textInput}
                textContentType='emailAddress'
                placeholder='pierre.durand@gmail.com'
                value={email}
                onChangeText={onChangeEmail}
                 />

                <TextInput
                style={globalStyles.textInput}
                textContentType='password'
                secureTextEntry
                onChangeText={onChangePassword}
                value={password}
                 />
                <Button
                title='Connexion'
                onPress={() => handleLogin(email, password)}
                />
                
            </View>
    )
};

export default LoginScreen;