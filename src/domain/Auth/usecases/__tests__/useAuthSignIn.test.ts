import {waitFor, renderHook} from 'test-utils';

import {authService} from '../../authService';
import {useAuthSignIn} from '../useAuthSignIn';

import {mockedAuthCredentials} from './mockedData/mocks';

const mockedSaveCredentials = jest.fn();

jest.mock('@services', () => {
  const originalModule = jest.requireActual('@services');
  return {
    ...originalModule,
    useAuthCredentials: () => ({
      saveCredentials: mockedSaveCredentials,
    }),
  };
});

describe('useAuthSignIn', () => {
  it('saves credentials if the sign-in is successful', async () => {
    jest
      .spyOn(authService, 'signIn')
      .mockResolvedValueOnce(mockedAuthCredentials);

    const mockedOnSuccess = jest.fn();

    const {result} = renderHook(() =>
      useAuthSignIn({onSuccess: mockedOnSuccess}),
    );

    result.current.signIn({email: 'lucas@coffstack.com', password: '123'});

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(mockedOnSuccess).toHaveBeenCalledWith(mockedAuthCredentials);
    expect(mockedSaveCredentials).toHaveBeenCalledWith(mockedAuthCredentials);
  });
  it('calls onError function with a message if sign-in fails', async () => {
    jest
      .spyOn(authService, 'signIn')
      .mockRejectedValue(new Error('invalid user'));

    const mockedOnError = jest.fn();

    const {result} = renderHook(() => useAuthSignIn({onError: mockedOnError}));

    result.current.signIn({email: 'lucas@coffstack.com', password: '123'});

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(mockedOnError).toHaveBeenCalledWith('invalid user');
  });
});
