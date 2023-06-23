import {
  TouchableOpacity,
  TouchableOpacityProps as RNTouchableOpacityProps,
} from 'react-native';

import {
  backgroundColor,
  border,
  createBox,
  createRestyleComponent,
  layout,
  spacing,
  BackgroundColorProps,
  SpacingProps,
  LayoutProps,
  BorderProps,
  spacingShorthand,
  SpacingShorthandProps,
} from '@shopify/restyle';

import {Theme} from '@theme';

export const Box = createBox<Theme>();
export type BoxProps = React.ComponentProps<typeof Box>;

export type TouchableOpacityBoxProps = BackgroundColorProps<Theme> &
  SpacingProps<Theme> &
  BorderProps<Theme> &
  LayoutProps<Theme> &
  SpacingShorthandProps<Theme> &
  RNTouchableOpacityProps;

export const TouchableOpacityBox = createRestyleComponent<
  TouchableOpacityBoxProps,
  Theme
>(
  [backgroundColor, spacing, spacingShorthand, layout, border],
  TouchableOpacity,
);
