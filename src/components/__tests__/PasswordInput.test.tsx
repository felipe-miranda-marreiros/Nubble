import {fireEvent, render, screen} from 'test-utils';

import {PasswordInput} from '../PasswordInput/PasswordInput';

describe('<PasswordInput />', () => {
  it('starts with hidden password', () => {
    const mockedOnChange = jest.fn();

    render(
      <PasswordInput
        label="Password"
        placeholder="password"
        value="12345"
        onChangeText={mockedOnChange}
      />,
    );

    const inputElement = screen.getByPlaceholderText(/password/);

    expect(inputElement.props.secureTextEntry).toBeTruthy();
  });

  test('when pressing the eye icon, it should show the password, and change to the eye off icon', () => {
    render(
      <PasswordInput label="Password" placeholder="password" value="12345" />,
    );

    const inputElement = screen.getByPlaceholderText(/password/);
    const iconElement = screen.getByTestId('eyeOn');

    fireEvent.press(iconElement);

    expect(iconElement.props.testID).toEqual('eyeOff');
    expect(inputElement.props.secureTextEntry).toBeFalsy();
  });
});
