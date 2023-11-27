import { Address } from './ddbb.model';

export class User {
  constructor(
    public email: string,
    public uid: string,
    public name: string,
    private _token: string,
    private _tokenExpirationDate?: Date,
    public address?: Address
  ) {}

  get token() {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }

    return this._token;
  }

  set token(token) {
    this._token = token!;
  }
}
