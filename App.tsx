import './gesture-handler';
import { View } from 'react-native';
import React from 'react';
import { Provider } from 'react-redux';
import Router from './src/Router';
import store from './src/Store/store'

const App: React.FC = () => {
  return (
    <>
      <Provider store={store}>
        <Router />
      </Provider>
    </>
  )
}

export default App

