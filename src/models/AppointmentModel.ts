import {Priority} from 'src/enums/Priority';

export class AppointmentModel {
  private _title: string;
  private _notes: string;
  private _startDate: string;
  private _endDate: string;
  private _priority: Priority;

  constructor(title?: string, notes?: string, startDate?: string, endDate?: string, priority?: Priority) {
    this._title = title || '';
    this._notes = notes || '';
    this._startDate = startDate || '';
    this._endDate = endDate || '';
    this._priority = priority || Priority.NO_PRIORITY;
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
}
