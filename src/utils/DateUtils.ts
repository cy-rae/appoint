import {useI18n} from 'vue-i18n';
import {date} from 'quasar';

export class DateUtils {
  private _i18n = useI18n();

  DATE_FORMAT_SHORT = () => this._i18n.t('date.format.short');
  DATE_FORMAT_EVENT = 'YYYY/MM/DD';
  DATE_FORMAT_WEEKDAY = 'dddd';
  DATE_FORMAT_SHORT_WITH_WEEKDAY = () => this._i18n.t('date.format.short.with-weekdays');

  /**
   * Convert a date/time string to a date/time value.
   * @param {} dateValueString Date/Time as string
   * @param {*} dateTimeFormat Format of date/time
   * @returns a date/time object
   */
  stringToDate(dateValueString: string | undefined | null, dateTimeFormat = this.DATE_FORMAT_SHORT()): Date {
    return date.extractDate(dateValueString || '', dateTimeFormat);
  }

  /**
   * Adjust the format of the passed string or date. The return value will be a string.
   * @param dateValue This parameter specifies the data. It can be a string or a date object.
   * @param dateformat This parameter specifies the target date format.
   */
  adjustFormat(dateValue: string | number | Date | undefined | null, dateformat = this.DATE_FORMAT_SHORT()): string | null {
    if (dateValue && dateformat) {
      return date.formatDate(dateValue, dateformat);
    }
    return null;
  }
}
