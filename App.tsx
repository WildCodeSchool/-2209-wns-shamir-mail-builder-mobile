import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from "@apollo/client/link/context";
import { StyleSheet, AppRegistry } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as ReduxProvider } from 'react-redux';
import * as SecureStore from "expo-secure-store";
import Router from './Router/Router';
import { store } from './store';

import Constants from "expo-constants";

const { manifest } = Constants;

// @ts-ignore:
const uri = `http://${manifest?.debuggerHost?.split(':').shift()}:5000/graphql`;
const httpLink = createHttpLink({
  uri,
});

const authLink = setContext(async (_, { headers }) => {
  const token = await SecureStore.getItemAsync("token");

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const appName: string = 'mobile-builder';

export default function App() {
  return (
    <ApolloProvider client={client}>
      <ReduxProvider store={store}>
        <PaperProvider>
          <Router />  
        </PaperProvider>
      </ReduxProvider>
    </ApolloProvider>
  );
}

AppRegistry.registerComponent(appName, () => App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
