import {StyleSheet} from 'react-native';

import {ReactTestInstance} from 'react-test-renderer';
import {render, fireEvent, screen} from 'test-utils';

import {theme} from '@theme';

import {Button, ButtonProps} from '../Button/Button';

function renderComponent(props?: Partial<ButtonProps>) {
  render(<Button title="button title" {...props} />);

  const titleElement = screen.queryByText('button title', {exact: false});
  const loadingElement = screen.queryByTestId('activity-indicator');
  const buttonElement = screen.getByTestId('button');

  return {
    titleElement,
    loadingElement,
    buttonElement,
  };
}

describe('<Button />', () => {
  it('call the onPress function when is pressed', () => {
    const mockedOnPress = jest.fn();

    const {titleElement, loadingElement} = renderComponent({
      onPress: mockedOnPress,
    });

    fireEvent.press(titleElement as ReactTestInstance);

    expect(mockedOnPress).toHaveBeenCalled();
    expect(loadingElement).toBeFalsy();
  });
  it('doest not call onPress function when it is disabled and it is pressed', () => {
    const mockedOnPress = jest.fn();

    const {titleElement} = renderComponent({
      onPress: mockedOnPress,
      disabled: true,
    });

    fireEvent.press(titleElement as ReactTestInstance);

    expect(mockedOnPress).not.toHaveBeenCalled();
  });
  test('the title should be gray if button is disabled', () => {
    const {titleElement} = renderComponent({
      disabled: true,
    });

    const titleStyle = StyleSheet.flatten(titleElement?.props.style);

    expect(titleStyle.color).toEqual(theme.colors.gray2);
  });
  it('shows ActivityIndicator if isLoading is true', () => {
    const {loadingElement} = renderComponent({
      isLoading: true,
    });

    expect(loadingElement).toBeTruthy();
  });
  it('hides button title if isLoading is true', () => {
    const {titleElement} = renderComponent({
      isLoading: true,
    });

    expect(titleElement).toBeFalsy();
  });
  it('disables button if isLoading is true', () => {
    const mockedOnPress = jest.fn();

    const {buttonElement} = renderComponent({
      isLoading: true,
      onPress: mockedOnPress,
    });

    fireEvent.press(buttonElement);

    expect(mockedOnPress).not.toHaveBeenCalled();
  });
});
