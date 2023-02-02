import React from 'react';
import { View, Text, Alert } from 'react-native';
import { ActivityIndicator, Divider } from 'react-native-paper';
import { gql, useMutation } from '@apollo/client';
import { RegisterNavigationProp } from '../../Router/types';
import RegisterForm from '../../components/RegisterForm';


export const CREATE_ACCOUNT = gql`
mutation CreateUser($username: String!, $password: String!, $email: String!, $phone: String!){
  createUser(username: $username, password: $password, email: $email, phone: $phone) {
    username
    phone
    email
  }
}`;

const RegisterScreen = ({ navigation }: RegisterNavigationProp) => {

    const [signUp, { loading, error, data }] = useMutation(CREATE_ACCOUNT, {
        onCompleted: () => {
            navigation.navigate("Connexion");
        },
      });

      if (loading) return <ActivityIndicator size="large" />;
      if (error) return Alert.alert("Erreur lors de l'inscription", `${error}`, [
        {
            text: 'Fermer',
            onPress: () => {}
        }
      ]);

      const handleSignUp = (username: string, password: string, email: string, phone: string) => {
        signUp({ variables: {username, password, email, phone }});
      };

    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor:'white',
        }}>
            <Divider style={{ alignSelf: "stretch", marginTop: 20 }} horizontalInset />
            <RegisterForm handleSignUp={handleSignUp} />
        </View>
    )
};

export default RegisterScreen;