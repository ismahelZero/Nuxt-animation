import enLocale from './locales/en'
import arLocale from './locales/ar'

export default defineI18nConfig(() => ({
    legacy: false,
    locale: 'en',
    messages: {
        en: enLocale,
        ar: arLocale
    }
}))