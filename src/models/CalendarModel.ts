export class CalendarModel {
  private _id: number;
  private _name: string;
  private _category: string;

  constructor() {
    this._id = 0;
    this._name = '';
    this._category = '';
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

  get category(): string {
    return this._category;
  }

  set category(value: string) {
    this._category = value;
  }
}
