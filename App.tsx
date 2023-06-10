import React from 'react';
import {SafeAreaView} from 'react-native';

import {Text} from './src/components/Text/Text';
import {Button} from './src/components/Button/Button';
import {ThemeProvider} from '@shopify/restyle';
import {theme} from './src/theme/theme';

function App(): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaView style={{paddingHorizontal: 20}}>
        <Text preset="headingLarge">Felipe</Text>
        <Button title="Entrar" marginTop="s24" isLoading disabled />
        <Button
          title="Outline"
          disabled
          preset="outline"
          isLoading
          marginTop="s24"
        />
      </SafeAreaView>
    </ThemeProvider>
  );
}

export default App;
