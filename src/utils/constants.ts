import { HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';

const BASE_URI_DES: string = `https://backend-des.wenea.site/api`;
const BASE_URI_PRE: string = `https://backend-pre.wenea.site/api`;
const BASE_URI_PRO: string = `https://backend-pro.wenea.site/api`;
const BASE_URI_DEHESA: string = `https://backend-dehesa.wenea.site/api`;

const WENEA_API_VERSION: string = 'v7';
export const WENEA_VERSION: string = environment.version;
const BASE_URI: string = BASE_URI_PRO;
const USER_ENDPOINT: string = `${BASE_URI}/${WENEA_API_VERSION}/user`;

export const WENEA_USER_LOGIN: string = `${USER_ENDPOINT}/login/`;
export const WENEA_USER_PROFILE: string = `${USER_ENDPOINT}/profile/`;

export const BASE_REST_HEADER: HttpHeaders = new HttpHeaders({
	'Content-Type': 'application/json',
	'X-App-Version': WENEA_VERSION,
});
