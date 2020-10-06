import React from 'react';
import { enableScreens } from 'react-native-screens';
import AppNavigation from './navigator/AppNavigator';
import {Provider} from 'react-redux';               
import generateStore from './redux/store';        

enableScreens();

let store = generateStore();    

export default function App() {
  
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
};
