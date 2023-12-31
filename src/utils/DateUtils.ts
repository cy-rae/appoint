import {useI18n} from 'vue-i18n';
import {date, useQuasar} from 'quasar';
import {ErrorMessageUtils} from 'src/utils/ErrorMessageUtils';
import {AppointmentModel} from 'src/models/AppointmentModel';

export class DateUtils {
  private _q = useQuasar();
  private _i18n = useI18n();
  private _errorMessageUtils = new ErrorMessageUtils();

  DATE_FORMAT_SHORT = () => this._i18n.t('date.format.short');
  DATE_FORMAT_LONG = () => this._i18n.t('date.format.long');
  TIME_FORMAT = 'HH:mm';
  DATE_FORMAT_EVENT = 'YYYY/MM/DD';
  DATE_MASK = () => this._i18n.t('date.mask')
  DATE_FORMAT_WEEKDAY = 'dddd';
  DATE_FORMAT_SHORT_WITH_WEEKDAY = () => this._i18n.t('date.format.short.with-weekdays');

  /**
   * Convert a date/time string to a date/time value.
   * @param {} dateValueString Date/Time as string
   * @param {*} dateTimeFormat Format of date/time
   * @returns a date/time object
   */
  stringToDate(dateValueString: string | undefined | null, dateTimeFormat: string): Date {
    return date.extractDate(dateValueString || '', dateTimeFormat);
  }

  /**
   * Adjust the format of the passed string or date. The return value will be a string.
   * @param dateValue This parameter specifies the data. It can be a string or a date object.
   * @param dateformat This parameter specifies the target date format.
   */
  adjustFormat(dateValue: string | number | Date | undefined | null, dateformat = this.DATE_FORMAT_SHORT()): string | null {
    if(typeof dateValue === 'string')
      dateValue = this.stringToDate(dateValue, this.DATE_FORMAT_LONG());

    if (dateValue && dateformat) {
      return date.formatDate(dateValue, dateformat);
    }
    return null;
  }

  /**
   * Get the start of the passed date by setting all time values to zero.
   * @param dateVal This parameter specifies the date value that will be edited.
   */
  getStartOfDay(dateVal: Date | string) {
    if(typeof dateVal === 'string')
      dateVal = this.stringToDate(dateVal, this.DATE_FORMAT_LONG());

    return date.adjustDate(dateVal, {
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0
    });
  }

  /**
   * Get the end of the passed date by setting all time values to their max.
   * @param dateVal This parameter specifies the date value that will be edited.
   */
  getEndOfDay(dateVal: Date | string) {
    if(typeof dateVal === 'string')
      dateVal = this.stringToDate(dateVal, this.DATE_FORMAT_LONG());

    return date.adjustDate(dateVal, {
      hours: 23,
      minutes: 59,
      seconds: 59,
      milliseconds: 999
    });
  }

  /**
   * Get all event date strings of the passed time span.
   * @param startDate This parameter specifies the start of the time span.
   * @param endDate This parameter specifies the end of the time span.
   */
  getEventsOfTimeSpan(startDate: Date, endDate: Date): string[] {
    // Initialize array to collect event date strings.
    const events: string[] = [];

    // Get the time span in days.
    const timeSpanInDays = endDate.getDate() - startDate.getDate();

    // Compute each day in the time span and add it to the list as event date string.
    for (let i = 0; i <= timeSpanInDays; i++) {
      // Compute date.
      const date = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000);

      // Format to an event date string and add it to list.
      const event = this.adjustFormat(date, this.DATE_FORMAT_EVENT);
      if (!event) {
        this._errorMessageUtils.notifyConversionError();
        return [];
      }
      events.push(event);
    }

    return events;
  }

  /**
   * Set the time of the passed date parameter to the passed time parameter.
   * @param dateVal This parameter represents the date whose time will be adjusted.
   * @param timeVal This parameter represents the new time.
   */
  adjustTime(dateVal: Date, timeVal: Date) {
    return date.adjustDate(dateVal, {
      hours: timeVal.getHours(),
      minutes: timeVal.getMinutes(),
      seconds: timeVal.getSeconds(),
      milliseconds: timeVal.getMilliseconds(),
    });
  }

  /**
   * Compute the event dates of the passed appointments.
   * @param appointments
   */
  computeEvents(appointments: AppointmentModel[]) {
    const events: string[] = [];

    appointments.forEach((appointment: AppointmentModel) => {
      const start = this.stringToDate(appointment.startDate, this.DATE_FORMAT_LONG());
      const end = this.stringToDate(appointment.endDate, this.DATE_FORMAT_LONG());
      const appointmentEvents: string[] = this.getEventsOfTimeSpan(start, end);
      events.push(...appointmentEvents);
    });

    return events;
  }
}
