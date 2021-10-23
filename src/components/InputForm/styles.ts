import {mvs, ms, s} from 'react-native-size-matters';
import styled from 'styled-components/native';

interface InputProps {
  error?: boolean;
}

export const Container = styled.View`
  flex-direction: column;
  width: 100%;
`;

export const InputContainer = styled.View<InputProps>`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border: 1px solid
    ${({theme, error}) => (error ? theme.colors.red : theme.colors.grey)};
  background: rgba(255, 255, 255, 0.8);
  max-height: ${ms(110)}px;
`;

export const Input = styled.TextInput.attrs(({theme}) => ({
  placeholderTextColor: theme.colors.grey,
}))`
  flex: 1;
  color: ${({theme}) => theme.colors.dark_grey};
  font-size: ${ms(14)}px;
  font-weight: 300;
  padding: ${s(12)}px;
  font-family: SegoeUI-Semibold;
  font-style: normal;
`;

export const TouchableIconContainer = styled.TouchableOpacity`
  padding-right: ${mvs(14)}px;
  justify-content: center;
  align-items: center;
`;

export const ErrorDescription = styled.Text`
  font-size: ${ms(13)}px;
  margin-top: ${mvs(4)}px;
  color: ${({theme}) => theme.colors.red};
`;

export const Icon = styled.Image``;
