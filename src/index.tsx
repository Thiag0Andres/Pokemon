import React from 'react';
import {StatusBar, SafeAreaView, ViewStyle, StyleProp} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ThemeProvider} from 'styled-components/native';
import {Theme} from './styles';
import Home from './screens/Home';

// Keep warnings only in dev. [AR]
// eslint-disable-next-line no-console
console.disableYellowBox = !__DEV__;

const styleSafeAreaView: StyleProp<ViewStyle> = {
  flex: 1,
};

const src: React.FC = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styleSafeAreaView}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={Theme.colors.white}
        />
        <ThemeProvider theme={Theme}>
          <Home />
        </ThemeProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default src;
