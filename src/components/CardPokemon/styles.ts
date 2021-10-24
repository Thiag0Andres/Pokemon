import {mvs, ms} from 'react-native-size-matters';
import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  background-color: ${({theme}) => theme.colors.white};
  flex: 1;
  margin: ${mvs(8)}px;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1;
  padding: ${mvs(12)}px;
  border-radius: ${mvs(4)}px;
`;
export const ContainerTypes = styled.View`
  margin-top: ${mvs(10)}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

export const ContentType = styled.View`
  align-items: center;
  justify-content: center;
`;

export const Icon = styled.Image`
  height: ${mvs(100)}px;
  width: ${mvs(100)}px;
  resize-mode: contain;
`;

export const Title = styled.Text`
  font-size: ${ms(16)}px;
  color: ${({theme}) => theme.colors.blue_project};
  font-weight: 600;
  text-transform: capitalize;
  text-align: center;
`;
