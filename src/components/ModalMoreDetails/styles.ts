import {mvs, ms} from 'react-native-size-matters';
import styled from 'styled-components/native';

import {deviceDimensions} from '../../constants/device-info';

const closeIcon = require('../../assets/icons/close.png');

const MODAL_WIDTH = 0.95 * deviceDimensions.width;
const MODAL_HEIGHT = 0.8 * deviceDimensions.height;

export const ContentModal = styled.View`
  align-self: center;
  flex-direction: column;
  align-items: center;
  background: ${({theme}) => theme.colors.white};
  padding: ${mvs(24)}px;
  width: ${MODAL_WIDTH}px;
  max-height: ${MODAL_HEIGHT}px;
`;

export const HeaderModal = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  margin-bottom: ${mvs(16)}px;
`;

export const TitleModal = styled.Text`
  color: ${({theme}) => theme.colors.dark_grey};
  font-size: ${ms(24)}px;
  font-weight: 600;
  text-transform: uppercase;
`;

export const Text = styled.Text`
  color: ${({theme}) => theme.colors.dark_grey};
  font-size: ${ms(14)}px;
  font-weight: 400;
`;

export const TextBold = styled.Text`
  color: ${({theme}) => theme.colors.dark_grey};
  font-size: ${ms(15)}px;
  font-weight: bold;
  text-transform: capitalize;
`;

export const IconClose = styled.Image.attrs({
  source: closeIcon,
})``;

export const Button = styled.TouchableOpacity``;

export const Icon = styled.Image`
  width: 100%;
  height: ${ms(200)}px;
  resize-mode: contain;
`;

export const IconPokeBall = styled.Image`
  tint-color: ${({theme}) => theme.colors.dark_grey};
  width: ${ms(20)}px;
  height: ${ms(20)}px;
  resize-mode: contain;
  margin-top: ${mvs(3)}px;
  margin-right: ${mvs(5)}px;
`;

export const Row = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: ${mvs(10)}px;
`;

export const EmpetySpace = styled.View`
  width: ${mvs(10)}px;
`;
