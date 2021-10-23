import {Platform, Dimensions} from 'react-native';

export const isIOSPlatform = Platform.OS === 'ios';

const dimensions = Dimensions.get('screen');

export const deviceDimensions = {
  width: dimensions.width,
  height: dimensions.height,
} as const;
