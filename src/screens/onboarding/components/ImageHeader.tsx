import {Dimensions, Image} from 'react-native';

import {useAppColor} from '@services';

import {OnboardingPageItem} from '../onboardingData';

const SCREEN_WIDTH = Dimensions.get('screen').width;

interface ImageHeaderProps {
  image: OnboardingPageItem['image'];
}

export function ImageHeader({image}: ImageHeaderProps) {
  const appColor = useAppColor();

  const source = appColor === 'dark' ? image.dark : image.light;

  return <Image source={source} style={{width: SCREEN_WIDTH, height: '90%'}} />;
}
