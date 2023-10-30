import {CalendarModel} from 'src/models/CalendarModel';
import {AppointmentModel} from 'src/models/AppointmentModel';
import {Priority} from 'src/enums/Priority';
import {useDataStore} from 'stores/DataStore';

export class TestDataUtils {
  private _dataStore = useDataStore();

  initializeStoreWithTestData() {
    const birthdayCalendar = this.createBirthdayCalendar();
    const partyCalendar = this.createPartyCalendar();

    this._dataStore.calendars = [birthdayCalendar, partyCalendar];
  }

  // region BIRTHDAY CALENDAR
  /**
   * Create a test birthday calendar with appointments.
   * @private
   */
  private createBirthdayCalendar(): CalendarModel {
    const birthdayAppointments = this.createBirthdayAppointments();
    return new CalendarModel('Geburtstagskalender', 'In diesem Kalender werden alle ' +
      'Geburtstage eingetragen.', '#ef908d', true, birthdayAppointments);
  }

  /**
   * Create test appointments for the birthday calendar.
   * @private
   */
  private createBirthdayAppointments(): AppointmentModel[] {
    const appointment1 = new AppointmentModel('Coralines Geburtstag', 'Coraline wünscht sich ein Armband.',
      '23.10.2023 00:00', '23.10.2023 23:59', Priority.HIGH);
    const appointment2 = new AppointmentModel('Damianos Geburtstag', 'Damiano wünscht sich eine neue Handyhülle.',
      '30.10.2023 00:00', '30.10.2023 23:59', Priority.HIGH);
    const appointment3 = new AppointmentModel('Marlenas Geburtstag', 'Marlena wünscht sich eine Schuhe.',
      '03.11.2023 00:00', '03.11.2023 23:59', Priority.HIGH);
    return [appointment1, appointment2, appointment3];
  }
  // endregion

  // region CELEBRATION CALENDAR
  /**
   * Create a test party calendar with appointments.
   * @private
   */
  private createPartyCalendar(): CalendarModel {
    const partyAppointments = this.createPartyAppointments();
    return new CalendarModel('Party-Kalender', 'In diesem Kalender werden alle ' +
      'Partys eingetragen.', '#99ccff', true, partyAppointments);
  }

  /**
   * Create test appointments for the party calendar.
   * @private
   */
  private createPartyAppointments() {
    const appointment1 = new AppointmentModel('Coralines Geburtstagsfeier', 'Coraline feier im Club.',
      '28.10.2023 22:00', '29.10.2023 04:00', Priority.HIGH);
    const appointment2 = new AppointmentModel('Halloweenparty', 'Ich darf mein Halloweenkostüm nicht vergessen!',
      '31.10.2023 20:00', '01.11.2023 03:00', Priority.VERY_HIGH);
    const appointment3 = new AppointmentModel('Opas Geburtstag', 'Opa lädt uns alle ins Steakhaus ein.',
      '10.11.2023 17:30', '10.11.2023 21:00', Priority.HIGH);
    return [appointment1, appointment2, appointment3];
  }
  // endregion
}
