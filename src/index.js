import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App, { AppContainer } from 'react-hot-loader';
import RouterMap from '~/router/router';
import configureStore from './store/configureStore';
const store = configureStore();

const render = () => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <RouterMap />
      </Provider>
    </AppContainer>,
    document.getElementById('app')
  )
}

render();

if (module.hot) {
  module.hot.accept('~/router/router', () => render())
}