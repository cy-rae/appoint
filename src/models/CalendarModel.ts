import {AppointmentModel} from 'src/models/AppointmentModel';

export class CalendarModel {
  id: number;
  name: string;
  description: string;
  category: string;
  appointments: AppointmentModel[];

  constructor() {
    this.id = 0;
    this.name = '';
    this.description = '';
    this.category = '';
    this.appointments = [];
  }
}
