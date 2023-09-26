import {useQuasar} from 'quasar';
import {Locale} from 'src/enums/Locale';

export class LanguageUtils {
  // Initialize private properties.
  private _q = useQuasar();

  /**
   * Load a quasar language package depending on the passed locale.
   * @param languageAbbreviation This language abbreviation specifies the language pack that will be imported.
   * @private
   */
  async loadQuasarLanguagePack(languageAbbreviation: Locale) {
    // Import language pack and update quasar.
    await import(`../../node_modules/quasar/lang/${languageAbbreviation.toString()}.mjs`)
      .then(({default: languagePack}) => {
        this._q.lang.set(languagePack);
      });
  }
}
