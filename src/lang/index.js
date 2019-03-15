/**
 * App Language Provider
 * Add more locales here
 */
import { addLocaleData } from 'react-intl';
import enLang from './entries/en-US';
import frLang from './entries/fr_FR';
import arLang from './entries/ar_SA';

const AppLocale = {
    en: enLang,
    fr: frLang,
    ar: arLang,
   
};

addLocaleData(AppLocale.en.data);
addLocaleData(AppLocale.fr.data);
addLocaleData(AppLocale.ar.data);


export default AppLocale;
