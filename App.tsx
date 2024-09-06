import React from 'react';
import {Provider} from 'react-redux';
import GameScreen from './src/screens/GameScreen';
import {store} from './src/store/store';

const App = () => {
  return (
    <Provider store={store}>
      <GameScreen />
    </Provider>
  );
};

export default App;
