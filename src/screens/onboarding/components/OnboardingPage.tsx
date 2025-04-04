import {Dimensions} from 'react-native';

import {Box} from '@components';

import {OnboardingPageItem} from '../onboardingData';

import {BottomMenu} from './BottomMenu';
import {Content} from './Content';
import {ImageHeader} from './ImageHeader';

export type OnboardingPageProps = {
  pagaItem: OnboardingPageItem;
  onPressNext: () => void;
  onPressSkip: () => void;
};

const SCREEN_WIDTH = Dimensions.get('screen').width;

export function OnboardingPage({
  pagaItem,
  onPressNext,
  onPressSkip,
}: OnboardingPageProps) {
  return (
    <Box flex={1} backgroundColor="background" width={SCREEN_WIDTH}>
      <Box flex={4}>
        <ImageHeader image={pagaItem.image} />
      </Box>
      <Box flex={5} paddingHorizontal="s24">
        <Content {...pagaItem} />
      </Box>
      <Box flex={1} paddingHorizontal="s24">
        <BottomMenu
          onPressNext={onPressNext}
          onPressSkip={onPressSkip}
          isLast={pagaItem.isLast}
        />
      </Box>
    </Box>
  );
}
