export interface Address {
  city_user: string;
  postal_code: string;
  address: string;
  country: string;
}

export interface Group {
  id: number;
  name: string;
}

export interface PrivateInfo {
  name: string;
  firstlastname: string;
  secondlastname: string;
  dni_type: string;
  dni: string;
  phone_number: string;
  autocharge_enabled: boolean;
  is_marketing_allowed: boolean;
}

export class User {
  public id: number;
  public mail: string;
  public id_tag: string;
  public photo: string;
  public groups: Group[];
  public status: string;
  public location: Address;
  public privateInfo: PrivateInfo;

  constructor(
    public email: string,
    public name: string,
    public address: Address,
    private _token: string
  ) {}

  get token() {
    if (!this.tokenExpirationDate || new Date() > this.tokenExpirationDate) {
      return null;
    }
    return this._token;
  }

  private get tokenExpirationDate(): Date | undefined {
    // TODO: Implement logic to retrieve or calculate the token expiration date
    return undefined; 
  }

  set token(token: string) {
    this._token = token;
  }

}
