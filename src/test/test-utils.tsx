import {PropsWithChildren} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {AuthCredentialsProvider} from '@services';
import {ThemeProvider} from '@shopify/restyle';
import {
  QueryClient,
  QueryClientConfig,
  QueryClientProvider,
} from '@tanstack/react-query';
import {
  RenderHookOptions,
  RenderOptions,
  render,
  renderHook,
} from '@testing-library/react-native';

import {Toast} from '@components';
import {theme} from '@theme';

const queryClientConfig: QueryClientConfig = {
  logger: {
    //@ts-ignore
    error: process.env.NODE_ENV === 'test' ? () => {} : console.error,
    log: console.log,
    warn: console.warn,
  },
  defaultOptions: {
    queries: {
      retry: false,
      cacheTime: Infinity,
    },
    mutations: {
      retry: false,
      cacheTime: Infinity,
    },
  },
};

export const wrapperAllTheProviders = () => {
  const queryClient = new QueryClient(queryClientConfig);

  return ({children}: PropsWithChildren) => (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>{children}</NavigationContainer>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export const wrapperScreenProviders = () => {
  const queryClient = new QueryClient(queryClientConfig);

  return ({children}: PropsWithChildren) => (
    <AuthCredentialsProvider>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <NavigationContainer>{children}</NavigationContainer>
          <Toast />
        </QueryClientProvider>
      </ThemeProvider>
    </AuthCredentialsProvider>
  );
};

function customRender<T = unknown>(
  component: React.ReactElement<T>,
  options?: Omit<RenderOptions, 'wrapper'>,
) {
  return render(component, {wrapper: wrapperAllTheProviders(), ...options});
}

export function renderScreen<T = unknown>(
  component: React.ReactElement<T>,
  options?: Omit<RenderOptions, 'wrapper'>,
) {
  return render(component, {wrapper: wrapperScreenProviders(), ...options});
}

function customRenderHook<Result, Props>(
  renderCallback: (props: Props) => Result,
  options?: Omit<RenderHookOptions<Props>, 'wrapper'>,
) {
  return renderHook<Result, Props>(renderCallback, {
    wrapper: wrapperAllTheProviders(),
    ...options,
  });
}

export * from '@testing-library/react-native';
export {customRender as render};
export {customRenderHook as renderHook};
