import {Animated} from 'react-native';
import {mvs} from 'react-native-size-matters';
import styled from 'styled-components/native';

interface Props {
  style?: any;
}

interface ButtonProps {
  hiddenPaddingButton: boolean;
}

export const Container = styled.View`
  width: 100%;
`;

export const WrapperHeader = styled.View`
  background-color: ${({theme}) => theme.colors.white};
`;

export const ContentCollapse = styled(Animated.View)<Props>``;

export const Button = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
`;

export const ToggleButton = styled(Button)<ButtonProps>`
  ${({hiddenPaddingButton}) =>
    !hiddenPaddingButton && `padding-horizontal: ${mvs(15)}px`};
  align-items: center;
  justify-content: center;
`;

export const ContainerHeaderButton = styled.View`
  flex-direction: row;
`;

export const Icon = styled.Image``;

export const ContainerHeader = styled.View`
  flex: 1;
`;
