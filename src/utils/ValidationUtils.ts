import {DateUtils} from 'src/utils/DateUtils';
import {useI18n} from 'vue-i18n';

export class ValidationUtils {
  private _i18n = useI18n();
  private _dateUtils = new DateUtils();

  /**
   * Check if the passed date string is a valid date.
   * @param dateStr This date string will be validated.
   */
  isDateStringValid(dateStr: string): true | string {
    const dateVal = this._dateUtils.stringToDate(dateStr);
    if(dateVal)
      return true;
    else
      return this._i18n.t('validation-text.enter-valid-date')
  }

  /**
   * Check if the passed start date takes place before the passed end date.
   * @param startDateStr This parameter represents the start date as a string.
   * @param endDateStr This parameter represents the start date as a string.
   */
  isStartBeforeEnd(startDateStr: string, endDateStr: string) {
    const startDate = this._dateUtils.stringToDate(startDateStr);
    const endDate = this._dateUtils.stringToDate(endDateStr);

    return startDate.getTime() <= endDate.getTime() ? true : this._i18n.t('validation-text.start-must-be-before-end');
  }

  /**
   * Check if the passed end date takes place after the passed start date.
   * @param endDateStr This parameter represents the start date as a string.
   * @param startDateStr This parameter represents the start date as a string.
   */
  isEndAfterStart(endDateStr: string, startDateStr: string) {
    const endDate = this._dateUtils.stringToDate(endDateStr);
    const startDate = this._dateUtils.stringToDate(startDateStr);

    return endDate.getTime() >= startDate.getTime() ? true : this._i18n.t('validation-text.end-must-be-after-start');
  }

  /**
   * Check if the passed time string is a valid time.
   * @param timeStr This time string will be validated.
   */
  isTimeStringValid(timeStr: string): boolean {
    return /^([0-1]?\d|2[0-3]):[0-5]\d$/.test(timeStr);
  }
}
