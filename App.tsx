import React from 'react';
import {SafeAreaView} from 'react-native';

import {ThemeProvider} from '@shopify/restyle';
import {theme} from './src/theme/theme';
import {EyeOffIcon} from './src/assets/icons/EyeOffIcon';
import {EyeOnIcon} from './src/assets/icons/EyeOnIcon';
import {Icon} from './src/components/Icon/Icon';

function App(): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaView style={{paddingHorizontal: 20}}>
        <EyeOffIcon />
        <EyeOnIcon />
        <Icon name="eyeOff" />
      </SafeAreaView>
    </ThemeProvider>
  );
}

export default App;
