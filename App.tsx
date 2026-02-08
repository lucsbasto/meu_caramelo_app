import 'react-native-gesture-handler';

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { MapScreen } from './src/screens/MapScreen';

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <MapScreen />
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default App;
