import { Errors } from '../error/errors';
import { Response } from '../model/response';
import { ApiResponse, PromiseResponse } from '../types';
import { Requests } from './requests';

const GET = "GET";
const CLIENT_ERROR = '4[0-9]{2}';
const SERVER_ERROR = '5[0-9]{2}';

export class HttpRequests implements Requests {

    get<T>(url: string, headers?: Headers): PromiseResponse<T> {
        return this.execute<T>(url, GET, headers);
    }

    private execute<T>(url: string, method: string, headers?: Headers): PromiseResponse<T> {
        headers = !headers ? new Headers() : headers;
        return fetch(url, { method: method, headers: headers })
            .then(r => {
                return r.json().then(jsonResponse => this.resolveResponse<T>(r.status, r.headers, jsonResponse as ApiResponse))
            })
            .catch(_ => Response.errors<T>([Errors.UNKNOWN_ERROR]).toPromise());
    }

    private resolveResponse<T>(status: number, headers: Headers, response: ApiResponse): Response<T> {
        const statusString = status.toString();
        if (statusString.match(CLIENT_ERROR) || statusString.match(SERVER_ERROR)) {
            return Response.errors<T>([response.message], headers);
        } else {
            return Response.successOf<T>(response, headers);
        }
    }
}