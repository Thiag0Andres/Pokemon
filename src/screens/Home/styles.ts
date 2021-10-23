import {mvs} from 'react-native-size-matters';
import styled from 'styled-components/native';

interface EnhancedListFooterProps {
  loading: boolean;
}

export const Container = styled.View`
  flex: 1;
  padding: ${mvs(8)}px;
`;

export const ContentCard = styled.View`
  width: ${mvs(200)}px;
  height: ${mvs(200)}px;
`;

export const EnhancedListFooter = styled.View<EnhancedListFooterProps>`
  padding-top: ${({loading}) => (loading ? 24 : 0)}px;
`;
