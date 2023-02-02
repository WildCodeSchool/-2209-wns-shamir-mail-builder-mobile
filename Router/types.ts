import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
    Connexion: undefined;
    Dashboard: undefined;
    Inscription: undefined;
  };

  export type LoginNavigationProp = NativeStackScreenProps<RootStackParamList, "Connexion">;
  export type RegisterNavigationProp = NativeStackScreenProps<RootStackParamList, "Inscription">;