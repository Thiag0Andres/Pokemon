import {mvs, ms} from 'react-native-size-matters';
import styled from 'styled-components/native';

interface ButtonFilterProps {
  isSelected?: boolean;
}

interface EnhancedListFooterProps {
  loading: boolean;
}

export const Container = styled.View`
  flex: 1;
  padding: ${mvs(8)}px;
  position: relative;
`;

export const ContentCard = styled.View`
  width: ${mvs(200)}px;
  height: ${mvs(200)}px;
`;

export const EnhancedListFooter = styled.View<EnhancedListFooterProps>`
  padding-top: ${({loading}) => (loading ? 24 : 0)}px;
`;

export const ContainerLocalHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-vertical: ${mvs(15)}px;
  padding-horizontal: ${mvs(15)}px;
`;

export const Button = styled.TouchableOpacity``;

export const TitleText = styled.Text`
  font-size: ${ms(14)}px;
  font-weight: 600;
`;

export const ContainerFilter = styled.View`
  padding-vertical: ${mvs(5)}px;
  padding-horizontal: ${mvs(8)}px;
`;

export const ContentFilter = styled.View`
  padding-horizontal: ${mvs(10)}px;
  background-color: ${({theme}) => theme.colors.white}; ;
`;

export const ButtonFilter = styled.TouchableOpacity<ButtonFilterProps>`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: ${mvs(8)}px ${mvs(12)}px;
  border-radius: ${mvs(10)}px;
  border-width: ${mvs(2)}px;
  margin-right: ${mvs(16)}px;
  border-color: ${({theme, isSelected}) =>
    isSelected ? theme.colors.white : theme.colors.blue_project};
  background-color: ${({theme, isSelected}) =>
    isSelected ? theme.colors.blue_project : theme.colors.transparent}; ;
`;

export const TextFilter = styled.Text<ButtonFilterProps>`
  font-size: ${ms(13)}px;
  font-weight: 600;
  color: ${({theme, isSelected}) =>
    isSelected ? theme.colors.white : theme.colors.blue_project};
`;

export const ScrollFilter = styled.ScrollView`
  border-top-width: ${mvs(2)}px;
  border-color: ${({theme}) => theme.colors.light_grey};
  padding-vertical: ${mvs(16)}px;
`;

export const ContainerBottomLeftIcon = styled.TouchableOpacity`
  width: ${mvs(45)}px;
  height: ${mvs(45)}px;
  justify-content: center;
  align-items: center;
  border-radius: ${mvs(50)}px;
  background-color: ${({theme}) => theme.colors.red};
  position: absolute;
  bottom: ${mvs(20)}px;
  left: ${mvs(20)}px;
`;

export const ContainerBottomRightIcon = styled.TouchableOpacity`
  width: ${mvs(45)}px;
  height: ${mvs(45)}px;
  justify-content: center;
  align-items: center;
  border-radius: ${mvs(50)}px;
  background-color: ${({theme}) => theme.colors.blue_project};
  position: absolute;
  bottom: ${mvs(20)}px;
  right: ${mvs(20)}px;
`;

export const IconArrowUp = styled.Image`
  height: ${mvs(20)}px;
  width: ${mvs(20)}px;
  margin-bottom: ${mvs(5)}px;
  tint-color: ${({theme}) => theme.colors.white};
`;

export const IconCleanFilters = styled.Image`
  width: ${mvs(20)}px;
  height: ${mvs(20)}px;
  margin-top: ${mvs(3)}px;
  tint-color: ${({theme}) => theme.colors.white};
`;
