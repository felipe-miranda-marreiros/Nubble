import React from 'react';

import {
  AuthCredentialsProvider,
  MMKVStorage,
  initializeStorage,
} from '@services';
import {ThemeProvider} from '@shopify/restyle';
import {QueryClientProvider, QueryClient} from '@tanstack/react-query';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {Toast} from '@components';
import {Routes} from '@routes';
import {theme} from '@theme';

initializeStorage(MMKVStorage);

const queryClient = new QueryClient();

function App(): JSX.Element {
  return (
    <AuthCredentialsProvider>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <ThemeProvider theme={theme}>
            <Routes />
            <Toast />
          </ThemeProvider>
        </SafeAreaProvider>
      </QueryClientProvider>
    </AuthCredentialsProvider>
  );
}

export default App;
