import React, { useEffect } from 'react';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider as StoreProvider, useDispatch } from 'react-redux';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';

import filter from 'leo-profanity';

import App from './components/App.jsx';

import { actions as chatActions } from './slices/messagesSlice';
import { actions as channelsActions } from './slices/channelsSlice';
import store from './slices/store.js';
import resources from './locales/index.js';

const SocketSubscribe = ({ socket, children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on('newMessage', (message) => {
      dispatch(chatActions.addMessage(message));
    });
    socket.on('newChannel', (channel) => {
      dispatch(channelsActions.addChannel(channel));
    });
    socket.on('renameChannel', (channel) => {
      dispatch(channelsActions.renameChannel({
        id: channel.id,
        changes: { name: channel.name },
      }));
    });
    socket.on('removeChannel', ({ id }) => {
      dispatch(channelsActions.removeChannel(id));
    });
  }, [socket, dispatch]);

  return children;
};

export default async (socket) => {
  const rollbarConfig = {
    accessToken: process.env.REACT_APP_ROLLBAR_ACCESS_TOKEN,
    captureUncaught: true,
    captureUnhandledRejections: true,
    payload: {
      environment: 'production',
    },
  };

  const i18n = i18next.createInstance();

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
    });

  filter.add(filter.getDictionary('en'));
  filter.add(filter.getDictionary('ru'));

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <I18nextProvider i18n={i18n}>
          <StoreProvider store={store}>
            <SocketSubscribe socket={socket}>
              <App socket={socket}/>
            </SocketSubscribe>
          </StoreProvider>
        </I18nextProvider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};
