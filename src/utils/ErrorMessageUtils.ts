import {useI18n} from 'vue-i18n';
import {useQuasar} from 'quasar';

export class ErrorMessageUtils {
  private _q = useQuasar();
  private _i18n = useI18n();

  /**
   * Notify user that an error occurred at the conversion of data.
   */
  notifyConversionError() {
    this._q.notify({
      type: 'negative',
      position: 'top',
      message: this._i18n.t('error-message.title'),
      caption: this._i18n.t('error-message.error-at-conversion')
    });
  }
}
