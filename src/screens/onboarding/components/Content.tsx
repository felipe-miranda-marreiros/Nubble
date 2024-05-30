import {Box, ProgressIndicator, Text} from '@components';

import {OnboardingPageItem} from '../onboardingData';

type ContentProps = Omit<OnboardingPageItem, 'image'>;

export function Content({subtitle, title, total, index}: ContentProps) {
  return (
    <Box>
      <ProgressIndicator mb="s24" total={total} currentIndex={index} />
      <Text preset="headingLarge">
        {title.map((text, idx) => {
          return (
            <Text
              preset="headingLarge"
              color={text.highlight ? 'carrotSecondary' : 'backgroundContrast'}
              key={idx}>
              {text.text}
            </Text>
          );
        })}
      </Text>
      <Text mt="s16" preset="paragraphLarge">
        {subtitle}
      </Text>
    </Box>
  );
}
