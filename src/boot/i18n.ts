import { boot } from 'quasar/wrappers';
import { createI18n } from 'vue-i18n';

import messages from 'src/i18n';
import {ELanguage} from 'src/enums/ELanguage';

export type MessageLanguages = keyof typeof messages;
// Type-define 'en-US' as the master schema for the resource
export type MessageSchema = typeof messages['de'];

// See https://vue-i18n.intlify.dev/guide/advanced/typescript.html#global-resource-schema-type-definition
/* eslint-disable @typescript-eslint/no-empty-interface */
declare module 'vue-i18n' {
  // define the locale messages schema
  export interface DefineLocaleMessage extends MessageSchema {}

  // define the datetime format schema
  export interface DefineDateTimeFormat {}

  // define the number format schema
  export interface DefineNumberFormat {}
}
/* eslint-enable @typescript-eslint/no-empty-interface */

export default boot(({ app }) => {
  // Set default as english language pack.
  let localeLang = ELanguage.EN;

  // If navigator language is german, the locale language pack will be german.
  if (navigator.language.includes('de')) {
    localeLang = ELanguage.DE;
  }

  const i18n = createI18n({
    locale: localeLang.toString(),
    legacy: false,
    messages
  });

  // Set i18n instance on app
  app.use(i18n);
});
