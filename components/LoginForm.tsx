import React, { useState } from 'react';
import { View, Text } from "react-native";
import { TextInput, Button } from "react-native-paper"
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { globalStyles } from '../globalStyles';

type HandleLogin = (email: string, password: string) => void;

interface ILoginFormProps {
    handleLogin: HandleLogin,
}

const LoginForm = ({ handleLogin }: ILoginFormProps) => {
    const [email, onChangeEmail] = useState<string>('');
    const [password, onChangePassword] = useState<string>('');

    return ( 
            <View>
                <View style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}>
                  <Icon name="at" size={30} />
                  <TextInput
                  label="Adresse mail"
                  mode="flat"
                  style={globalStyles.textInput}
                  textContentType="emailAddress"
                  autoCapitalize='none'
                  placeholder='pierre.durand@gmail.com'
                  value={email}
                  onChangeText={onChangeEmail}
                  />
                 </View>
                 <View style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}>
                  <Icon name="lock" size={30} />
                  <TextInput
                  label="Mot de passe"
                  mode="flat"
                  style={globalStyles.textInput}
                  textContentType="password"
                  secureTextEntry
                  right={<TextInput.Icon icon="eye" />}
                  onChangeText={onChangePassword}
                  value={password}
                  />
                 </View>
                <Button
                mode="contained"
                onPress={() => handleLogin(email, password)}
                >
                Connexion
                </Button>
            </View>
    )
};

export default LoginForm;