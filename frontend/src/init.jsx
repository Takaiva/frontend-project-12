import React from 'react';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next} from "react-i18next";

import { Provider as StoreProvider } from 'react-redux';
import store from './slices/store.js';

import App from './components/App.jsx';
import resources from './locales/index.js';

import filter from 'leo-profanity';

export default async () => {
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
        <I18nextProvider i18n={i18n}>
            <StoreProvider store={store}>
                <App />
            </StoreProvider>
        </I18nextProvider>
    );
};
