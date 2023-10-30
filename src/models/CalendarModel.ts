import {AppointmentModel} from 'src/models/AppointmentModel';

export class CalendarModel {
  private _name: string;
  private _description: string;
  private _color: string;
  private _favorite: boolean;
  private _appointments: AppointmentModel[];

  constructor(name?: string, description?: string, color?: string, favorite?: boolean,
              appointments?: AppointmentModel[]) {
    this._name = name || '';
    this._description = description || '';
    this._color = color || '';
    this._favorite = favorite || false;
    this._appointments = appointments || [];
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

  get favorite(): boolean {
    return this._favorite;
  }

  set favorite(value: boolean) {
    this._favorite = value;
  }

  get appointments(): AppointmentModel[] {
    return this._appointments;
  }

  set appointments(value: AppointmentModel[]) {
    this._appointments = value;
  }
}
