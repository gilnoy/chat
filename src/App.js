import React from 'react';
import { Provider } from 'react-redux';
import { store } from './state/';
import Page from './Components/Page';


function App() {
  return (
    <Provider store={store}>
        <Page/>
    </Provider>
  );
}


export default App;
