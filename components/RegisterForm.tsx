import React, { useState } from 'react';
import { View, Text } from "react-native";
import { TextInput, Button } from "react-native-paper";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { globalStyles } from '../globalStyles';

type HandleSignUp = (username: string, password: string, email: string, phone: string) => void;

interface IRegisterFormProps {
    handleSignUp: HandleSignUp;
}

const RegisterForm = ({ handleSignUp }: IRegisterFormProps) => {
    const [username, onChangeUsername] = useState<string>('');
    const [email, onChangeEmail] = useState<string>('');
    const [password, onChangePassword] = useState<string>('');
    const [phone, onChangePhone] = useState<string>('');

    return (
        <View>
            <View style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}>
                <Icon name="account" size={30} />
                <TextInput
                label="Nom d'utilisateur"
                mode="flat"
                style={globalStyles.textInput}
                value={username}
                onChangeText={onChangeUsername}
                />
            </View>
            <View style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}>
                <Icon name="at" size={30} />
                <TextInput
                label="Adresse mail"
                mode="flat"
                style={globalStyles.textInput}
                autoCapitalize="none"
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
                secureTextEntry
                right={<TextInput.Icon icon="eye" />}
                value={password}
                onChangeText={onChangePassword}
                />
            </View>
            <View style={{
                flexDirection: "row",
                alignItems: "center",
                }}>
                <Icon name="phone" size={30} />
                <TextInput
                label="Téléphone"
                mode="flat"
                style={globalStyles.textInput}
                value={phone}
                onChangeText={onChangePhone}
                />
            </View>
            <Button
            mode="contained"
            onPress={() => handleSignUp(username, password, email, phone)}
            >
                Inscription
            </Button>
        </View>
    )
};

export default RegisterForm;