import {Priority} from 'src/enums/Priority';

export class AppointmentModel {
  private _id: number;
  private _title: string;
  private _description: string;
  private _startDate: Date;
  private _endDate: Date;
  private _priority: Priority;

  constructor() {
    this._id = 0;
    this._title = '';
    this._description = '';
    this._startDate = new Date();
    this._endDate = new Date();
    this._priority = Priority.MIDDLE;
  }


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get startDate(): Date {
    return this._startDate;
  }

  set startDate(value: Date) {
    this._startDate = value;
  }

  get endDate(): Date {
    return this._endDate;
  }

  set endDate(value: Date) {
    this._endDate = value;
  }

  get priority(): Priority {
    return this._priority;
  }

  set priority(value: Priority) {
    this._priority = value;
  }
}
