import {Box, BoxProps} from '../Box/Box';

interface ProgressIndicatorProps extends BoxProps {
  total: number;
  currentIndex: number;
}

export function ProgressIndicator({
  currentIndex,
  total,
  ...boxProps
}: ProgressIndicatorProps) {
  return (
    <Box flexDirection="row" gap="s12" alignItems="center" {...boxProps}>
      {Array.from({length: total}).map((_, idx) => {
        return (
          <Box
            key={idx}
            width={idx === currentIndex ? 14 : 8}
            height={idx === currentIndex ? 14 : 8}
            borderRadius="s12"
            backgroundColor={idx === currentIndex ? 'carrotSecondary' : 'gray2'}
          />
        );
      })}
    </Box>
  );
}
