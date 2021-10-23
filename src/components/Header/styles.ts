import {mvs, ms} from 'react-native-size-matters';
import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: ${({theme}) => theme.colors.white};
  width: 100%;
  max-height: ${mvs(60)}px;
  flex-direction: row;
`;

export const ContainerLogo = styled.View`
  width: 100%;

  justify-content: center;
  padding-horizontal: ${mvs(20)}px;
`;

export const Logo = styled.Image`
  max-width: ${mvs(120)}px;
  max-height: ${mvs(60)}px;
  object-fit: contain;
`;

export const ContainerCollapsed = styled.View`
  background-color: ${({theme}) => theme.colors.light_grey};
  padding: ${mvs(15)}px;
`;

export const Row = styled.View`
  flex-direction: row;
`;

export const Title = styled.Text`
  font-size: ${ms(16)}px;
  margin-left: ${mvs(9)}px;
`;
