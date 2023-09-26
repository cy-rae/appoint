import {Locale} from 'src/enums/Locale';

export class LanguageModel {
  private _locale: Locale;
  private _displayName: () => string;

  constructor(locale: Locale, displayName: () => string) {
    this._locale = locale;
    this._displayName = displayName;
  }

  get locale(): Locale {
    return this._locale;
  }

  set locale(value: Locale) {
    this._locale = value;
  }

  get displayName(): () => string {
    return this._displayName;
  }

  set displayName(value: () => string) {
    this._displayName = value;
  }
}
