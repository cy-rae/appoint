import {AppointmentModel} from 'src/models/AppointmentModel';

export class CalendarModel {
  private _id: number;
  private _name: string;
  private _description: string;
  private _color: string;
  private _appointments: AppointmentModel[];

  constructor() {
    this._id = 0;
    this._name = '';
    this._description = '';
    this._color = '';
    this._appointments = [];
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get color(): string {
    return this._color;
  }

  set color(value: string) {
    this._color = value;
  }

  get appointments(): AppointmentModel[] {
    return this._appointments;
  }

  set appointments(value: AppointmentModel[]) {
    this._appointments = value;
  }
}
