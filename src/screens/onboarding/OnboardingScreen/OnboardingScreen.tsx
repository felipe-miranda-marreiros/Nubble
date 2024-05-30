import {useRef, useState} from 'react';
import {FlatList, ListRenderItemInfo} from 'react-native';

import {useSettingsService} from '@services';

import {Box} from '@components';

import {OnboardingPage} from '../components/OnboardingPage';
import {OnboardingPageItem, onboardingPages} from '../onboardingData';

export function OnboardingScreen() {
  const [pageIndex, setPageIndex] = useState(0);
  const {finishOnboarding} = useSettingsService();

  const flatListRef = useRef<FlatList<OnboardingPageItem>>(null);

  function onPressNext() {
    const isLastPage = pageIndex === onboardingPages.length - 1;
    if (isLastPage) {
      onFinishOnboarding();
    } else {
      const nextIndex = pageIndex + 1;
      flatListRef.current?.scrollToIndex({index: nextIndex, animated: true});
      setPageIndex(nextIndex);
    }
  }

  function onFinishOnboarding() {
    finishOnboarding();
  }

  function onPressSkip() {
    finishOnboarding();
  }

  function renderItem({item}: ListRenderItemInfo<OnboardingPageItem>) {
    return (
      <OnboardingPage
        pagaItem={item}
        onPressNext={onPressNext}
        onPressSkip={onPressSkip}
      />
    );
  }

  return (
    <Box flex={1} backgroundColor="background">
      <FlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        ref={flatListRef}
        scrollEnabled={false}
        horizontal
        renderItem={renderItem}
        data={onboardingPages}
      />
    </Box>
  );
}
