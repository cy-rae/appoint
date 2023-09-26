import {TabName} from 'src/enums/TabName';

export class StartPageModel {
  private _iconName: string
  private _tabName: TabName;
  private _displayName: () => string;

  constructor(iconName: string, tabName: TabName, displayName: () => string) {
    this._iconName = iconName;
    this._tabName = tabName;
    this._displayName = displayName;
  }

  get iconName(): string {
    return this._iconName;
  }

  set iconName(value: string) {
    this._iconName = value;
  }

  get tabName(): TabName {
    return this._tabName;
  }

  set tabName(value: TabName) {
    this._tabName = value;
  }

  get displayName(): () => string {
    return this._displayName;
  }

  set displayName(value: () => string) {
    this._displayName = value;
  }
}
