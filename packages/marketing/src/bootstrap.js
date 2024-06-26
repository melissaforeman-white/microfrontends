import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// createBrowserHistory allows us to create a browser history object
import { createMemoryHistory, createBrowserHistory } from 'history';

// Mount function to start up the app
const mount = (el, { onNavigate, defaultHistory, initialPath }) => {
  // if we provided a defaultHistory go ahead and use it or else use createMemoryHistory
  const history = defaultHistory || createMemoryHistory({
    initialEntries: [initialPath]
  });
  // whenver url changes, call on navigate function
  if (onNavigate) {
    history.listen(onNavigate);
  }
  // passes history as a prop down to our App component
  ReactDOM.render(<App history={history}/>, el);
  // create function for container to update or change marketing app
  return {
    onParentNavigate({ pathname: nextPathname }) {
      const { pathname } = history.location;
      if (pathname !== nextPathname) {
        history.push(nextPathname);
      }
    }
  }
};

// If we are in development and in isolation,
// call mount immediately
if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#marketing-dev-root');

  if (devRoot) {
    mount(devRoot, { defaultHistory: createBrowserHistory() });
  }
}

// We are running through container
// and we should export the mount function
export { mount };
