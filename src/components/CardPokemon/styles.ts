import {mvs, ms} from 'react-native-size-matters';
import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  background-color: ${({theme}) => theme.colors.white};
  flex: 0.5;
  margin: ${mvs(8)}px;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1;
  padding: ${mvs(12)}px;
`;

export const Icon = styled.Image`
  height: ${mvs(100)}px;
  width: ${mvs(100)}px;
  resize-mode: contain;
`;

export const Title = styled.Text`
  font-size: ${ms(16)}px;
  color: ${({theme}) => theme.colors.purple};
  text-transform: capitalize;
  text-align: center;
`;
