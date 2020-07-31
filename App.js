import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';

import { store } from './store/store';
import AppNavigator from './navigation/AppNavigator';

const App = () => {

  return (
    <Provider {...{ store }}>
      <StatusBar hidden={true} />
      <AppNavigator />
    </Provider>
  );
};

export default App;
