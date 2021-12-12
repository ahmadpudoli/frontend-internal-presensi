// ** React Imports
import { useState, useEffect, createContext } from 'react';

// ** Intl Provider Import
import { IntlProvider } from 'react-intl';

// ** Core Language Data
import messagesEn from '@assets/data/locales/en.json';
import messagesId from '@assets/data/locales/id.json';

// ** User Language Data
import userMessagesEn from '@src/assets/data/locales/en.json';
import userMessagesId from '@src/assets/data/locales/id.json';

// ** Menu msg obj
const menuMessages = {
    en: { ...messagesEn, ...userMessagesEn },
    id: { ...messagesId, ...userMessagesId }
};

// ** Create Context
const Context = createContext();

const IntlProviderWrapper = ({ children }) => {
    // ** States
    const [locale, setLocale] = useState('id');
    const [messages, setMessages] = useState(menuMessages['id']);

    // ** Switches Language
    const switchLanguage = (lang) => {
        setLocale(lang);
        setMessages(menuMessages[lang]);
        localStorage.setItem('lang', lang);
    };

    useEffect(() => {
        const lang_exist = localStorage.getItem('lang') ?? 'id';
        setLocale(lang_exist);
        setMessages(menuMessages[lang_exist]);
    }, []);

    return (
        <Context.Provider value={{ locale, switchLanguage }}>
            <IntlProvider key={locale} locale={locale} messages={messages} defaultLocale="id">
                {children}
            </IntlProvider>
        </Context.Provider>
    );
};

export { IntlProviderWrapper, Context as IntlContext };
