import {ThemeColors} from '@theme';

import {TouchableOpacityBoxProps} from '../Box/Box';
import {TextProps} from '../Text/Text';

export type ButtonPreset = 'primary' | 'outline' | 'ghost' | 'gray';

interface ButtonUI {
  container: TouchableOpacityBoxProps;
  content: {color: ThemeColors; textProps?: TextProps};
}

export const buttonPresets: Record<
  ButtonPreset,
  {
    default: ButtonUI;
    disabled: ButtonUI;
  }
> = {
  primary: {
    default: {
      container: {
        backgroundColor: 'primary',
      },
      content: {
        color: 'primaryContrast',
      },
    },
    disabled: {
      container: {
        backgroundColor: 'gray4',
      },
      content: {
        color: 'gray2',
      },
    },
  },
  outline: {
    default: {
      container: {
        borderWidth: 1,
        borderColor: 'primary',
      },
      content: {
        color: 'primary',
      },
    },
    disabled: {
      container: {
        borderWidth: 1,
        borderColor: 'gray4',
      },
      content: {
        color: 'gray2',
      },
    },
  },
  gray: {
    default: {
      container: {
        backgroundColor: 'buttonGrayContainer',
      },
      content: {color: 'buttonGrayContent'},
    },
    disabled: {
      container: {
        backgroundColor: 'gray4',
      },
      content: {color: 'gray2'},
    },
  },
  ghost: {
    default: {
      container: {
        backgroundColor: 'white70',
        height: 40,
      },
      content: {
        color: 'grayBlack',
        textProps: {
          preset: 'paragraphSmall',
          bold: false,
        },
      },
    },
    disabled: {
      container: {
        height: 40,
        backgroundColor: 'grayWhite',
      },
      content: {color: 'grayBlack'},
    },
  },
};
