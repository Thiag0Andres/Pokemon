import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar, SafeAreaView, ViewStyle, StyleProp} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ThemeProvider} from 'styled-components/native';
import {Theme} from './styles';
import Routes from './routes';

// Keep warnings only in dev. [AR]
// eslint-disable-next-line no-console
console.disableYellowBox = !__DEV__;

const styleSafeAreaView: StyleProp<ViewStyle> = {
  flex: 1,
};

const src: React.FC = () => {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <SafeAreaView style={styleSafeAreaView}>
          <StatusBar
            barStyle="dark-content"
            backgroundColor={Theme.colors.white}
          />
          <ThemeProvider theme={Theme}>
            <Routes />
          </ThemeProvider>
        </SafeAreaView>
      </SafeAreaProvider>
    </NavigationContainer>
  );
};

export default src;
