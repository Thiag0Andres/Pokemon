import {mvs, ms} from 'react-native-size-matters';
import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: ${({theme}) => theme.colors.white};
  width: 100%;
  min-height: ${mvs(58)}px;
  flex-direction: row;
`;

export const Icon = styled.Image``;

export const ContainerLogo = styled.View`
  background-color: ${({theme}) => theme.colors.purple};
  align-items: center;
  justify-content: center;
  padding-horizontal: ${mvs(15)}px;
`;

export const Logo = styled.Image``;

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
