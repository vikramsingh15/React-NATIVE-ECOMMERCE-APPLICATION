import React, { useState } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import Reducers from './store/reducers';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import reduxThunk from 'redux-thunk';
import NavigationContainer from './navigation/NavigationContainer';

import { composeWithDevTools } from 'redux-devtools-extension';
const store = createStore(
  Reducers,
  composeWithDevTools(applyMiddleware(reduxThunk))
);
//load fonts
const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
      />
    );
  }
  return (
    <Provider store={store}>
      <NavigationContainer />
    </Provider>
  );
}
