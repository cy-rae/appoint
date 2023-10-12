import {Priority} from 'src/enums/Priority';

export class AppointmentModel {
  private _id: number;
  private _title: string;
  private _notes: string;
  private _startDate: string;
  private _endDate: string;
  private _priority: Priority;
  private _calendars: string[];

  constructor() {
    this._id = 0;
    this._title = '';
    this._notes = '';
    this._startDate = '';
    this._endDate = '';
    this._priority = Priority.NO_PRIORITY;
    this._calendars = [];
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

  get notes(): string {
    return this._notes;
  }

  set notes(value: string) {
    this._notes = value;
  }

  get startDate(): string {
    return this._startDate;
  }

  set startDate(value: string) {
    this._startDate = value;
  }

  get endDate(): string {
    return this._endDate;
  }

  set endDate(value: string) {
    this._endDate = value;
  }

  get priority(): Priority {
    return this._priority;
  }

  set priority(value: Priority) {
    this._priority = value;
  }

  get calendars(): string[] {
    return this._calendars;
  }

  set calendars(value: string[]) {
    this._calendars = value;
  }
}
