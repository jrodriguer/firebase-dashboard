import { HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';

export const BASE_URI_DES = `https://backend-des.wenea.site/api`;
export const BASE_URI_PRE = `https://backend-pre.wenea.site/api`;
export const BASE_URI_PRO = `https://backend-pro.wenea.site/api`;
export const BASE_URI_DEHESA = `https://backend-dehesa.wenea.site/api`;

export const WENEA_API_VERSION = 'v7';
export const WENEA_VERSION = environment.version;
export const BASE_URI: string = BASE_URI_DEHESA;
export const USER_ENDPOINT = `${BASE_URI}/${WENEA_API_VERSION}/user`;

export const WENEA_USER_LOGIN = `${USER_ENDPOINT}/login/`;
export const WENEA_USER_PROFILE = `${USER_ENDPOINT}/info/`;

export const BASE_REST_HEADER = new HttpHeaders({
  'Content-Type': 'application/json',
  'X-App-Version': WENEA_VERSION,
});
